import { Octokit } from "octokit";
import { CityEntity } from "../types/CitySchema";

const octokit = new Octokit();

export const fetchRepoTree = async (owner: string, repo: string): Promise<CityEntity> => {
  console.log(`Fetching repo: ${owner}/${repo}`);
  
  // 1. Get repo info for default branch
  const { data: repoData } = await octokit.rest.repos.get({ owner, repo });
  const defaultBranch = repoData.default_branch;

  // 2. Get the full tree
  const { data: treeData } = await octokit.rest.git.getTree({
    owner,
    repo,
    tree_sha: defaultBranch,
    recursive: "true",
  });

  // 3. Initialize Root
  const root: CityEntity = {
    name: repo,
    path: "/",
    type: "block",
    size: 0,
    depth: 0,
    children: [],
    position: { x: 0, y: 0, z: 0 },
    dimensions: { width: 0, height: 0, depth: 0 },
    color: "#2c3e50"
  };

  // 4. Build Hierarchy
  treeData.tree.forEach((item) => {
    if (!item.path) return;

    const parts = item.path.split("/");
    let current = root;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;
      // If it's a blob, it's a file. If tree, it's a dir.
      // However, intermediate parts are always dirs.
      // The tree API returns explicitly 'tree' items for directories.
      // But we can just infer structure from paths.
      
      const isFile = isLast && item.type === "blob";
      
      // Ensure children array exists
      if (!current.children) current.children = [];
      
      let child = current.children.find((c) => c.name === part);

      if (!child) {
        child = {
          name: part,
          path: isLast ? item.path! : parts.slice(0, index + 1).join("/"),
          type: isFile ? "building" : "block",
          size: isFile ? (item.size || 100) : 0,
          depth: current.depth + 1,
          children: isFile ? undefined : [],
          position: { x: 0, y: 0, z: 0 },
          // Dimensions will be calculated by LayoutEngine
          dimensions: { width: 1, height: 1, depth: 1 }, 
          color: isFile ? "#3498db" : "#95a5a6"
        };
        current.children.push(child);
      }
      
      if (!isFile) {
          // Accumulate size for blocks? Optional, layout engine can handle.
          current.size += (item.size || 0);
      }
      
      current = child;
    });
  });

  return root;
};

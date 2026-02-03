# RepoCity 3D Architecture

## 1. System Overview

The system visualizes GitHub repositories as 3D cities. 
- **Frontend**: React Three Fiber application handling the 3D rendering and user interaction.
- **Backend**: Django service acting as a proxy and caching layer for GitHub data, and potentially performing heavy layout calculations if needed (though layout is primarily client-side for interactivity).
- **GitHub API**: Source of file tree data.

```mermaid
graph TD
    User[User Browser]
    subgraph Frontend [React + Vite]
        UI[UI Components]
        Scene[3D Scene (R3F)]
        Store[Zustand Store]
        LayoutEngine[Layout Engine]
    end
    
    subgraph Backend [Django]
        API[REST API]
        Cache[Redis/DB Cache]
    end
    
    GitHub[GitHub API]

    User --> UI
    User --> Scene
    UI --> Store
    Scene --> Store
    Store --> LayoutEngine
    
    Store -- Fetch Repo Data --> API
    API -- Check Cache --> Cache
    API -- Rate Limited Request --> GitHub
    GitHub -- JSON Response --> API
    API -- JSON Response --> Store
```

## 2. Core Algorithms

### Bounding Box Layout (City Generation)

The goal is to map the repository file tree into a non-overlapping 3D city layout. We treat directories as "districts" and files as "buildings".

**Logic:**
1.  **Tree Traversal (Post-Order):**
    - We calculate size requirements from the leaves (files) up to the root.
    - A file's "size" corresponds to its Line of Code (LOC) or byte size, mapping to building height/width.
    
2.  **Packing Algorithm (TreeMap / Bin Packing):**
    - For a given directory, we have a list of children (files and subdirectories).
    - We treat these children as rectangles.
    - **Heuristic:** Sort children by size (largest first).
    - Place the first child at `(0,0)`.
    - Place subsequent children adjacent to existing ones to maintain a roughly square aspect ratio for the parent container.
    - This is similar to a "Squarified Treemap" but in 3D.
    
3.  **Collision Avoidance:**
    - Each node maintains a `BoundingBox { x, y, width, depth }`.
    - When placing a child relative to its siblings, we ensure `Child.Box` does not intersect `Sibling.Box`.
    - A simple "shelf" or "skyline" packing algorithm can be used: fill a row until width exceeds a threshold, then start a new row.

4.  **Rendering:**
    - **Files:** Rendered as BoxGeometry. Height = LOC. Color = Language extension.
    - **Directories:** Rendered as a flat "platform" (plane) underneath its children.

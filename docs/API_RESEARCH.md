# GitHub API Analysis for RepoCity 3D

## Objective
Extract repository metadata to populate the City Blueprint schema. We need:
1. File Structure (Districts/Buildings)
2. File Size (Base dimensions)
3. Commit Frequency/Count (Height)
4. Language/Type (Color)
5. Age/Last Modified (Texture)

## Endpoints Selection

### 1. Structural Backbone (The Grid)
**Endpoint:** `GET /repos/{owner}/{repo}/git/trees/{default_branch_sha}?recursive=1`
**Purpose:** Retrieves the entire directory tree in a single request.
**Data Points:**
- `path`: File path (structure).
- `type`: `blob` (file) or `tree` (directory).
- `size`: File size in bytes (maps to **Building Size**).

### 2. File Metadata (Height & Texture)
*Challenge:* The Tree API does not provide commit counts or timestamps.
*Options:*

#### Option A: REST API (High Latency/Rate Limit Risk)
- **Endpoint:** `GET /repos/{owner}/{repo}/commits?path={file_path}&per_page=1`
- **Method:** Check the `Link` header for pagination "last" page to estimate count, or just take the header date of the first result for "Age".
- **Risk:** One request per file. Unusable for large repos (1000+ files).

#### Option B: GraphQL API (Recommended)
- **Endpoint:** `POST https://api.github.com/graphql`
- **Strategy:** Construct a query to fetch the last commit date and history count for the repository, though getting history count for *every* file recursively is still expensive in GraphQL nodes.
- **Compromise for MVP:** 
    - Use `size` (from Tree API) for **Base Size**.
    - Use `extension` (from Path) for **Color** (Language).
    - **Height/Texture Approximation:** Fetch `GET /repos/{owner}/{repo}/stats/contributors` or recent commits to identify "Hotspots". Files touched in recent commits get "tall/new" textures. Older files get "short/weathered" textures.
    - Alternatively, perform a shallow clone (`git clone --depth 1`) locally if the worker has bandwidth, and use `git log` which is free.

## Data Mapping Strategy

| Visual Attribute | Metric | Source |
| :--- | :--- | :--- |
| **District** | Directory | Tree API (`type: tree`) |
| **Building** | File | Tree API (`type: blob`) |
| **Size (Footprint)**| File Size (Bytes) | Tree API (`size`) |
| **Height** | Commit Count | *Approximation* via local git or expensive API |
| **Color** | Language | Derived from file extension |
| **Texture** | Age (Last Modified) | Commit History |

## Recommendation
1. Use **Tree API** for the skeleton.
2. If running server-side/locally: **Clone & Git Log** is vastly superior to API for stats.
3. If running purely browser-side: Use **Tree API** only for v1, map `size` -> `height`, and ignore age/commit count to preserve rate limits, OR query only the top 100 files via GraphQL.

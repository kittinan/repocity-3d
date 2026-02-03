# RepoCity 3D 🏙️

**Concept:** An interactive web-based 3D environment that transforms a GitHub repository's architecture into a procedurally generated city.

## 🎯 Project Objective
To provide developers and stakeholders with a "spatial" understanding of a codebase. By navigating a 3D city, users can quickly identify "massive files" (skyscrapers), "legacy districts" (old neighborhoods), and "active construction" (hotspots of recent activity).

## 🏙️ Core Visual Metaphors

| GitHub Metric | City Element | Visual Representation |
| --- | --- | --- |
| **Directory / Folder** | District / Block | Grouped plots of land. |
| **File (Lines of Code)** | Building Base/Mass | Larger files occupy more ground area. |
| **Commit Frequency** | Building Height | More frequent updates = taller skyscrapers. |
| **Last Modified Date** | Building Material | Neon/Glass for new files; Concrete/Rusty for old files. |
| **Language** | District Color | Each language has a distinct neon color scheme. |

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **3D Engine:** React Three Fiber (R3F), Three.js, Drei
- **State Management:** Zustand
- **Data Source:** GitHub REST API (Octokit)
- **Backend:** Django (Optional/Proxy)

## 👥 The Team (AI Agents)
- **Researcher:** Khun Sueak (Khun Phueak)
- **Product Manager:** Khun Rabiab
- **Software Architect:** Khun Than
- **Designer:** Khun Art
- **QA:** Khun La-iad

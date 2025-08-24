## 🚀 React Projects + Components Playground

A curated collection of mini apps and reusable UI components built with React and Vite. This repo serves as a hands-on playground to explore patterns, state management, animations, charts, and modern styling.

### 🧰 Tech stack

- **React 19** + **Vite** for fast DX
- **Tailwind CSS** for styling
- **React Router** for routing
- **Context API** and **Redux Toolkit** (where applicable)
- **Framer Motion**, **Recharts**, and utility helpers

### ⚡ Quick start

```bash
npm install
npm run dev
npm run build
npm run preview
```

### 🧩 Included projects

- **Task Manager**: CRUD tasks with filters and modals
  - Route: `/projects/task-manager`
  - Source: [`src/projects/task-manager/`](src/projects/task-manager/)
- **Chrono Craft**: Age calculator with date utilities
  - Route: `/projects/chrono-craft`
  - Source: [`src/projects/chrono-craft/`](src/projects/chrono-craft/)
- **Elite Shop**: E‑commerce demo with cart and checkout
  - Routes: `/projects/elite-shop`, `/projects/elite-shop/checkout`
  - Source: [`src/projects/elite-shop/`](src/projects/elite-shop/)
- **X Dashboard**: Admin dashboard with charts and Redux
  - Routes: `/projects/x-dashboard`, `/projects/x-dashboard/analytics`, `/projects/x-dashboard/settings`, `/projects/x-dashboard/data`
  - Source: [`src/projects/x-dashboard/`](src/projects/x-dashboard/)
- **Resume Enhancer**: Resume optimization workflow
  - Route: `/projects/resume-enhancer`
  - Source: [`src/projects/resume-enhancer/`](src/projects/resume-enhancer/)

### 🧱 Reusable components

- **Recursive File Tree**
  - Route: `/components/recursive-file-tree`
  - Source: [`src/components/RecursiveFileTree.jsx`](src/components/RecursiveFileTree.jsx)
- **Date Picker**
  - Route: `/components/date-picker`
  - Source: [`src/components/date-picker/DatePicker.jsx`](src/components/date-picker/DatePicker.jsx)
- **Sliding Tabs**
  - Route: `/components/sliding-tabs`
  - Source: [`src/components/SlidingTabs.jsx`](src/components/SlidingTabs.jsx)

### 📁 Project structure

```text

├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── date-picker/
│   │   ├── PageMeta.jsx
│   │   ├── RecursiveFileTree.jsx
│   │   └── SlidingTabs.jsx
│   ├── hooks/
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   │   └── home/
│   ├── projects/
│   │   ├── chrono-craft/
│   │   ├── elite-shop/
│   │   ├── resume-enhancer/
│   │   ├── task-manager/
│   │   └── x-dashboard/
│   ├── routes.jsx
│   └── utils/
│       └── cn.js
└── README.md
```

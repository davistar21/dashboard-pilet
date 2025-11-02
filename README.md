# Dashboard Pilet

A modular **React + TypeScript + Piral** microfrontend (pilet) that provides a functional **dashboard interface**.  
This dashboard fetches posts from the **JSONPlaceholder API**, allows adding new posts locally (persisted with Zustand), supports pagination, modal previews, and detailed views — all styled beautifully with **TailwindCSS**, making use of **Lucide React icons**, and animated via **Framer Motion**.

---

## 🚀 Features

* **Dynamic Posts Dashboard**
- Fetches paginated posts (10 per page) from JSONPlaceholder.
- Displays posts using reusable `ItemCard` and `ItemList` components.

* **Add Post (Local + Optimistic UI)**
- Add new posts locally via a modal form.
- Newly added posts appear instantly at the top of the list.
- Local posts are persisted with Zustand.

* **Post Details**
- View detailed post content on `/dashboard/:id`.
- Fetches data from Zustand store (not directly from API).

* **Reusable Components**
- `AddItemForm`, `AddPostButton`, `Pagination`, and `InputField`.

* **Modern UI & UX**
- TailwindCSS for rapid styling.
- Theme system via CSS `@theme` block for shared colors.
- Framer Motion for fluid animations.

* **State Management**
- Centralized store using **Zustand**.
- Local persistence with `zustand/middleware` (`persist`).

* **Testing**
- Comprehensive Jest + React Testing Library setup for component testing.

---

## 🧩 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React (TypeScript)** | UI & logic |
| **Vite** | Fast bundling & development |
| **Piral (Pilet)** | Microfrontend architecture |
| **Zustand** | Global state & persistence |
| **Axios** | API communication |
| **TailwindCSS** | Styling |
| **Framer Motion** | Animation |
| **Jest + React Testing Library** | Unit & component testing |

---

## 🗂️ Folder Structure


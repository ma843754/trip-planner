# Trip Planner

## Project Description
Trip Planner is a responsive web application that helps users organize travel plans in one place. Users can create and manage trip activities, leave comments and ratings for locations, and track their travel expenses using a built-in budget tracker. Due to issues implementing Firebase, all storage is local. The application provides a dashboard that displays itinerary activities and budget information so users can easily plan and monitor their trips. 

---

## Features

### Trip Activities
- Add activities with a title, date, location, and notes
- Automatically sorts activities by date
- Mark activities as completed
- Delete activities
- Leave comments and ratings on activities

### Budget Tracker
- Set a total trip budget
- Add expenses with category and date
- View total spending
- View remaining budget

### User Interface
- Responsive layout for desktop and mobile
- Dashboard layout for organizing trip information
- Activity cards for clear viewing of itinerary items

---

## Technologies Used

### Frontend
- React
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

### Development Tools
- GitHub for version control
- Claude Code for AI-assisted development

### Data Storage
- localStorage (browser-based persistence)

---

## Architecture Overview

### Frontend

The application uses a **React component-based architecture**. Each major feature is separated into reusable components.

Example structure:

```
src
 ├── components
 │   ├── activities
 │   │   ├── ActivityForm.jsx
 │   │   ├── ActivityList.jsx
 │   │   ├── ActivityItem.jsx
 │   │   ├── CommentSection.jsx
 │   │   └── Rating.jsx
 │   ├── budget
 │   │   ├── BudgetForm.jsx
 │   │   ├── BudgetList.jsx
 │   │   └── BudgetSummary.jsx
 │   └── layout
 │       └── Navbar.jsx
 │
 ├── hooks
 │   ├── useActivities.js
 │   └── useBudget.js
 │
 ├── pages
 │   ├── HomePage.jsx
 │   └── DashboardPage.jsx
```

Custom hooks manage application data:

- `useActivities.js` manages itinerary activities
- `useBudget.js` manages expenses and the trip budget

---

### Backend

This project does **not use a traditional backend server**. Instead, it stores data using the browser’s **localStorage API**, allowing the application to persist data between page refreshes.

---

## Database Structure

Although no database server is used, structured data is stored in **localStorage**.

### Activity Object

```
{
  id: string,
  title: string,
  date: string,
  location: string,
  notes: string,
  completed: boolean,
  comments: [],
  rating: number | null
}
```

### Comment Object

```
{
  id: string,
  text: string,
  createdAt: string
}
```

### Expense Object

```
{
  id: string,
  title: string,
  amount: number,
  category: string,
  date: string
}
```

### Budget Data

```
tripBudget: number
```

Stored using localStorage keys:

```
trip-planner-activities
trip-planner-expenses
trip-planner-trip-budget
```

---

## Known Bugs / Limitations

- Data is stored locally in the browser and will not sync across devices.
- Clearing browser storage will remove all saved data.
- The application does not include user authentication.
- Comments cannot currently be edited or deleted after posting.

---

## What I Learned

Using AI tools during development helped accelerate the implementation of complex features such as the budget tracker and comment system. By prompting Claude with specific feature requirements, I was able to generate component structures and refine them iteratively. This experience showed me how AI can assist with debugging, architectural decisions, and UI improvements while still requiring human oversight to guide the development process. It also helped me better understand how React components and hooks work together to manage application state.

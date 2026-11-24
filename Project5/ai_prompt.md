# Project 5 AI Prompt: Study Habit Tracker

**Prepared by:** Kamani Mccalla  
**Course:** CSCI 4221  
**Assigned feature:** Create and Track Study Goals

## Section 1: Brief Statement of the Application

Create a React Native Expo mobile application called **Study Habit Tracker** that runs on both iPhone and Android. The application helps college students set study goals for individual courses, record study time, and monitor progress before a deadline. My assigned task is the goal-setting feature.

The application should use Expo Router and TypeScript. It should have a clean, accessible interface with large buttons, readable text, and a blue and navy color palette. The initial prototype may use local screen data; the shared cloud database and API can be connected in a later sprint.

## Section 2: Product Vision Statement

For students who want to study more consistently, the Study Habit Tracker is a mobile application that lets them set study goals, record their study time, and see their progress. Unlike a general calendar or notes application, the Study Habit Tracker combines course-specific hour targets, deadlines, and visible progress in one simple place.

## Section 3: Prototypes Developed in Project 2

The prototype material currently available in the group repository contains these screens:

1. **Home screen** — shows the weekly target, a current goal, and a Create Goal button.
2. **Create Goal screen** — allows the student to enter the course name, target study hours, and deadline.
3. **Goal Progress screen** — shows the completed hours, target hours, deadline, status, and an option to log a study session.

Prototype images to use with this prompt:

- [`prototype_images/Home.png`](prototype_images/Home.png)
- [`prototype_images/Create_Goal.png`](prototype_images/Create_Goal.png)
- [`prototype_images/Goal_Progress.png`](prototype_images/Goal_Progress.png)

Figma prototype: [Study Habit Tracker — Goal Setting Prototype](https://www.figma.com/design/6GuDQ39e8D7mGNCU9phyXe/Study-Habit-Tracker---Goal-Setting-Prototype)

## Section 4: Team Features, Personas, Scenarios, and User Stories from Project 3

### 4.1 Kamani Mccalla — Create and Track Study Goals

**Feature:** A student creates a course goal with target study hours and a deadline, then views completed and remaining hours.

**Persona:** Jordan is a busy 20-year-old undergraduate student taking five courses while working part time. Jordan needs to organize study time and avoid waiting until the last minute.

**Scenario:** Jordan has a mathematics exam in two weeks and creates a five-hour Mathematics goal with the exam date as the deadline. Jordan records study sessions and checks progress until the target is complete.

**User story:** As a busy college student, I want to create a study goal with a course, target number of hours, and deadline so that I can organize my study time and monitor my progress.

### 4.2 Jayla Menefee — Logging Study Sessions

**Feature:** A student selects a course, enters the study date and duration, optionally adds notes, and saves the session. The saved time contributes to the associated goal and appears in study history.

**Persona:** Maya is a 22-year-old college student with a changing part-time work schedule. She needs a quick way to record short study sessions and see how they contribute to her goals.

**Scenario:** Maya studies Software Engineering for 45 minutes before work. She opens the goal, selects Log Study Session, enters the date and duration, and saves it. The application adds the time to her goal and displays the session in her history.

**User story:** As a student, I want to log my study sessions so that I can track my completed study time toward my course goals.

### 4.3 Kye'Marrion Thomas — Show Progress Toward Goals

**Feature:** The application displays total hours studied, percentage completed, and remaining hours for a selected goal.

**Persona:** Marcus is an Albany State University student taking several courses. He wants a simple way to check study progress and stay on track with weekly goals.

**Scenario:** Marcus sets a ten-hour weekly goal and logs seven hours. The Goal Progress screen shows 70 percent complete and three hours remaining, which helps Marcus plan the next session.

**User story:** As a college student, I want to see my progress toward my study goals so that I know how much I have completed and how much more studying I need to do.

### Shared Acceptance Criteria

1. The student can enter a course, target hours greater than zero, and a deadline.
2. The student can save and view a study goal.
3. A study session requires a course or goal, valid date, and duration greater than zero.
4. A saved session appears in study history and contributes to completed time.
5. The progress screen displays the target, completed time, percentage, and remaining time.
6. Invalid information produces a clear message and is not saved.
7. At least two Home-screen buttons work: **Create Goal** and **View Goal Progress**.

## Section 5: Team Architecture Design from Project 4

The cloud design uses separate application components that communicate with a shared relational database. The mobile interface calls backend APIs, while persistent goal and session data remain outside the application containers.

### 5.1 Goal Management Service — Kamani Mccalla

A stateless Python FastAPI container creates, retrieves, updates, and deletes study goals. Planned endpoints include `POST /goals`, `GET /goals/{goal_id}`, `GET /users/{user_id}/goals`, `PATCH /goals/{goal_id}`, and `DELETE /goals/{goal_id}`. The PostgreSQL `study_goals` table stores identifiers, course name, target and completed hours, deadline, status, and timestamps.

### 5.2 Study Session Logging Service — Jayla Menefee

A Node.js and Express container validates, stores, and retrieves study sessions. Its proposed components include routes, a session controller, a model, database access, a session form, and study history. The `study_sessions` table stores `session_id`, `student_id`, optional `goal_id`, course name, study date, duration in minutes, notes, and creation time.

### 5.3 Goal Progress Component — Kye'Marrion Thomas

The progress component retrieves target hours from study goals and sums durations from associated study sessions. It calculates `(completed study hours / target study hours) × 100`, handles a zero target safely, and returns goal name, target hours, completed hours, remaining hours, percentage, and a progress bar. Proposed files include `GoalProgress.jsx`, `progressController.js`, `progressService.js`, `progressRoutes.js`, and `database.js`.

### Shared Data Relationships

One student can have many goals and sessions. One goal can have many sessions. Goal progress is calculated by linking session records to a goal through `goal_id`. The database should enforce primary and foreign keys, positive targets and durations, and access rules so students can view only their own data.

## AI Coding Request

Generate an Expo Router and TypeScript application with these routes:

- `app/(tabs)/index.tsx` for the Home screen
- `app/create-goal.tsx` for the goal form
- `app/goal-progress.tsx` for the progress screen
- `app/(tabs)/about.tsx` for a short application description

The **Create Goal** button must open the form. The **View Goal Progress** button must open the progress screen. Validate the goal form before saving. After a valid goal is saved, display the new course, target hours, and deadline on the progress screen. Include a working Return Home button and a Log Study Session button that displays a prototype message.


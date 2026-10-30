# Study Habit Tracker: Goal Management Service Architecture

**Name:** Kamani Mccalla  
**Project:** Study Habit Tracker  
**Sprint:** 4 — Architecture

## 1. Description of My Container

My assigned component is the **Goal Management Service**. It will run in a Docker container as part of the cloud-based Study Habit Tracker. The service allows a student to create a study goal, view goals, update completed study hours, and mark a goal as completed.

The container will run a Python FastAPI web service and expose a REST API on port `8080`. The frontend or another service can send requests to endpoints such as:

- `POST /goals` — create a study goal
- `GET /goals/{goal_id}` — view one goal
- `GET /users/{user_id}/goals` — view a student's goals
- `PATCH /goals/{goal_id}` — update a goal or its progress
- `DELETE /goals/{goal_id}` — delete a goal
- `GET /health` — verify that the service is running

A Docker **image** will contain the application code, Python runtime, and required libraries. The Docker **daemon** will use that image to start and manage the running container. Configuration values, including the database connection string, will be supplied through environment variables instead of being stored in the image.

The container will be stateless. Study goals will be saved in a shared PostgreSQL database in the cloud, not inside the container. This allows the service to restart or run in more than one container without losing data. Multiple instances can be added later if the number of users increases.

## 2. Component and Necessary Files

The Goal Management Service uses a layered architecture so each file has one clear responsibility.

| File | Component | Purpose |
| --- | --- | --- |
| `app/main.py` | Application entry point | Starts FastAPI, registers routes, and provides the health endpoint. |
| `app/api/goals.py` | API/controller | Receives HTTP requests, validates input, and returns responses. |
| `app/services/goal_service.py` | Business logic | Applies rules for creating goals, recording progress, checking deadlines, and completing goals. |
| `app/models/goal.py` | Data model/schema | Defines the study-goal fields and request/response formats. |
| `app/repositories/goal_repository.py` | Data access | Creates, reads, updates, and deletes goal records in PostgreSQL. |
| `app/database.py` | Database connection | Opens and manages connections to the shared database. |
| `app/config.py` | Configuration | Reads the database URL, service port, and other environment variables. |
| `requirements.txt` | Dependencies | Lists FastAPI, the server, database driver, and validation libraries. |
| `Dockerfile` | Container build | Gives Docker the steps for building the service image. |
| `.dockerignore` | Build settings | Keeps temporary and unnecessary files out of the image. |
| `tests/test_goals.py` | Tests | Checks the main goal operations and validation rules. |

### Component Flow

1. The frontend sends a request to `app/api/goals.py`.
2. The API passes the request to `app/services/goal_service.py`.
3. The service applies the product rules and calls `app/repositories/goal_repository.py`.
4. The repository uses `app/database.py` to access PostgreSQL.
5. The result is returned through the API to the frontend.

## 3. Structure of the Related Database Table

The Goal Management Service will use a table named `study_goals` in the shared cloud database.

| Column | Data Type | Rules | Purpose |
| --- | --- | --- | --- |
| `goal_id` | UUID | Primary key | Unique identifier for each goal. |
| `user_id` | UUID | Foreign key, not null | Connects the goal to the student who created it. |
| `course_name` | VARCHAR(100) | Not null | Course the student plans to study. |
| `target_hours` | DECIMAL(5,2) | Not null, greater than 0 | Total number of study hours in the goal. |
| `completed_hours` | DECIMAL(5,2) | Not null, default 0, zero or greater | Hours the student has completed. |
| `deadline` | DATE | Not null | Date by which the student wants to finish. |
| `status` | VARCHAR(20) | Not null, default `active` | Current state: active, completed, or overdue. |
| `created_at` | TIMESTAMP WITH TIME ZONE | Not null, current time by default | Date and time the goal was created. |
| `updated_at` | TIMESTAMP WITH TIME ZONE | Not null, current time by default | Date and time the goal was last changed. |

```sql
CREATE TABLE study_goals (
    goal_id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(user_id),
    course_name VARCHAR(100) NOT NULL,
    target_hours DECIMAL(5,2) NOT NULL CHECK (target_hours > 0),
    completed_hours DECIMAL(5,2) NOT NULL DEFAULT 0
        CHECK (completed_hours >= 0),
    deadline DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'completed', 'overdue')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_study_goals_user_id ON study_goals(user_id);
CREATE INDEX idx_study_goals_deadline ON study_goals(deadline);
```

The `user_id` foreign key connects the goal to the user account component. The index on `user_id` helps the application quickly display all goals for one student. The deadline index helps the application find goals that may need to be marked overdue.

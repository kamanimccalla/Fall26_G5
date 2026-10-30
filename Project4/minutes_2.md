**Name:** Kamani Mccalla

# Project 4 Meeting Minutes 2

**Date:** October 27, 2026  
**Duration:** 1 hour 30 minutes  
**Sprint:** 4 — Architecture

## Discussion

Each member gave a status update on the assigned component. We discussed whether the database should be stored in each container or shared by the services. We agreed that the Study Habit Tracker should use a shared cloud PostgreSQL database and that the application containers should remain stateless.

I presented the planned Goal Management Service container. It will run a Python FastAPI REST API, receive goal requests from the frontend, apply goal-setting rules, and save data in PostgreSQL. I also presented the planned API, service, model, repository, database, and configuration components.

| PBI | Status | Sprint | Estimate | Assigned | Reviewer |
| --- | --- | --- | --- | --- | --- |
| Describe the Goal Management Service container | Completed | Sprint 4 | 2 days | Kamani Mccalla | Group members |
| Identify the service components and files | In progress | Sprint 4 | 2 days | Kamani Mccalla | Group members |
| Design the `study_goals` database table | Ready for implementation | Sprint 4 | 2 days | Kamani Mccalla | Group members |

## My Progress and Next Steps

I completed the container description and drafted the service file structure. Next, I will finish the responsibility of each file and define the columns, data types, keys, and validation rules for the `study_goals` table.




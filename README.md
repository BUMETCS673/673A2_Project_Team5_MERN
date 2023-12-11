# NoteAnt Project Repo

## Project Overview

We all take notes at some point, either in class or in a meeting. One of the popular methods of note-taking is typing down your thoughts while listening. A lot of times, the notes we took can be hard to read or confusing. To solve this problem, we will build a web application empowered by ChatGPT that helps users to complete and summarize notes.

## Tech Stack

Behind the scenes is the MERN stack, Pivotal Tracker, Git/GitHub, and many other libraries. The main tech stack and its purpose are:

- **MongoDB**: Store notes documents and user account credentials.
- **ExpressJS**: Build server structure, handle CRUD operations, and RESTful requests.
- **React**: Front-end user interface and data handling.
- **NodeJS**: Provides a runtime environment for our project to operate.

## Project Directory Structure

- **Google Drive**

  - Meetings records and summaries
  - Project iteration planning
  - Project risk management assessments
  - Role Assignment
  - Progress Report
  - Software Test Document
  - Presentation slides

- **GitHub**
  - Project Repository
    - Code
      - Front-end code
      - Back-end code
    - Demo
      - presentation video
    - Doc
      - iteration0
        - CS673_MeetingMinutes
        - CS673_SPPP_RiskManagement_team5
        - CS673_SPPP_team5
        - ProgressReport_team5
        - team5_iter0
      - iteration1
        - CS673_UserStories_Team5
        - CS673_MeetingMinutes (1)
        - CS673_ProgressReport_team5
        - CS673_SDD_team5
        - CS673_SPPP_team5
        - Readme
        - CS673_presentation_iter1
      - iteration2
        - CS673_MeetingMinutes
        - CS673_ProgressReport_team5
        - CS673_SDD_team5
        - CS673_SPPP_team
        - CS673_presentation_iter2
      - iteration3
        - CS673_SPPP
        - CS673_MeetingMinutes
        - CS673_progressReport
        - CS673_userstories
        - CS673_SDD
        - CS673_STD
        - CS673_Presentation_final
    - Misc (currently empty)
    - README.md
    - team.md

## Team Members and Roles

1. Nicholas Narmada - Team Lead

- Project Management
- Code Reviews
- Backend for Document Page
- Setting up OpenAI API
- Document page API testing

2. Siyuan Wan - Security Lead

- Frontend for Homepage
- Homepage Testing
- Connect to backend with Axios methods
- Debug

3. Yibo Wang - QA Lead

- Frontend for document page
- Document page testing

4. Wenhao Tian - Design and Implementation Lead

- Setting up backend side
- Backend for Homepage
- Testing for Homepage

5. Guancheng Huang - Requirements Lead

- Backend for login page
- Middleware
- Backend login test case
- Debug

6. Yichen Li - Configuration Lead

- Front-end for Login page
- Front-end security
- Google OAuth for Google API access

## Plan/Roadmap

### Team Composition:

- Frontend: 3 people
- Backend: 3 people

### Iteration 0:

- Project development ideas.
- Clear division and familiarization with individual parts.

### Iteration 1:

#### Frontend

- Finish making UI.
- Use dummy data.

#### Backend

- Research about ChatGPT API and LangChain.
- Setup Express and MongoDB.

### Iteration 2:

- Implementing page navigation

#### Frontend

- Remove dummy data, use real-time data from the backend.
- Create loading and error states.

#### Backend

- Finish CRUD (create, read, update, delete) operations.
- Finish building MongoDB data models.
- Finish login, logout functionalities.
- Implement user authentication with JWT.

### Iteration 3:

#### Frontend & Backend

- Ensure everything works seamlessly.
- Implementing integration testing with Cypress for frontend
- Implementing unit testing with Mocha for backend

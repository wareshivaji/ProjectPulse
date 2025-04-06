# ProjectPulse

## Features

### User Management
- Role-based authentication (JWT)
- User registration with validation
- Profile management
- Role hierarchy:
  - HR: Team management, role assignment
  - Manager: CRD operations
  - Team Lead: CRU operations
  - Developer: View/Create tasks

### Project Management
- Create projects with teams
- Track project states (To Do, In Progress, Completed)
- Drag-and-drop task management
- Project timeline tracking

### Team Collaboration
- Team creation and assignment
- Task delegation
- Progress visualization

## Technologies

### Frontend
- Angular 16
- Angular Material UI
- RxJS for state management
- JWT authentication

### Backend
- Spring Boot 3
- Spring Security
- JPA/Hibernate
- MySQL Database
- JWT authentication

### Development Tools
- Docker (optional containerization)
- Postman (API testing)
- Git version control

## Installation

### Prerequisites
- Node.js 16+
- Java JDK 17
- MySQL 8+
- Angular CLI

### Backend Setup
```bash
# Clone repository
git clone https://github.com/yourusername/project-management-system.git
cd project-management-system/backend

# Build and run
mvn clean install
mvn spring-boot:run

package com.ProjectManagement.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project; // Task belongs to a project

    @Enumerated(EnumType.STRING)
    private StateType state; // Enum: TODO, IN_PROGRESS, DONE

    private String description;
    private String assignedDate;

    @ManyToOne
    @JoinColumn(name = "assigned_user_id", nullable = true)
    private User assignedUser; // Optional: If the task is for an individual

    @ManyToOne
    @JoinColumn(name = "assigned_team_id", nullable = true)
    private Team assignedTeam; // Optional: If the task is for a team

    // Constructors
    public Task() {}

    public Task(Project project, StateType state, String description, String assignedDate, User assignedUser, Team assignedTeam) {
        this.project = project;
        this.state = state;
        this.description = description;
        this.assignedDate = assignedDate;
        this.assignedUser = assignedUser;
        this.assignedTeam = assignedTeam;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public StateType getState() { return state; }
    public void setState(StateType state) { this.state = state; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getAssignedDate() { return assignedDate; }
    public void setAssignedDate(String assignedDate) { this.assignedDate = assignedDate; }

    public User getAssignedUser() { return assignedUser; }
    public void setAssignedUser(User assignedUser) { this.assignedUser = assignedUser; }

	public Team getAssignedTeam() {
		return assignedTeam;
	}

	public void setAssignedTeam(Team assignedTeam) {
		this.assignedTeam = assignedTeam;
	}
    
    
}

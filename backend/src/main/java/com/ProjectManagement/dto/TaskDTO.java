package com.ProjectManagement.dto;

import java.time.LocalDateTime;

import com.ProjectManagement.Model.StateType;

public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private Long projectId;
    private Long assignedUserId;  // Changed from Integer to Long
    private StateType state;  // Changed from String to Enum
    private LocalDateTime dueDate;

    public TaskDTO() {}

    public TaskDTO(Long id, String title, String description, Long projectId, Long assignedUserId, StateType state, LocalDateTime dueDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.projectId = projectId;
        this.assignedUserId = assignedUserId;
        this.state = state;
        this.dueDate = dueDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public Long getAssignedUserId() { return assignedUserId; }
    public void setAssignedUserId(Long assignedUserId) { this.assignedUserId = assignedUserId; }

    public StateType getState() { return state; }
    public void setState(StateType state) { this.state = state; }

    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
}

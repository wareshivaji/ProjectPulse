package com.ProjectManagement.dto;

import java.time.LocalDate;
import java.util.List;

public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private List<String> techStack;
    private Long teamId;
    private LocalDate startDate;

    // Constructors
    public ProjectDTO() {}

    public ProjectDTO(Long id, String name, String description, List<String> techStack, Long teamId, LocalDate startDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.techStack = techStack;
        this.teamId = teamId;
        this.startDate = startDate;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getTechStack() { return techStack; }
    public void setTechStack(List<String> techStack) { this.techStack = techStack; }

    public Long getTeamId() { return teamId; }
    public void setTeamId(Long teamId) { this.teamId = teamId; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
}
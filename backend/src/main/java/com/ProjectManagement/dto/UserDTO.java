package com.ProjectManagement.dto;

import java.util.Set;

public class UserDTO {
    private Long id;  // Changed from Integer to Long
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNo;
    private String techStack;
    private Long teamId;  // Changed from Integer to Long
    private Set<String> roles;

    public UserDTO() {}

    public UserDTO(Long id, String firstName, String lastName, String email, String phoneNo, String techStack, Long teamId, Set<String> roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNo = phoneNo;
        this.techStack = techStack;
        this.teamId = teamId;
        this.roles = roles;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNo() { return phoneNo; }
    public void setPhoneNo(String phoneNo) { this.phoneNo = phoneNo; }

    public String getTechStack() { return techStack; }
    public void setTechStack(String techStack) { this.techStack = techStack; }

    public Long getTeamId() { return teamId; }
    public void setTeamId(Long teamId) { this.teamId = teamId; }

    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }
}

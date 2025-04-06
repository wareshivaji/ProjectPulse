package com.ProjectManagement.Model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "teams")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "hr_id")
    private User hr;

    @ManyToMany
    @JoinTable(
        name = "team_users",
        joinColumns = @JoinColumn(name = "team_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> employees;

    // Constructors, Getters, Setters
    public Team() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public User getHr() { return hr; }
    public void setHr(User hr) { this.hr = hr; }
    public List<User> getEmployees() { return employees; }
    public void setEmployees(List<User> employees) { this.employees = employees; }
}
package com.ProjectManagement.controller;

import com.ProjectManagement.Model.Project;
import com.ProjectManagement.dto.ProjectDTO;
import com.ProjectManagement.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Project> createProject(@RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectService.createProject(projectDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TEAM_LEAD')")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectService.updateProject(id, projectDTO));
    }

    // New endpoints for project listing
    @GetMapping("/by-team/{teamId}")
    public ResponseEntity<List<Project>> getProjectsByTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(projectService.getProjectsByTeam(teamId));
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<Project>> getProjectsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(projectService.getProjectsByUser(userId));
    }

    @GetMapping("/my-projects")
    public ResponseEntity<List<Project>> getMyProjects(Authentication auth) {
        String email = auth.getName();
        return ResponseEntity.ok(projectService.getProjectsByUserEmail(email));
    }
}
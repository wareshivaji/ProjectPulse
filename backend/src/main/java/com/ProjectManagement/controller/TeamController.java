package com.ProjectManagement.controller;

import com.ProjectManagement.Model.Team;
import com.ProjectManagement.Model.User;
import com.ProjectManagement.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {
    @Autowired
    private TeamService teamService;

    @PostMapping
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        return ResponseEntity.ok(teamService.createTeam(team));
    }

    @DeleteMapping("/{teamId}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<String> deleteTeam(@PathVariable Long teamId) {
        teamService.deleteTeam(teamId);
        return ResponseEntity.ok("Team deleted successfully");
    }

    // New endpoints for team member management
    @PostMapping("/{teamId}/members/{userId}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<Team> addTeamMember(
            @PathVariable Long teamId,
            @PathVariable Long userId) {
        return ResponseEntity.ok(teamService.addTeamMember(teamId, userId));
    }

    @DeleteMapping("/{teamId}/members/{userId}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<Team> removeTeamMember(
            @PathVariable Long teamId,
            @PathVariable Long userId) {
        return ResponseEntity.ok(teamService.removeTeamMember(teamId, userId));
    }

    @GetMapping("/{teamId}/members")
    public ResponseEntity<List<User>> getTeamMembers(
            @PathVariable Long teamId) {
        return ResponseEntity.ok(teamService.getTeamMembers(teamId));
    }
}
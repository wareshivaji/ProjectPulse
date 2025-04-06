package com.ProjectManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProjectManagement.Model.ProjectState;
import com.ProjectManagement.service.ProjectStateService;

@RestController
@RequestMapping("/api/states")
public class ProjectStateController {
    @Autowired
    private ProjectStateService stateService;

    @PostMapping
    @PreAuthorize("hasRole('MANAGER') or hasRole('TEAM_LEAD')")
    public ResponseEntity<ProjectState> createState(@RequestBody ProjectState state) {
        return ResponseEntity.ok(stateService.updateState(state));
    }
}
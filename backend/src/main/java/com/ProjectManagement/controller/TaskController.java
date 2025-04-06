package com.ProjectManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ProjectManagement.Model.Task;
import com.ProjectManagement.Model.StateType;
import com.ProjectManagement.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PutMapping("/{taskId}/update-state")
    public ResponseEntity<Task> updateTaskState(@PathVariable Long taskId, @RequestParam StateType newState) {
        return ResponseEntity.ok(taskService.updateTaskState(taskId, newState));
    }
}

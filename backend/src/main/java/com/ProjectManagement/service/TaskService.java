package com.ProjectManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProjectManagement.Model.Task;
import com.ProjectManagement.Model.StateType;
import com.ProjectManagement.Model.TaskStateTransition;
import com.ProjectManagement.repository.TaskRepository;
import com.ProjectManagement.repository.TaskStateTransitionRepository;

import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskStateTransitionRepository transitionRepository;

    public Task updateTaskState(Long taskId, StateType newState) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        StateType currentState = task.getState();

        // Validate if the transition is allowed
        Optional<TaskStateTransition> validTransition = transitionRepository
                .findByFromStateAndToState(currentState, newState);

        if (validTransition.isEmpty() || !validTransition.get().isAllowed()) {
            throw new RuntimeException("Invalid state transition");
        }

        task.setState(newState);
        return taskRepository.save(task);
    }
}

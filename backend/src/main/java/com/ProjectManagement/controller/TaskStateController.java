package com.ProjectManagement.controller;

import com.ProjectManagement.Model.*;
import com.ProjectManagement.dto.TaskStateTransitionDTO;
import com.ProjectManagement.repository.TaskStateTransitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/task-states")
public class TaskStateController {
    @Autowired
    private TaskStateTransitionRepository transitionRepository;

    @PostMapping
    public ResponseEntity<TaskStateTransition> createTransition(
            @RequestBody TaskStateTransitionDTO transitionDTO,
            Authentication authentication) {
        
        User user = (User) authentication.getPrincipal();
        
        TaskStateTransition transition = new TaskStateTransition();
        transition.setFromState(transitionDTO.getFromState());
        transition.setToState(transitionDTO.getToState());
        transition.setAgenda(transitionDTO.getAgenda());
        transition.setWorkDescription(transitionDTO.getWorkDescription());
        transition.setTargetCompletionDate(transitionDTO.getTargetCompletionDate());
        transition.setCreatedBy(user);
        transition.setAllowed(true);
        
        return ResponseEntity.ok(transitionRepository.save(transition));
    }

    @GetMapping("/allowed/{fromState}")
    public ResponseEntity<List<StateType>> getAllowedTransitions(
            @PathVariable StateType fromState,
            Authentication authentication) {
        
        User user = (User) authentication.getPrincipal();
        List<TaskStateTransition> transitions = 
            transitionRepository.findByFromStateAndAllowed(fromState, true);
        
        List<StateType> allowedStates = transitions.stream()
            .filter(t -> isAllowedForRole(t, user.getRole()))
            .map(TaskStateTransition::getToState)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(allowedStates);
    }

    private boolean isAllowedForRole(TaskStateTransition transition, Role role) {
        if (role == null || role.getName() == null) {
            return false;
        }
        
        switch(role.getName()) {
            case MANAGER:
                // Managers can create (TODO), delete (COMPLETED), but not update (IN_PROGRESS)
                return transition.getToState() == StateType.TODO || 
                       transition.getToState() == StateType.COMPLETED;
            case TEAM_LEAD:
                // Team Leads can create (TODO), update (IN_PROGRESS), but not delete
                return transition.getToState() == StateType.TODO ||
                       transition.getToState() == StateType.IN_PROGRESS;
            case SR_DEVELOPER:
                // Sr Devs can create (TODO) and read (current state)
                return transition.getToState() == StateType.TODO;
            case JR_DEVELOPER:
                // Jr Devs can only read (no state changes allowed)
                return false;
            case HR:
                // HR has no direct role in task state management
                return false;
            default:
                return false;
        }
    }
}
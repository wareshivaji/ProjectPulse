package com.ProjectManagement.repository;

import com.ProjectManagement.Model.StateType;
import com.ProjectManagement.Model.TaskStateTransition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskStateTransitionRepository extends JpaRepository<TaskStateTransition, Long> {
    Optional<TaskStateTransition> findByFromStateAndToState(StateType fromState, StateType toState);
    
    List<TaskStateTransition> findByFromStateAndAllowed(StateType fromState, boolean allowed);
}
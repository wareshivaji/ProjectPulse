package com.ProjectManagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProjectManagement.Model.Project;
import com.ProjectManagement.Model.ProjectState;
import com.ProjectManagement.Model.StateType;

@Repository
public interface ProjectStateRepository extends JpaRepository<ProjectState, Long> {
    
    
}
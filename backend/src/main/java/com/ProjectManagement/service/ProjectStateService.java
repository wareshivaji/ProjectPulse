package com.ProjectManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProjectManagement.Model.ProjectState;
import com.ProjectManagement.repository.ProjectStateRepository;

@Service
public class ProjectStateService {
    @Autowired
    private ProjectStateRepository stateRepository;

    public ProjectState updateState(ProjectState state) {
        return stateRepository.save(state);
    }
}
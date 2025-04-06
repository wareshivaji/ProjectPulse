package com.ProjectManagement.service;

import com.ProjectManagement.Model.Project;
import com.ProjectManagement.Model.Team;
import com.ProjectManagement.Model.User;
import com.ProjectManagement.dto.ProjectDTO;
import com.ProjectManagement.repository.ProjectRepository;
import com.ProjectManagement.repository.TeamRepository;
import com.ProjectManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
	
@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    public Project createProject(ProjectDTO projectDTO) {
        Project project = new Project();
        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setTechStack(projectDTO.getTechStack());
        project.setStartDate(projectDTO.getStartDate());
        
        Team team = teamRepository.findById(projectDTO.getTeamId())
                .orElseThrow(() -> new RuntimeException("Team not found"));
        project.setTeam(team);
        
        return projectRepository.save(project);
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public Project updateProject(Long id, ProjectDTO projectDTO) {
        Project project = getProjectById(id);
        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setTechStack(projectDTO.getTechStack());
        project.setStartDate(projectDTO.getStartDate());
        
        if (projectDTO.getTeamId() != null) {
            Team team = teamRepository.findById(projectDTO.getTeamId())
                    .orElseThrow(() -> new RuntimeException("Team not found"));
            project.setTeam(team);
        }
        
        return projectRepository.save(project);
    }

    // New methods for project listing
    public List<Project> getProjectsByTeam(Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        return projectRepository.findByTeam(team);
    }

    public List<Project> getProjectsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return projectRepository.findByTeamIn(user.getTeams());
    }

    public List<Project> getProjectsByUserEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return projectRepository.findByTeamIn(user.getTeams());
    }
}
package com.ProjectManagement.service;

import com.ProjectManagement.Model.Team;
import com.ProjectManagement.Model.User;
import com.ProjectManagement.repository.TeamRepository;
import com.ProjectManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {
    @Autowired
    private TeamRepository teamRepository;
    
    @Autowired
    private UserRepository userRepository;

    public Team createTeam(Team team) {
        if (team.getHr() != null) {
            User hr = userRepository.findById(team.getHr().getId())
                    .orElseThrow(() -> new RuntimeException("HR user not found"));
        }
        return teamRepository.save(team);
    }

    public void deleteTeam(Long teamId) {
        if (!teamRepository.existsById(teamId)) {
            throw new RuntimeException("Team not found");
        }
        teamRepository.deleteById(teamId);
    }

    // New methods for team member management
    public Team addTeamMember(Long teamId, Long userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!team.getEmployees().contains(user)) {
            team.getEmployees().add(user);
            return teamRepository.save(team);
        }
        return team;
    }

    public Team removeTeamMember(Long teamId, Long userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        team.getEmployees().remove(user);
        return teamRepository.save(team);
    }

    public List<User> getTeamMembers(Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        return team.getEmployees();
    }
}
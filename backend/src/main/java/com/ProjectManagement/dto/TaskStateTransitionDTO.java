package com.ProjectManagement.dto;

import com.ProjectManagement.Model.StateType;
//import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class TaskStateTransitionDTO {
    private Long id;
    
//    @NotNull(message = "From state is required")
    private StateType fromState;
    
//    @NotNull(message = "To state is required")
    private StateType toState;
    
//    @NotBlank(message = "Agenda is required")
    private String agenda;
    
    private String workDescription;
    
//    @Future(message = "Target completion date must be in the future")
    private LocalDate targetCompletionDate;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public StateType getFromState() { return fromState; }
    public void setFromState(StateType fromState) { this.fromState = fromState; }
    public StateType getToState() { return toState; }
    public void setToState(StateType toState) { this.toState = toState; }
    public String getAgenda() { return agenda; }
    public void setAgenda(String agenda) { this.agenda = agenda; }
    public String getWorkDescription() { return workDescription; }
    public void setWorkDescription(String workDescription) { this.workDescription = workDescription; }
    public LocalDate getTargetCompletionDate() { return targetCompletionDate; }
    public void setTargetCompletionDate(LocalDate targetCompletionDate) { this.targetCompletionDate = targetCompletionDate; }
}
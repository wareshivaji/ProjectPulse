package com.ProjectManagement.Model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "task_state_transitions")
public class TaskStateTransition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private StateType fromState;

    @Enumerated(EnumType.STRING)
    private StateType toState;

    private boolean allowed;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Column(length = 1000)
    private String agenda;

    @Column(length = 1000)
    private String workDescription;

    private LocalDate targetCompletionDate;

    // Constructors
    public TaskStateTransition() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public StateType getFromState() { return fromState; }
    public void setFromState(StateType fromState) { this.fromState = fromState; }

    public StateType getToState() { return toState; }
    public void setToState(StateType toState) { this.toState = toState; }

    public boolean isAllowed() { return allowed; }
    public void setAllowed(boolean allowed) { this.allowed = allowed; }

    public Task getTask() { return task; }
    public void setTask(Task task) { this.task = task; }

    public User getCreatedBy() { return createdBy; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }

    public String getAgenda() { return agenda; }
    public void setAgenda(String agenda) { this.agenda = agenda; }

    public String getWorkDescription() { return workDescription; }
    public void setWorkDescription(String workDescription) { this.workDescription = workDescription; }

    public LocalDate getTargetCompletionDate() { return targetCompletionDate; }
    public void setTargetCompletionDate(LocalDate targetCompletionDate) { this.targetCompletionDate = targetCompletionDate; }
}
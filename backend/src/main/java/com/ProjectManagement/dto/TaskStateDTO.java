package com.ProjectManagement.dto;

public class TaskStateDTO {
    private Long id;
    private String name;

    public TaskStateDTO() {}

    public TaskStateDTO(Long id, String name) {
//        this.id = id;
        this.name = name;
    }

//    public Long getId() { return id; }
//    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

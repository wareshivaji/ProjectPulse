package com.ProjectManagement.dto;

import java.util.List;

public class ProfileUpdateDTO {
    private String phoneNo;
    private List<String> techStack;
    private String address;
    private String postalCode;

    // Getters and Setters
    public String getPhoneNo() { return phoneNo; }
    public void setPhoneNo(String phoneNo) { this.phoneNo = phoneNo; }
    public List<String> getTechStack() { return techStack; }
    public void setTechStack(List<String> techStack) { this.techStack = techStack; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }
}
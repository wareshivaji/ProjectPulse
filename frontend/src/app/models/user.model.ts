// src/app/models/user.model.ts
// src/app/models/user.model.ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo?: string;
  techStack?: string[];
  address?: string;
  postalCode?: string;
  role: Role;
  token?: string;
}

export interface Role {
  id: number;
  name: ERole;  // Changed from string to ERole enum
  permissions?: Permission[];
}

export enum ERole {
  MANAGER = 'MANAGER',
  TEAM_LEAD = 'TEAM_LEAD',
  SR_DEVELOPER = 'SR_DEVELOPER',
  JR_DEVELOPER = 'JR_DEVELOPER',
  HR = 'HR'
}

export interface Permission {
  id: number;
  name: string;
}
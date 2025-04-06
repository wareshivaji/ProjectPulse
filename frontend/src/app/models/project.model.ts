// src/app/models/project.model.ts
import { Team } from './team.model';
import { ProjectState } from './project-state.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  team: Team;
  states: ProjectState[];
  startDate: Date;
}

export interface ProjectDTO {
  name: string;
  description: string;
  techStack: string[];
  teamId: number;
  startDate: Date;
}
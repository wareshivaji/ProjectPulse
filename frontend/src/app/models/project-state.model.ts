// src/app/models/project-state.model.ts
import { Project } from './project.model';
import { StateType } from './state-type.enum';

export interface ProjectState {
  id: number;
  project: Project;
  state: StateType;
  description: string;
  date: Date;
}
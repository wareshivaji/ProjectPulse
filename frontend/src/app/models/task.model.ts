// src/app/models/task.model.ts
import { Project } from './project.model';
import { User } from './user.model';
import { Team } from './team.model';
import { StateType } from './state-type.enum';

export interface Task {
  id: number;
  project: Project;
  state: StateType;
  description: string;
  assignedDate: string;
  assignedUser?: User;
  assignedTeam?: Team;
}


export interface TaskStateTransition {
    id?: number;  // Made optional with ?
    fromState: StateType;
    toState: StateType;
    allowed: boolean;
    agenda: string;
    workDescription: string;
    targetCompletionDate: Date;
    task?: Task;
    createdBy?: User;
  }
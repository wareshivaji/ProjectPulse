// src/app/models/team.model.ts
import { User } from './user.model';

export interface Team {
  id: number;
  name: string;
  hr: User;
  employees: User[];
}

export interface TeamDTO {
  name: string;
  userIds: number[];
}
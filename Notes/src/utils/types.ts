import {PRIORITY} from './constants';

export type Priority = keyof typeof PRIORITY;

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  createdAt: string;
}

export type NewTask = Pick<Task, 'title' | 'priority'>;

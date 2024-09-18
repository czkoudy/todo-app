import { z } from 'zod';

export const taskSchema = z.object({
  completed: z.boolean(),
  completedDate: z.number().optional(),
  createdDate: z.number(),
  id: z.string(),
  text: z.string(),
});

export const tasksSchema = z.array(taskSchema);

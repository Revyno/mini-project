import { z } from "zod";
export const CreateTaskSchema = z.object({
  title: z.string().min(1, "Title required").max(100),
  description: z.string().max(500).optional(),
  dueDate: z.string().optional(),
  status: z.enum(["todo","inProgress","completed"]).optional(),
  priority: z.enum(["low","normal","high"]).optional(),
});

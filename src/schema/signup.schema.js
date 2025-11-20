import { z } from "zod";
export const SignupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password at least 6 chars"),
});

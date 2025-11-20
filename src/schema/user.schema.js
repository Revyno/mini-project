import { z } from 'zod'


export const UserQuerySchema = z.object({
page: z.number().min(1).optional()
})
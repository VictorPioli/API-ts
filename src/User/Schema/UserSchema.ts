import z from "zod"

export const userMongoSchema = z.object( {
    name: z.string(),
    email: z.email(),
    password: z.string()
})  
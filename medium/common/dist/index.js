// zod validation schemas and types  are here
import * as z from "zod";
export const signupInput = z.object({
    username: z.string().trim(),
    useremail: z.email(),
    password: z.string().trim().min(6, "Password must contains 6 characters.")
});
export const signinInput = z.object({
    username: z.string().trim(),
    useremail: z.email(),
    password: z.string().trim().min(6, "Password must contains 6 characters.")
});
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional()
});
export const uploadBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string(),
    published: z.boolean().optional()
});
export const postSchema = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional()
});
//# sourceMappingURL=index.js.map
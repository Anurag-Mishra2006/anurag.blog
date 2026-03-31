import * as z from "zod";
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    useremail: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signinInput: z.ZodObject<{
    username: z.ZodString;
    useremail: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const uploadBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const postSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type SignupInput = z.infer<typeof signupInput>;
export type UploadBlogInput = z.infer<typeof uploadBlogInput>;
//# sourceMappingURL=index.d.ts.map
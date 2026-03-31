import { Hono } from "hono";
import auth from "./auth.middleware";
import { getPrisma } from "./db";
import { User } from "@prisma/client"
import { signinInput, signupInput, createBlogInput, uploadBlogInput } from "@morpheus.live/medium-common"

const postRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET_KEY: string
    },
    Variables: {
        user: User
    }
}>();

type postType = {
    title: string,
    content: string,
    published: boolean
}



postRoute.get("/", async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    const allposts = await prisma.post.findMany({});
    return c.json(allposts)
});

postRoute.get("/bulk", async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const blogs = await prisma.post.findMany();
    return c.json({ blogs })
})

postRoute.get("/:id", async (c) => {

    const prisma = getPrisma(c.env.DATABASE_URL);
    const postId = await c.req.param("id");

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });
    if (!post) {
        return c.json({ error: "Post Not Found" }, 404)
    }
    return c.json(post)
});

postRoute.use("*", auth)
// you should add pagenation here -> will look it later

postRoute.post("/", async (c) => {
    try {
        const prisma = getPrisma(c.env.DATABASE_URL)
        const body = await c.req.json();
        const response = createBlogInput.safeParse(body);
        if (!response.success) {
            return c.json({ error: "Invalid Input" }, 400)
        }
        const data = response.data;
        const user = c.get("user")   // from auth middleware

        const post = await prisma.post.create({
            data: {
                title: data?.title,
                content: data?.content,
                published: data?.published,
                authorId: user.id
            }
        });
        return c.json({ post }, 201);
    } catch (error) {
        // @ts-ignore
        console.log(error)
        return c.json({ error: "Internal Server Error" }, 500)
    }

})

postRoute.put("/:id", async (c) => {
    try {
        const prisma = getPrisma(c.env.DATABASE_URL);
        const postid = c.req.param("id");
        const body = await c.req.json();
        const user = c.get("user");
        const userId = user.id;
        const response = uploadBlogInput.safeParse(body);
        if (!response.success) return c.json({ error: "Invalid Input" }, 400);
        const data = response.data;
        const post = await prisma.post.updateMany({
            where: {
                id: postid, 
                authorId: userId
            },
            data: {
                title: data?.title,
                content: data?.content,
                published: data?.published
            }
        });
        if(post.count == 0){
            return c.json({error: "Unauthorized User"}, 403)
        };
        return c.json({ post }, 201)
    } catch (error) {
        return c.json({ error: "Internal Server Error" }, 500)
    }
})

export default postRoute;
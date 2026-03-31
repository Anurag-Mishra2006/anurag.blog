import { createMiddleware } from "hono/factory";
import { getPrisma } from "./db";
import { verify } from "hono/jwt";

type JWTPayload = {
    id: string, 
    useremail : string
}

const auth = createMiddleware(async (c, next) => {
    try {
        const header = c.req.header("Authorization");
        if (!header) {
            return c.json({ error: "Authorization is missing" }, 401);
        }
        const token = header.split(" ")[1];
        if(! token )return c.json({error: "token not found"}, 401);
        
        const payload = await verify(token, c.env.JWT_SECRET_KEY, "HS256") as JWTPayload;

        const prisma = getPrisma(c.env.DATABASE_URL);

        const user = await prisma.user.findUnique({
            where: {
                id: payload.id,
            }
        });
        if (!user) {
            return c.json({ error: "User Not Found" }, 404)
        };
        // store user in context
        c.set("user", user);

        // @ts-ignore
        // console.log("middleware passed ", user);
        await next();

    } catch (error) {

        // @ts-ignore
        console.log(error);
        return c.json({ error: "Unauthorized User" }, 403)
    }
})

export default auth;
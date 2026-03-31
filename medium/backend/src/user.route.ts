import { Hono } from "hono";
import * as z from "zod";
import { signinInput, signupInput } from "@morpheus.live/medium-common"

import bcrypt from "bcryptjs";
import { decode, sign, verify } from "hono/jwt";
import { getPrisma } from "./db"

const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET_KEY: string
    }, 
    Variables: {
        id: String
    }
}>();

userRoute.post("/signup", async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
        const body = await c.req.json();

        // @ts-ignore
        // console.log(body);

        const bodyobj = {
            username: body.username,
            useremail: body.useremail,
            password: body.password
        }
        const response = signupInput.safeParse(bodyobj);
        if (response.success) {
            // now validation done -> success, extract the data from the response
            const data = response.data;
            // do the rest stuffs: 
            // check email exist or not
            const userExist = await prisma.user.findUnique({
                where: {
                    useremail: data.useremail
                }
            });

            if (userExist) {
                return c.json({ error: "User already exist" }, 409);
            }
            // hash password
            const password = data.password;
            const hashedPassword = await bcrypt.hash(password, 10);
            // save user in db
            const user = await prisma.user.create({
                data: {
                    username: data.username,
                    useremail: data.useremail,
                    password: hashedPassword
                }
            })
            // @ts-ignore
            // console.log(hashedPassword);

            // generate jwt 
            const payload = {
                id: user.id,
                useremail: user.useremail
            }
            // @ts-ignore
            // console.log(payload);

            // getting jwt_secret_key from the .env of the context 
            const token = await sign(payload, c.env.JWT_SECRET_KEY, "HS256");

            // @ts-ignore
            console.log("token: ", token);

            // return jwt token
            return c.json({ token });
        }
        // else when the response success is failed
        return c.json({ error: response.error }, 400);
    } catch (error) {
        // @ts-ignore
        console.error(error)
        return c.json({ error: "Internal Server Error" }, 500)
    }

});

userRoute.post("/signin", async (c) => {
    try {
        const prisma = getPrisma(c.env.DATABASE_URL);
        const body = await c.req.json();
        const bodyobj = {
            username: body.username,
            useremail: body.useremail,
            password: body.password
        }
        const response = signinInput.safeParse(bodyobj);
        if (!response.success) {
            return c.json({ error: response.error }, 400)
        }
        const data = response.data;
        // now check for the user
        const user = await prisma.user.findUnique({
            where: {
                useremail: data.useremail
            }
        });
        if (!user) {
            c.status(404)
            return c.json({ error: "Invalid Credentials" }, 401)
        };
        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) {
            return c.json({ error: "Invalid Credentials" }, 401)
        }
        const generatedJWT = await sign({
            id: user.id,
            useremail: user.useremail,
            // expiration of the token  in 24 hours
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
        }, c.env.JWT_SECRET_KEY, "HS256",
        );

        // @ts-ignore
        // console.log(generatedJWT);

        return c.json({ token: generatedJWT });

    } catch (error) {
        // @ts-ignore
        console.log(error);
        return c.json({ error: "Internal Server Error" }, 500);
    }

})


export default userRoute;

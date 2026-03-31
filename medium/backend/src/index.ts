import { Hono } from 'hono'
import userRoute from './user.route'
import postRoute from './post.route'
import { cors } from 'hono/cors'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Welcome to the blogging app')
})

app.use(cors());

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", postRoute);

export default app

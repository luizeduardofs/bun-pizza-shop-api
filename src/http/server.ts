import cookie from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";
import { env } from "../env";
import { registerRestaurant } from "./routes/register-restaurant";
import { sendAuthLink } from "./routes/send-auth-link";

const app = new Elysia();

app.use(
  jwt({
    secret: env.JWT_SECRET_KEY,
    schema: t.Object({
      sub: t.String(),
      restaurantId: t.Optional(t.String()),
    }),
  })
);

app.use(cookie());

app.use(registerRestaurant);
app.use(sendAuthLink);

app.listen(3000, () => {
  console.log("Server is running 🔥");
});

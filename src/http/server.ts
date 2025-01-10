import { Elysia } from "elysia";
import { registerRestaurant } from "./routes/register-restaurant";
import { sendAuthLink } from "./routes/send-auth-link";

const app = new Elysia();

app.use(registerRestaurant);
app.use(sendAuthLink);

app.listen(3000, () => {
  console.log("Server is running 🔥");
});

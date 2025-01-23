import Elysia from "elysia";
import { auth } from "../auth";

export const getProfile = new Elysia()
  .use(auth)
  .get("/me", async ({ cookie }) => {});

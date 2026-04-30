import { Hono } from "hono";
import { AuthController } from "@/controllers/auth.controller";
import { loginSchema } from "@/schemas/user.schema";
import { validate } from "@/middleware/validate.middleware";
import { createUserSchema } from "@/schemas/user.schema";

const authRouter = new Hono();

authRouter.post("/register", validate(createUserSchema), AuthController.register);
authRouter.post("/login", validate(loginSchema), AuthController.login);
authRouter.post("/refresh", AuthController.refresh);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
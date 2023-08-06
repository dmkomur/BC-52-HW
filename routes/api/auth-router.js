import express from "express";
import { validateBody } from "../../decorators/index.js";
import authControllers from "../../controlers/auth-controllers.js";
import { authenticate, upload } from "../../middlewares/index.js";
import usersSchemas from "../../schemas/users-schemas.js";

const userSignupValidate = validateBody(usersSchemas.userSignupSchema);
const userSigninValidate = validateBody(usersSchemas.userSigninSchema);

const authRouter = express.Router();

authRouter.post("/signup", userSignupValidate, authControllers.signup);

authRouter.post("/signin", userSigninValidate, authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/signout", authenticate, authControllers.signout);

authRouter.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.changeAvatar
);

export default authRouter;

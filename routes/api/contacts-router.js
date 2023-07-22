import express from "express";

// 4vgNNBH6EeUBRFmz

import contactsController from "../../controlers/contacts-controllers.js";

import { validateBody } from "../../decorators/index.js";

import contactsSchema from "../../schemas/contacts-schema.js";

import { isEmptyBody } from "../../middlewares/index.js";

const contactAddValidate = validateBody(contactsSchema.contactAddSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post(
  "/",
  contactAddValidate,
  isEmptyBody,
  contactsController.add
);

contactsRouter.delete("/:contactId", contactsController.deleteById);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  contactAddValidate,
  contactsController.updateById
);

export default contactsRouter;

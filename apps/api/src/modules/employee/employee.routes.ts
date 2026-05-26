import { Router } from "express";

import { EmployeeController } from "./employee.controller";

const router = Router();

const controller = new EmployeeController();

router.post("/", controller.create);

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.patch("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;

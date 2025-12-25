
import {Router} from "express";

import {getUser,createUser,getUserById,updateUser,deleteUser} from "../controllers/userController.js";

const router = Router();

router.get("/", getUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.get("/:id", getUserById);

export default router;

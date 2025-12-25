
import {Router} from "express";

import {getUser,createUser} from "../controllers/userController";

const router = Router();

router.get("/", getUser);
router.post("/", createUser);
// router.delete("/", deleteUser);
// router.put("/", updateUser);
// router.get("/", getUserById);

export default router;

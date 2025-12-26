
import {Router} from "express";

import {getUser,createUser,getUserById,updateUser,deleteUser} from "../controllers/userController.js";
import { registerUser,loginUser,getUserProfile,updateProfile ,createProfile} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/profile", authMiddleware, createProfile);

router.get("/", getUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.get("/:id", getUserById);


export default router; 

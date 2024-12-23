import express from "express";
import { messageContoller } from "../controllers/index.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/user", protectRoute, messageContoller.getAllUsers);


export default router;


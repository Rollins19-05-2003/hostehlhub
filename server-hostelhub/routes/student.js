import express from "express";
import { createRoomPref } from "../controllers/student.js";

const router = express.Router();

router.post("/createRoomPref", createRoomPref);

export default router;
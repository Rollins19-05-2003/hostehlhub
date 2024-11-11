import express from "express";
import { createRoomPref, getPrefferedRoommate } from "../controllers/student.js";

const router = express.Router();

router.post("/createRoomPref", createRoomPref);
router.get("/getPrefferedRoommate/:studentId", getPrefferedRoommate);
export default router;
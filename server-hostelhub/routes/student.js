import express from "express";
import { createRoomPref, getPrefferedRoommate, submitFeedback } from "../controllers/student.js";

const router = express.Router();

router.post("/createRoomPref", createRoomPref);
router.get("/getPrefferedRoommate/:studentId", getPrefferedRoommate);
router.post("/submitFeedback", submitFeedback);
export default router;
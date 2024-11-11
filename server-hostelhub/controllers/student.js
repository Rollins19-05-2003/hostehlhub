import RoomPref from "../models/student/room-pref.js";

const createRoomPref = async (req, res) => {

    const { studentId, roomType, nonVeg, hobbies, state, branch } = req.body;
    try {
        const roomPref = await RoomPref.create({ studentId, roomType, nonVeg, hobbies, state, branch });
        res.status(201).json(roomPref);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { createRoomPref };
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

const getPrefferedRoommate = async (req, res) => {
    const { studentId } = req.params;
    
    try {
        const studentPref = await RoomPref.findOne({ studentId });
        if (!studentPref) {
            return res.status(404).json({ message: "Student preferences not found" });
        }

        const potentialRoommates = await RoomPref.find({ 
            studentId: { $ne: studentId },
            roomType: studentPref.roomType 
        });

        const scoredRoommates = potentialRoommates.map(roommate => {
            let score = 0;
            if (roommate?.nonVeg === studentPref?.nonVeg) score += 2;
            if (roommate?.state === studentPref?.state) score += 1;
            if (roommate?.branch === studentPref?.branch) score += 1;
            const commonHobbies = studentPref?.hobbies?.filter(hobby => 
                roommate?.hobbies?.includes(hobby)
            );
            score += commonHobbies.length;

            return {
                studentId: roommate?.studentId,
                score,
                preferences: roommate
            };
        });
        
        const recommendations = scoredRoommates
            .sort((a, b) => b?.score - a?.score)
            .slice(0, 5); // Return top 5 matches

        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const submitFeedback = async (req, res) => {
  const { message } = req.body;
  try {
    const feedback = new Feedback({ message });
    await feedback.save();
    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to submit feedback' });
  }
};


export { createRoomPref, getPrefferedRoommate, submitFeedback };

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
        // Get requesting student's preferences
        const studentPref = await RoomPref.findOne({ studentId });
        if (!studentPref) {
            return res.status(404).json({ message: "Student preferences not found" });
        }

        // Find potential roommates (excluding the requesting student)
        const potentialRoommates = await RoomPref.find({ 
            studentId: { $ne: studentId },
            roomType: studentPref.roomType // Match room type preference
        });

        // Score and sort potential roommates
        const scoredRoommates = potentialRoommates.map(roommate => {
            let score = 0;
            
            // Match based on food preference (non-veg/veg)
            if (roommate?.nonVeg === studentPref?.nonVeg) score += 2;
            
            // Match based on state
            if (roommate?.state === studentPref?.state) score += 1;
            
            // Match based on branch
            if (roommate?.branch === studentPref?.branch) score += 1;
            
            // Match based on common hobbies
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

        // Sort by score in descending order
        const recommendations = scoredRoommates
            .sort((a, b) => b?.score - a?.score)
            .slice(0, 5); // Return top 5 matches

        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createRoomPref, getPrefferedRoommate };

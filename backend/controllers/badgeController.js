const Badge = require('../models/Badge');
const User = require('../models/User');

const getAllBadges = async (req, res) => {
    try {
        const data = await Badge.find({});

        return res.status(200).send({
            data,
            isSuccess: true
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message,
            isSuccess: false
        })
    }
}

const addBadgeForUser = async (req, res) => {
    try {

        //get user id from req.user
        const userId = req.user._id;
        const badgeId = req.body.badgeId;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({
                error: 'User not found',
                isSuccess: false
            })
        }
        const badge = await Badge.findById(badgeId);
        if (!badge) {
            return res.status(404).send({
                error: 'Badge not found',
                isSuccess: false
            })
        }
        if (user.badges.includes(badge)) {
            return res.status(400).send({
                error: 'Badge already added',
                isSuccess: false
            })
        }
        user.badges.push(badge);
        await user.save();
        return res.status(200).send({
            data: user,
            isSuccess: true
        })
    } catch (error) {
        return res.status(500).send({
            data: null,
            isSuccess: false
        })
    }
}

const getBadgesForUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate('badges'); // Assuming 'badges' field in User references Badge model

        if (!user) {
            return res.status(404).send({
                error: 'User not found',
                isSuccess: false
            });
        }

        // Send response with the user's badges
        return res.status(200).send({
            data: user.badges, // Return badges associated with the user
            isSuccess: true
        });
    } catch (error) {
        return res.status(500).send({
            error: error.message,
            isSuccess: false
        });
    }
};


module.exports = {getAllBadges, addBadgeForUser, getBadgesForUser}

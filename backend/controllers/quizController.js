const Quiz = require('../models/Quiz');


const getAllQuiz = async (req, res) => {
    try {
        const data = await Quiz.find({});

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

module.exports = {getAllQuiz}

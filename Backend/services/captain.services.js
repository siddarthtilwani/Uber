const captainModel = require('../models/captain.model')

exports.createCaptain = async ({ firstname, lastname, email, password ,number,color,capacity,veichleType}) => {
    if (!firstname  || !email || !password, !number, !color, !capacity, !veichleType) {
        throw new Error("all fields are required")
    }
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        veichle:{
            number,
            color,
            capacity,
            veichleType
        }
    })
    return captain
}
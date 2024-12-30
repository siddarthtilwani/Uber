const captainModel = require('../models/captain.model')

exports.createCaptain = async ({ firstname, lastname, email, password ,number,color,capacity,vehicleType}) => {
    if (!firstname  || !email || !password, !number, !color, !capacity, !vehicleType) {
        throw new Error("all fields are required")
    }
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            number,
            color,
            capacity,
            vehicleType
        }
    })
    return captain
}
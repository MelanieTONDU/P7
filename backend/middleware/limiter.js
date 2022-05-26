const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 7,
    message : "Trop de tentative, veuillez patienter avant de réessayer !",
})

module.exports = limiter;
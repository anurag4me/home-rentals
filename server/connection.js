const mongoose = require("mongoose")

function mongoDbConnect(url) {
    return mongoose.connect(url)
}

module.exports = mongoDbConnect
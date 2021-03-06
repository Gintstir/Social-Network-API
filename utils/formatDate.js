const moment = require('moment');

const formatDate = function(rawDate) {
    return moment(rawDate).format("dddd, MMMM Do YYYY, h:mm:ss a")
}
module.exports = formatDate
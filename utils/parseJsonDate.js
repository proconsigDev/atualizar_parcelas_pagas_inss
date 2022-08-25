const moment = require('moment');

const dataNasc = async(jsonDateString) => {
    if (jsonDateString !== null) {
        let date = new Date(parseInt(jsonDateString.replace('/Date(', '')))
        let dateFormat = moment(date).format("YYYY-MM-DD");
        return dateFormat;
    } else {
        return jsonDateString
    }
}

module.exports = {
    dataNasc
}
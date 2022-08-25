const directory = async(url) => {
    return new Promise((resolve, reject) => {
        let diretory = url.split("/").slice(4)
        let result = diretory[0].split("?").slice(0,1)

        resolve(result[0]);
    })
};

// SERVE PARA RECUPERAR OS PARAMETRO DE UMA URL
const params = async(url) => {
    return new Promise((resolve, reject) => {
        var params = {};
        (url + '?').split('?')[1].split('&').forEach(
            function(pair) {
                pair = (pair + '=').split('=').map(decodeURIComponent);
                if (pair[0].length) {
                    params[pair[0]] = pair[1];
                }
            });

        resolve(params);
    })
};

module.exports = {
    directory,
    params
}
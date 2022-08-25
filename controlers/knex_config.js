const knex = require('knex');

const pro_new = knex({
    client: 'mysql',
    connection: {
        host: '209.126.8.66',
        user: 'proconsig',
        password: '!Wrdp261',
        database: 'proclients'
    },
    pool: { min: 0, max: 180 }
});

const inss = knex({
    client: 'mysql',
    connection: {
        host: '209.126.8.66',
        user: 'proconsig',
        password: '!Wrdp261',
        database: 'inss'
    },
    pool: { min: 0, max: 180 }
});


module.exports = {
    pro_new,
    inss
}
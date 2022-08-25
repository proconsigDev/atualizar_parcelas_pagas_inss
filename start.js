const mysql = require("./controlers/db-crud")
const knex = require("./controlers/knex_config");
const moment = require('moment')
const {
    default: axios
} = require('axios');

let count = 0;

const execute = async(clients) => {

    const date = moment(new Date()).format('YYYY-MM-DD');

    if (clients && clients.length > 0) {
        for (const c of clients) {
            var diff = moment(date, "YYYY-MM-DD").diff(c.clie_rubrica_competencia, "YYYY-MM-DD");
            var dias = moment.duration(diff).asMonths();
            const diferenca = parseInt(dias)
            console.log(diferenca, c.clie_rubrica_id)
            await knex.pro_new.from('gcr_clie_rubricas').where('clie_rubrica_id', c.clie_rubrica_id).update({
                clie_rubrica_parcelas_pagas: diferenca,
                clie_rubrica_update: date
            }).then(() => {
                console.log('atualizado com sucesso')
            })
        }

        return true;

    } else {
        console.log('não existe mais cliente')
    }

}


async function formatCpf(value) {
    return (`00000000000${value}`).slice(-11);
}

async function formatSexo(value) {
    return value == "M" ? "MASCULINO" : value == "F" ? "FEMININO" : null;
}

async function formatCep(value) {
    return value == null ? null : value == 'NULL' ? null : (`00000000 ${value}`).replace('-', '').slice(-8);
}

async function formatEmail(value) {
    return value == '' ? null : value == null ? null : value == 'NULL' ? null : value.toLowerCase();
}

async function formatMoney(value) {
    return value == null ? null : parseFloat(parseFloat(value).toFixed(2));
}

async function formatDate(value) {
    return value == null ? null : moment(value, ['MM/YYYY', 'YYYY-MM', 'DD/MM/YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD');
}

async function formatUpperCase(value) {
    return value == '' ? null : value == null ? null : value == 'NULL' ? null : value.toUpperCase();
}

async function formatAgenciaConta(value) {
    return value == '-' ? null : value == '' ? null : value == null ? null : value == 'NULL' ? null : value.replace('-', '');
}

async function formatTrueFalse(value) {
    return value == '' ? null : value == null ? null : value == 'NULL' ? null : value == '1' ? 1 : 0;
}

async function formatInt(value) {
    return value == '' ? null : value == null ? null : value == 'NULL' ? null : parseInt(value);
}


module.exports = {
    execute
}
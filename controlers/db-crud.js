const knex = require("./knex_config");
const moment = require('moment')

// READ FUNCTIONS
//
// GET CLIENTS WITH LIMIT
const bank_cod = ['029', '422', '623'];

const getRubricas = async(limit, offset) => {
    const date = moment(new Date()).format('YYYY-MM-DD');

    let result = await knex.pro_new
        .select("clie_rubrica_id", "clie_rubrica_competencia_end", "clie_rubrica_competencia")
        .from("gcr_clie_rubricas")
        .whereNull('clie_rubrica_update')
        // .where('clie_rubrica_competencia_end', '<=', date)
        // .whereIn("banco_emprestimo", bank_cod)
        // .whereNull('insert')
        // .groupBy("clie_beneficio_id")
        .limit(limit)
        .offset(offset)

    return result.map((row) => ({
        clie_rubrica_id: row.clie_rubrica_id,
        clie_rubrica_competencia: row.clie_rubrica_competencia,
        clie_rubrica_competencia_end: row.clie_rubrica_competencia_end,
    }));
};


module.exports = {
    getRubricas,
};
const fs = require("fs");
const moment = require("moment");

const importCsv = async(filePathCSV) => {
    const objJson = [];
    let count = 0;
    let percentual;

    let data = fs
        .readFileSync(filePathCSV, { encoding: "utf8" })
        .toString()
        .split("\n")
        .map((e) => e.trim().replace('"', ""))
        .map((e) => e.split(";").map((e) => e.trim().replace('"', "")));

    data.map((e) => {
        count++;
        percentual = Math.round((parseInt(count) / data.length) * 100);
        console.log(percentual + "%");

        // Verificar Se existe o Cliente
        let findClient = objJson.find((obj) => obj.client.client_cpf === e[0]);
        //Se não adiciona o cliente
        if (!findClient) {
            objClient = {
                client: {
                    client_cpf: e[0],
                    client_name: e[1],
                    client_datebirth: moment(e[2], "DD/MM/YYYY").format("YYYY-MM-DD"),
                    client_email: e[27],
                    created_at: moment(new Date()).format("YYYY-MM-DD"),
                },
                address: {
                    clie_address_cep: e[11],
                    clie_address_street: e[12],
                    clie_address_district: e[10],
                    clie_address_city: e[9],
                    clie_address_uf: e[8],
                },
                phones: [],
                beneficios: [],
            };

            // Adiciona os telefones do cliente
            for (i = 13; i < 27; i++) {
                if (e[i] !== "") {
                    objClient.phones.push({
                        clie_phone_dd: e[i].substr(0, 2),
                        clie_phone_number: e[i].substr(2, 11),
                    });
                }
            }

            // Adiciona o beneficios do cliente e contrato
            let renda = e[7].replace("R$", "").replace(".", "").replace(",", ".");
            objClient.beneficios.push({
                clie_beneficio_number: e[3],
                clie_beneficio_especie_cod: e[4],
                clie_beneficio_data_concessao: e[5],
                clie_beneficio_qtd_emprestimos: 0,
                clie_beneficio_margem_livre: parseInt(renda) * 0.35,
                clie_beneficio_margem_cartao: parseInt(renda) * 0.05,
                clie_beneficio_renda: renda,
            });

            // Adiciona o cliente no json
            objJson.push(objClient);
        } else {
            //Se já existe o cliente, verifica se existe o beneficio
            let renda = e[7].replace("R$", "").replace(".", "").replace(",", ".");
            let findBeneficio = findClient.beneficios.find(
                (ben) => ben.clie_beneficio_number === e[4]
            );
            //Se não existe adiciona o beneficios do cliente e contrato
            if (!findBeneficio) {
                findClient.beneficios.push({
                    clie_beneficio_number: e[3],
                    clie_beneficio_especie_cod: e[4],
                    clie_beneficio_data_concessao: e[5],
                    clie_beneficio_qtd_emprestimos: 0,
                    clie_beneficio_margem_livre: parseInt(renda) * 0.35,
                    clie_beneficio_margem_cartao: parseInt(renda) * 0.05,
                    clie_beneficio_renda: renda,
                });
            }
        }
    });

    return objJson;
};

module.exports = {
    importCsv,
};
require("dotenv").config();

const mysql = require("./controlers/db-crud")
const start = require("./start")
const chalk = require("chalk");
const log = console.log;


async function startClient() {

    const limit = 10;
    const offset = 30000;

    const rubricas = await mysql.getRubricas(limit, offset);
    const execute = await start.execute(rubricas);

    if (execute === true) {
        setTimeout(async() => {
            console.log('consultando novamente')
            await startClient();
        }, 500)

    }
}

(async() => {
    await startClient();
})();
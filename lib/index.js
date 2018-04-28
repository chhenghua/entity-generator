
const mysql = require('./mysql');
const writeFile = require('./writeFile');

const defaultOptions = {
    dialect: 'mysql',
    port: 3306
};

class Generator {
    constructor(host, database, username, password, options = defaultOptions) {
        switch (options.dialect) {
            case 'mysql':
                this.db = mysql({
                    host,
                    database,
                    username,
                    password,
                    port: options.port,
                    opt: options
                });
                break;
            default:
                throw new Error('');
        }
    }
}

module.exports = options => {
    const gen = new Generator(options.host,
        options.database,
        options.username,
        options.password,
        options.options
    );

    (async () => {
        await gen.db.getConn();
        await gen.db.getAllTables();
        console.log('gen.db.tables###############'.replace(10))
        console.log(gen.db.tables);
        gen.db.tables.forEach(async table => {
            const desc = await gen.db.tableDetail(table[`Tables_in_${options.database}`]);
            console.log('des#################'.replace(10));
            console.log(desc);
            await writeFile(options.path, table[`Tables_in_${options.database}`], desc);
        });
    })();
};

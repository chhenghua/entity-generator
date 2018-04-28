
const mysql = require('mysql');

const getConn = pool => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return reject(err);
            }
            return resolve(conn);
        });
    });
};

const getQuery = (conn, sql, params = []) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

class Mysql {
    constructor(options) {
        this.pool = mysql.createPool({
            host: options.host,
            user: options.username,
            password: options.password,
            database: options.database,
            port: options.port,
            connectionLimit: 10
        });
    }
    async getConn() {
        try {
            this.conn = await getConn(this.pool);
        } catch (e) {
            throw e;
        }
    }
    async getAllTables() {
        try {
            this.tables = await getQuery(this.conn, 'show tables');
        } catch (e) {
            throw e;
        }
    }
    async tableDetail(table) {
        try {
            return await getQuery(this.conn, `show full columns from ${table}`);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = options => {
    return new Mysql(options);
};

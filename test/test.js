
const generator = require('../lib');

generator({
    host: '172.29.1.15',
    database: 'wk',
    username: 'root',
    password: '123456',
    path: '/work/WK-server-egg-ts/app/model',
    sequelizeOpt: {
        freezeTableName: true,
        timestamps: false
    }
});

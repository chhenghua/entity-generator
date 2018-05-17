
const fs = require('fs');

const {toCamel} = require('./util');
const genData = require('./genData');
const dirGen = require('./dirGen');

const writeData = (fileName, path, fileData) => {
    // dirGen(path);
    fs.writeFileSync(fileName, fileData);
};

module.exports = (path, tableName, tableData, sequelizeOpt) => {
    const fileName = toCamel(tableName);
    const data = genData(fileName, tableName, tableData, sequelizeOpt);
    writeData(`${path}/${fileName}.ts`, path, data);
};

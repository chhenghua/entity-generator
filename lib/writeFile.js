
const fs = require('fs');

const {toCamel} = require('./util');
const genData = require('./genData');

const writeData = (path, fileData) => {
    fs.writeFileSync(path, fileData);
};

module.exports = (path, tableName, tableData) => {
    const fileName = toCamel(tableName);
    const data = genData(fileName, tableName, tableData);
    writeData(`${path}/${fileName}.ts`, data);
};

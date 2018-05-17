
const {toCamel} = require('./util');

const dataTypes = {
    'date': 'Sequelize.DATEONLY',
    'varchar': 'Sequelize.STRING',
    'text': 'Sequelize.TEXT',
    'int': 'Sequelize.INTEGER',
    'decimal': 'Sequelize.DECIMAL',
    'float': 'Sequelize.FLOAT',
    'bigint': 'Sequelize.BIGINT',
    'datetime': 'Sequelize.DATE',
    'timestamp': 'Sequelize.DATE',
    'smallint': 'Sequelize.INTEGER',
    'tinyint': 'Sequelize.INTEGER',
    'time': 'Sequelize.TIME',
    'mediumint': 'Sequelize.INTEGER'
};

const columnType = type => {
    const RE_TYPE = /([a-z]{3,9})(\(?[0-9]*,?[0-9]*\)?) ?([a-z]*)/;
    const matchObj = RE_TYPE.exec(type);
    const length = matchObj[2] !== '' ? `${matchObj[2].replace(',', ', ')}` : '';
    const symbol = matchObj[3] !== '' ? `.${matchObj[3].toUpperCase()}` : '';
    return `${dataTypes[matchObj[1]]}${length}${symbol}`;
};

module.exports = (fileName, tableName, tableData, sequelizeOpt) => {
    let fileData = `\r\nimport { Application } from 'egg';\r\n\r\n`;
    fileData = `${fileData}export default function ${fileName} (app: Application) {\r\n`;
    fileData = `${fileData}  const { Sequelize } = app.Sequelize;\r\n\r\n`;
    fileData = `${fileData}  return app.model.define('${tableName}', {\r\n`;
    let fieldArray = [];
    let dataPacket = {};
    tableData.forEach(column => {
        fieldArray.push(column.Field);
        dataPacket[`${column.Field}`] = column;
    });
    fieldArray = fieldArray.sort();
    fieldArray.forEach(columnKey => {
        const column = dataPacket[`${columnKey}`];
        fileData = `${fileData}    ${toCamel(columnKey)}: {\r\n`;
        if (column.Key === 'PRI') {
            fileData = `${fileData}      type: Sequelize.INTEGER.UNSIGNED,\r\n`;
            fileData = `${fileData}      primaryKey: true,\r\n`;
            fileData = `${fileData}      autoIncrement: true,\r\n`;
        } else {
            fileData = `${fileData}      type: ${columnType(column.Type)},\r\n`;
        }
        const comment = `\`${column.Comment}\``;
        fileData = `${fileData}      allowNull: ${column.Null !== 'NO'},\r\n`;
        fileData = `${fileData}      field: '${columnKey}',\r\n`;
        fileData = `${fileData}      comment: ${comment},\r\n`;
        // fileData = `${fileData}      get: () => {return this.getDataValue('${column.Field}')},\r\n`;
        // fileData = `${fileData}      set: (val) => {this.setDataValue('${column.Field}', val)}\r\n`;
        fileData = `${fileData}    },\r\n`;
    });
    fileData = fileData.substring(0, fileData.length - 1);
    fileData = `${fileData}  }`;
    const keys = Object.keys(sequelizeOpt);
    let opt = ``;
    if (keys.length) {
        opt = `${opt}, {\r\n`;
        keys.forEach(everyKey => {
            opt = `${opt}    ${everyKey}: ${sequelizeOpt[everyKey]},\r\n`;
        });
        opt = `${opt}  });\r\n`;
    } else {
        opt = `${opt});\r\n`;
    }
    fileData = `${fileData}${opt}`;
    fileData = `${fileData}};\r\n`;

    return fileData;
};

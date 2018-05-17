
const fs = require('fs');

module.exports = (path) => {
    if (!path) {
        throw new Error('请指定model生成地址！');
    }
    let pathArr = path.split('/');
    pathArr = pathArr.length ? pathArr : path.split('\\');
    console.log('path##############'.replace(10));
    console.log(pathArr)
    console.log(path)
    if (!pathArr.length) {
        throw new Error('请指定model生成地址！');
    }
}

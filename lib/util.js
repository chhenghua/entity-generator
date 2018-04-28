
exports.toCamel = str => {
    if (!str && str.trim() === '') {
        return;
    }
    return str.replace(/_[a-z0-9]/g, s1 => {
        return s1.substring(1).toUpperCase();
    });
};

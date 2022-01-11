function checkString(strinp, minlen, maxlen) {
    if(!strinp) {
        return false;
    }
    if(typeof(strinp) != 'string') {
        return false;
    }
    if(strinp.length < minlen) {
        return false;
    }
    if(strinp.length > maxlen) {
        return false;
    }
    return true;
}

function checkPhone(phoneinp) {
    if(!phoneinp) {
        return false;
    }
    if(typeof(phoneinp) != 'string') {
        return false;
    }
    if(phoneinp.length != 10) {
        return false;
    }
    const phoneRegex =
        /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneinp)) {
        return false;
    }
    return true;
}

function checkEmail(emailinp) {
    if(!emailinp) {
        return false;
    }
    if(typeof(emailinp) != 'string') {
        return false;
    }
    if(emailinp.length < 1) {
        return false;
    }
    if(emailinp.length > 240) {
        return false;
    }
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(emailinp)) {
        return false;
    }
    return true;
}

function checkID(idinp) {
    if(!idinp) {
        return false;
    }
    if(typeof(idinp) != 'number') {
        return false;
    }
    if(idinp < 0) {
        return false;
    }
    return true;
}

module.exports = {
    checkString,
    checkEmail,
    checkID,
    checkPhone
}
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
require('dotenv').config({path: '../../.env'});

const validarUser = async (req) => {
    
    const { login, password } = req.body;
    var status = 0;
    var compareUser = null;

    // VALIDA O [ JWT ]
    var validToken;
    try {
        validToken = jwt.verify(
            req.session.HASH_MAIL_PASS,
            process.env.SECRET_JWT, function (err, decoded) {
                if (err) {
                    status = 401;
                    return {
                        hash_mail_pass: 'false',
                        iat: 0000000000,
                        exp: 0000000000
                    };
                } else {
                    status = 200;
                    return decoded;
                }
            }
        );
    }catch(x){
        return validToken = false;
    }

    try {
        await bcrypt.compare(login + '+' + password, validToken["hash_mail_pass"]).then(function (result) {
            compareUser = result;
        });
    } catch (x) {
        compareUser = 'err'
    }
    
    return [{
        "status_code": status,
        "compareUser": compareUser,
        "validToken": validToken,
        "parmsLogin": login,
        "parmsPassword": password
    }]
}

module.exports = function(){
    
    this.check = async (req) => {
        const data = await validarUser(req);
        return data;
    }

}
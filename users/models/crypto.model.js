const config = require('dotenv').config();
const utils = require('node-forge').util;
const pki = require('node-forge').pki;


exports.decodeData = (data)=>{
    return utils.decode64(data);
};

exports.decryptField = (data)=>{

    const privateKey = pki.privateKeyFromPem(config.parsed.PRIV_KEY);
    const decoded = this.decodeData(data);
    return privateKey.decrypt(decoded);

};
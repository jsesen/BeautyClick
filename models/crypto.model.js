const config = require('dotenv').config();
const utils = require('node-forge').util;
const pki = require('node-forge').pki;
const cipher = require('node-forge').cipher;
const md = require('node-forge').md;


exports.decodeData = (data)=>{
    return utils.decode64(data);
};


exports.decryptSecret = (data)=>{

    const privateKey = pki.privateKeyFromPem(config.parsed.PRIV_KEY);
    const decoded = this.decodeData(data);
    return privateKey.decrypt(decoded);

};


exports.decryptJson = (data,key,vector)=>{

    const dcipher = cipher.createDecipher('AES-CBC',key);
    dcipher.start({iv:vector});
    
    dcipher.update(new utils.ByteStringBuffer(utils.decode64(data)));
    dcipher.finish();
    return JSON.parse(dcipher.output.toString());

};

exports.getVerified = (data,signed)=>{

    const pubKey = pki.publicKeyFromPem(config.parsed.PUB_KEY);
    
    const md256 = md.sha256.create();
    md256.update(data,'utf8');
        
    return pubKey.verify(md256.digest().getBytes(),this.decodeData(signed));

};

exports.processLogin = (data,secret,signed)=>{

    if(this.getVerified(data,signed)){
        console.log('signature verified successfully');
        let s = this.decryptSecret(secret);
        console.log('secret decrypted');
        const values = s.split('.');
        return this.decryptJson(data,values[0],values[1]);

    }
    console.log('verification error');
    return null;
}

exports.processRegister = (data,secret,signed)=>{

    if(this.getVerified(data,signed)){
        console.log('signature verified successfully');
        let s = this.decryptSecret(secret);
        console.log('secret decrypted');
        const values = s.split('.');
        return this.decryptJson(data,values[0],values[1]);

    }
    console.log('verification error');
    return null;
}
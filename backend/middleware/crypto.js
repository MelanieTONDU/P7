const cryptojs = require("crypto-js");
const User = require("../models/userSchema");

module.exports = (req, res, next) => {
    try {
        const firstNameCryptJs = cryptojs.AES.encrypt(req.body.firstName, "CLE_SECRETE" ).toString();
        const lastNameCryptJs = cryptojs.AES.encrypt(req.body.lastName, "CLE_SECRETE" ).toString();
      req.body = {
        firstName : firstNameCryptJs,
        lastName : lastNameCryptJs,
        email : req.body.email,
        password : req.body.password
      };
      next();

    }
     catch {
      res.status(404).json({
        error: new Error('Invalid demande!')
      });
    }
  };

  const firstNameDecryptJs = cryptojs.AES.decrypt(user.firstName, "CLE_SECRETE" ).toString(cryptojs.enc.Utf8);
  const lastNameDecryptJs = cryptojs.AES.decrypt(user.lastName, "CLE_SECRETE" ).toString(cryptojs.enc.Utf8);
  const emailDecryptJs = cryptojs.AES.decrypt(user.email, "CLE_SECRETE" ).toString(cryptojs.enc.Utf8);

const mongoose = require('mongoose');
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const UserSchema = mongoose.Schema({

  email: {
    type: String,
    require: true,
    // unique: true
  },
  enc_password: {
    type: String,
    require: true
  },
  salt: String,
},{timestamps: true});

UserSchema.virtual("password")
  .set(function(password) {
    this._password = password
    this.salt = uuidv4();
    this.enc_password = this.securePassw(password)
  })
  .get(function() {
    return this._password
  })

UserSchema.methods = {
  authenticate: function(plainPassw) {
    return  this.securePassw(plainPassw) === this.enc_password
  },

  securePassw: function(plainPassw) {
    if(!plainPassw) return "";

    try {
      return crypto.createHmac("sha256", this.salt).update(plainPassw).digest('hex')
    } catch (err) {
      return ""
    }
  },
}

const user = mongoose.model("user", UserSchema);
module.exports = user;

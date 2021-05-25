const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "Username is required"] 
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    }
  }, {timestamps: true});


UserSchema.virtual("confirm")
  .get(function(){
      return this._confirm
  })
  .set(function(value){
      this._confirm = value
  })

UserSchema.pre("validate", function(next){
    if(this.password !== this.confirm){
        this.invalidate("confirm", "Passwords must match")
    }
    //save the user to db or show validation errors
    next();
})


UserSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10)
        .then(hash=>{
            this.password = hash
            next()
        })
        .catch(err=>{
            console.log("HASHING PASSWORD DIDNT WORK THO", err)
            next()
        })
})


module.exports = mongoose.model("User", UserSchema);




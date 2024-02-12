const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:1024
    },
    role:{
        type:String,
        enum:["student", "instructor"],
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
});


userSchema.methods.isStudent = function () {
    return this.role == "student";
};

userSchema.methods.isInstructor = function () {
    return this.role == "instructor"
};

userSchema.methods.isAdmin = function () {
    return this.role == "admin"
};

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew){
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash;
        next()
    }else{
        return next
    }
})

userSchema.methods.comparePassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        });
    });
};



module.exports = mongoose.model("User", userSchema);
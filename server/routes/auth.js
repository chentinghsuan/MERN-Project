const router = require("express").Router();
const registerValidation = require("../validation").registerValidation
const loginValidation = require("../validation").loginValidation
const User = require("../models").userModel
const jwt = require("jsonwebtoken");

router.use((req, res, next)=>{
    console.log("A request is coming in to auth.js");
    next()
})

router.get("/TestAPI", (req, res)=>{
    const msgObj = {
        message:"Test API is working"
    };
    return res.json(msgObj)
})

router.post("/register", async (req, res)=>{
    const {error} = registerValidation(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }

    const emailExist = await User.findOne({email:req.body.email});
    if (emailExist) {
        return res.status(400).send("此email已經被使用")
    }

    const newUser = new User({
        email:req.body.email,
        username: req.body.username,
        role: req.body.role,
        password: req.body.password
    })
    try{
        const saveUser = await newUser.save();
        res.status(200).send({
            msg:"已成功註冊",
        saveObject:saveUser})
    }catch(e){
        res.status(400).send("註冊失敗")
        console.log(e);
    }
    console.log(req.body);
})


router.post("/login", async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({ email: req.body.email }); 

        if (!user) {
            return res.status(401).send("使用者不存在");
        }

        const isMatch = await user.comparePassword(req.body.password);

        if (isMatch) {
            const tokenObj = { _id: user._id, email: user.email };
            const token = jwt.sign(tokenObj, process.env.PASSPORT_SECRET);
            res.send({ success: true, token: "JWT " + token, user });
        } else {
            res.status(401).send("密碼錯誤");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("伺服器出錯了");
    }
});


module.exports = router;
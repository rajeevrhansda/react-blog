const router = require("express").Router();
const User = require ("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hasedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hasedPass,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});
//LOGIN
router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        // IF USERNAME WAS INCORRECT
        !user && res.status(400).json("wrong username credentials!");

        // IF USERNAME WAS CORRECT
        const validated = await bcrypt.compare(req.body.password, user.password);
        //IF PASSWORD WAS INCORRECT
        !validated && res.status(400).json("Wrong password!");

        //IF PASSWORD BOTH WERE CORRECT
        const{password, ...others} = user._doc;
        res.status(200).json(others);

    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router
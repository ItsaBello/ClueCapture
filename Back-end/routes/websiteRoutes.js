const express  = require("express")
const router = express.Router();

router.get("getData",(req, res) =>{
    console.log("responding to root route")
    res.send("Hello here is your first Express.js backend")
})
module.exports = router;
//POST
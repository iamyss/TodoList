const router = require("express").Router();
const userService = require("../services/userService");

router.post("/", async (req, res) => {
    try {
        let {
            email, firstName, lastName, password
        } = req.body;
        let user = await userService.createUser(email, firstName, lastName, password);
        res.status(200).json(user);
    } catch (ex) {
        console.log(ex);
        res.status(500).json(ex);
    }
});

router.post("/login", async (req, res) => {
    try {
        let {
            email, password
        } = req.body;
        let user = await userService.login(email, password);
        res.status(200).json(user);
    } catch (ex) {
        console.log(ex);
        res.status(500).json(ex);
    }
});

module.exports = router;
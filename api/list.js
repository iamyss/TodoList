const router = require("express").Router();
const listService = require("../services/todoListService");

router.get("/", async (req, res) => {
    try {
        let list = await listService.getUserLists(req.user._id)
        res.status(200).json({ list: list });
    } catch (ex) {
        console.log(ex);
        res.status(500).json(ex);
    }
});

router.post("/", async (req, res) => {
    try {
        let list = await listService.createTodoList(req.user._id, req.body.title || "Untitled list")
        res.status(200).json(list);
    } catch (ex) {
        console.log(ex);
        res.status(500).json(ex);
    }
});

router.post("/update", async (req, res) => {
    try {
        let list = await listService.updateList(req.body.list)
        res.status(200).json(list);
    } catch (ex) {
        console.log(ex);
        res.status(500).json(ex);
    }
});

router.post("/delete", async (req, res) => {
    try {
        let list = await listService.deleteList(req.body.list)
        res.status(200).json(list);
    } catch (ex) {
        console.log(ex);
        res.status(500).json(ex);
    }
});


module.exports = router;
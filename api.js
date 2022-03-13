const express = require("express");
var data = require("./data.json");
const router = express.Router();
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "",
        data: "This is data"
    });
    res.end();
})

router.get("/todos", (req, res) => {
    let now = new Date();
    let filter = data.filter(x => {
        let datetime = new Date(`${x.start_date} 00:00:00`);
        return now.getFullYear() == datetime.getFullYear() && now.getMonth() == datetime.getMonth() && now.getDate() == datetime.getDate()
    })
    res.json(filter);
    res.end();
})

router.post("/todos", (req, res) => {
    let work = req.body;
    work.id = data.length + 1;
    data.push(work);
    res.json(data);
    res.end();
})

router.post("/todos/:workID", (req, res) => {
    let workID = req.params.workID;
    let work = data.find(x => x.id == workID);
    let length = work.end_time - work.start_time;
    work.start_time = req.body.startTime;
    work.end_time = work.start_time + length;
    res.json({
        success: true
    });
    res.end();
})

module.exports = {
    router
}
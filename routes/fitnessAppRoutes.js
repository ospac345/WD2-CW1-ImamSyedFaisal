const express = require('express');
const router = express.Router();
const controller = require("../Controllers/fitnessAppController")
module.exports= router;

router.get("/", controller.landing_page);

router.get("/about", controller.about_page);

router.get("/home", controller.homePage);

router.get('/users/:rFName', controller.show_user_entries);

router.get('/users/:rFName/addgoal', controller.add_goal);

router.post('/users/:rFName/addgoal', controller.addActivity);

router.post("/login", controller.authLogin);

router.post("/register", controller.addUserToDb);

router.get("/remove", controller.removeActivity);





router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})

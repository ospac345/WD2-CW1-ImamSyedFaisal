const { response } = require('express');
const fitnessAppDAO = require('../models/fitnessAppModel');
const db = new fitnessAppDAO('../users.db');

exports.landing_page = function(req, res) {
   res.render('loginPage');
};

exports.homePage = function(req, res) {
    res.render('homePage');
 };
 

exports.about_page = function(req, res) {
    res.redirect('./about.html');
};

exports.addUserToDb = function(req, res){
    console.log('processing addUserToDb from controller');
    if(!req.body.rPassword || !req.body.rLName || !req.body.rFName || !req.body.rEmail) {
        response.status(400).send("entries must have password.");
        return;
    }
    db.addUser(req.body.rLName, req.body.rFName, req.body.rEmail, req.body.rPassword);
    res.redirect('/home');
};


exports.authLogin = function(req, res) {
    console.log('finding login details in db for ', req.body.inputEmail);

    let email = req.body.inputEmail;
    let password = req.body.inputPassword;
    db.verifyLogin(email, password).then((entries) => {

        if((entries[0].rPassword==req.body.inputPassword) && (entries[0].rEmail == req.body.inputEmail)){
        res.render('homePage', {
            'heading' : entries
            });
        } else{

        console.log('Noooooot found'); }
        
    }).catch((err) => {
        console.log('error handling authLogin in controller', err)
    });
}
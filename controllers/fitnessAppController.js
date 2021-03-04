const { response } = require('express');

exports.landing_page = function(req, res) {
   res.render('loginPage');
};

exports.about_page = function(req, res) {
    res.redirect('./about.html');
};
exports.landing_page = function(req, res) {
    res.send('<h1>Not yet implemented: show a list of guest book entries.</h1>');
};

exports.about_page = function(req, res) {
    res.redirect('./about.html');
};
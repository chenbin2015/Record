var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/test1', function(req, res, next) {
    //res.setHeader('Etag',new Date())
    res.setHeader('Cache-Control', 'public, max-age=31557600');
    res.render('index', { title: 'Express' });
});

module.exports = router;
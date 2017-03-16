const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res) {
  let obj = {title: 'Главная страница'};
  const Model = mongoose.model('pic');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
    res.render('pages/index', obj);
  });

});

router.get('/blog', function(req, res) {
  let obj = {title: 'Blog'};
  const Model = mongoose.model('blog');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
    res.render('pages/blog', obj);
  });
  
});

router.get('/works', function(req, res) {
    let obj = {title: "Мои работы"};
    res.render('pages/works', obj);
});



router.get('/about', function(req, res) {
    let obj = {title: "Обо мне"};
    res.render('pages/about', obj);
});



module.exports = router;
var ControllerPrototype = require('../controller.prototype');
var Supplement = require('../../models/Supplement');
var Event = require('../../models/Event');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path:'/api/supplements'
  });

  var router = controller.router;
  router.post('/', function(req,res){
    Supplement.create({
      name: req.body.supplement,
      amount: req.body.amount,
      user_id: req.user.id
    })
    .then(function() {
      return Event.create({
        user_id: req.user.id,
        content: req.user.attributes.name + ' has added a new supplement ' + req.body.supplement
      });
    })
    .then(function() {
      res.json('Successfully created supplement');
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  });

  router.put('/', function(req,res){
     Supplement.findOne({
      id: req.body.id
    }, {
      require:true
    })
    .then(function(data){
      return Supplement.update({
        name: req.body.supplement,
        amount: req.body.amount
      }, {
        id: data.id
      });
    })
    .then(function() {
      return Event.create({
        user_id: req.user.id,
        content: req.user.attributes.name + ' has updated supplement ' + req.body.supplement
      });
    })
    .then(function() {
      res.json('Successfully updated supplement');
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  });

  router.delete('/',function(req,res){
    Supplement.findOne({
      id: req.body.id
    }, {
      require: true
    })
    .then(function(found){
      return Supplement.destroy({id:found.id});
    })
    .then(function(supplement) {
      return Event.create({
        user_id: req.user.id,
        content: req.user.attributes.name + ' has deleted supplement ' + supplement.name
      });
    })
    .then(function(){
      res.json('Successfully deleted supplement');
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  });

  router.get('/', function(req,res){
    Supplement.fetchAll({
      user_id: req.user.id
    }, {
      columns: ['name', 'amount','id']
    })
    .then(function(supplement){
      res.json(supplement.models);
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  });

  return controller;
})();

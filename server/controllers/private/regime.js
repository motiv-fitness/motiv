var _ = require('lodash');

var ControllerPrototype = require('../controller.prototype');
var Regime = require('../../models/Regime');
var Event = require('../../models/Event');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path:'/api/regimes'
  });
  var router = controller.router;

  router.post('/exercise', function(req,res){
    Regime.create({
      type: 'exercise',
      label: req.body.label,
      name: req.body.name,
      user_id: req.user.id
    })
    .then(function() {
      return Event.create({
        user_id: req.user.id,
        content: req.user.attributes.name + ' has created a new exercise regime ' + req.body.label
      });
    })
    .then(function() {
      res.json('Successfully added exercise regime');
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  });

  router.put('/exercise', function(req,res){
    Regime.findOne({
      id: req.body.id
    }, {
      require: true
    })
    .then(function(data) {
      return Regime.update({
        type: 'exercise',
        label: req.body.label,
        name: req.body.name
      }, {
        id: data.id
      });
    })
    .then(function() {
      return Event.create({
        user_id: req.user.id,
        content: req.user.attributes.name + ' has updated exercise regime ' + req.body.label
      });
    })
    .then(function() {
      res.json('Successfully updated exercise regime.');
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  });

  router.delete('/exercise',function(req,res){
    Regime.findOne({
      id: req.body.id
    }, {
      require: true
    })
    .then(function(found){
      return Regime.destroy({
        id: found.id
      }).then(function() {
        return found;
      });
    })
    .then(function(regime) {
      return Event.create({
        user_id: req.user.id,
        content: req.user.attributes.name + ' has deleted exercise regime ' + regime.attributes.label
      });
    })
    .then(function() {
      res.json('Successfully deleted exercise');
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  });

  router.get('/exercise', function(req,res){
    Regime.findAll({
      type: 'exercise',
      user_id: req.user.id
    }, {
      columns: ['name', 'label', 'type','id']
    })
    .then(function(exercise){
      res.json(exercise.models);
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  });

  router.delete('/diet',function(req,res){
    Regime.findOne({
      id: req.body.id
    }, {
      require: true
    })
    .then(function(found){
      return Regime.destroy({
        id: found.id
      }).then(function() {
        return found;
      });
    })
    .then(function(regime) {
      return Event.create({
        user_id: req.user.id,
        content: req.user.attributes.name + ' has deleted diet regime ' + regime.attributes.label
      });
    })
    .then(function(){
      res.json('Successfully deleted diet regime');
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  });

  router.post('/diet', function(req,res){
    Regime.create({
      type: 'diet',
      label: req.body.name,
      name: req.body.label,
      user_id: req.user.id
    })
    .then(function() {
      return Event.create({
        user_id: req.user.id,
        content: req.user.attributes.name + ' has created a new diet regime ' + req.body.label
      });
    })
    .then(function() {
      res.json('Successfully created diet regime');
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  });

  router.put('/diet', function(req,res){
    Regime.findOne({
      id: req.body.id
    }, {
      require: true
    })
    .then(function(data){
      return Regime.update({
        type: 'diet',
        label: req.body.label,
        name: req.body.name
      }, {
        id: data.id
      });
    })
    .then(function() {
      return Event.create({
        user_id: req.user.id,
        content: req.user.attributes.name + ' has updated diet regime ' + req.body.label
      });
    })
    .then(function() {
      res.json('Successfully updated diet regime');
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  });

  router.get('/diet', function(req,res){
    Regime.findAll({
      type: 'diet',
      user_id: req.user.id
    }, {
      columns: ['name', 'label', 'type','id']
    })
    .then(function(diet){
      res.json(diet.models);
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
  });

  return controller;
})();

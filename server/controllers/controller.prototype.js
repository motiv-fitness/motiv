var express = require('express');
module.exports = (function() {
  return {
    create: function(attributes) {
      return {
        path: attributes && attributes.path || '',
        router: express.Router()
      };
    } 
  }; 
})();
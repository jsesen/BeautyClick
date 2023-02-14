'use strict'

const newslistController = require('../controllers/newslist.controller');


exports.newslistRoutes = function(app){
    
    app.get('/api/newslist/:email', newslistController.isEmailSubscribed);    
    
    app.post('/api/newslist', newslistController.addEmail);

    app.delete('/api/newslist', newslistController.deleteEmail);

}
'use strict'

const { response } = require('express');
const newslistModel = require('../models/newslist.model');

exports.isEmailSubscribed = (request, response) => {

    console.log('received isEmailSubscribed request');
    const email = request.params.email;
    console.log('el email es: ', email);

    newslistModel.isEmailSubscribed(email).then((result, error) => {
        console.log('isEmailSubscribed result: ', result);
        if (error) {
            throw error.message;
        }

        if (result) {
            return response.status(200).send(result);
        } else {
            return response.status(204).send(null);
        }

    }).catch(error => {
        return response.status(500).send();
    });

}

exports.addEmail = (request, response) => {

    console.log('received addEmail request');
    const email = request.body.email;
    console.log('el email es: ', email);

    newslistModel.addEmail(email).then(result => {
        console.log('addEmail result: ', result);       

        if (result) {
            return response.status(200).send(result);
        } else {
            return response.status(204).send(null);
        }

    }).catch(error => {
        throw error.message
    });

}



exports.deleteEmail = (request, response) => {

    console.log('received deleteEmail request');
    const email = request.body.email;
    console.log('el email es: ', email);

    newslistModel.deleteEmail(email).then(result => {
        console.log('deleteEmail result: ', result);       

        if (result) {
            return response.status(200).send(result);
        } else {
            return response.status(204).send(null);
        }

    }).catch(error => {
        throw error.message
    });

}
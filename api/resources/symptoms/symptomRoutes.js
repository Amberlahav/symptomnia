'use strict';

const express = require('express');
const router = express.Router();

const symptomService = require('./symptomService');

// GET /symptoms/
router.route('/')
  .get(async (req, res, next) => {
    try {
      // 1. Fetch all symptoms from database
      const symptoms = await symptomService.listSymptoms();
      // 2. Respond with list of symptoms
      res.status(200).send({
        results: symptoms
      })
    } catch (e) {
      // 3. If error, send to the error handler
      // If you're using express' default error handler, you can just pass the error to next without responding, and it will respond for you. You could also add your own custom error handling middleware: https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
      res.status(500).json({"error": "internal server error"});
      next(e)
    }
  })

// POST /symptoms/
router.route('/')
  .post(async (req, res, next) => {
    // 1. Get data from request body
    const { name, description } = req.body;

    // '' is falsey, so `!name` will also catch the name === '' case
    if(!name || name === '') {
      res.status(400).json({'error': 'Symptom name must be provided.'});
      return;
    }

    try {
      // 2. Create symptom from data
      const symptom = await symptomService.createSymptom({ name, description });
      // 3. Respond with created symptom
      res.status(201).send(symptom)
    } catch (e) {
      // 4. If error, send to the error handler
      console.log(e);
      res.status(500).json({"error": "internal server error"});
      next(e);
    }
  })

// GET /symptoms/:symptomId
router.route('/:symptomId')
  .get(async (req, res) => {
    const { params } = req
    const { symptomId } = params

    try {
      const symptom = await symptomService.getSymptomById(symptomId)
      if(symptom) {
          res.json(symptom)
      } else {
          res.status(404).send()
      }
      
    } catch(e) {
        console.log(e)
        res.status(500).json({"error": "internal server error"});
    }
      
})

// DELETE /symptom/:symptomId

router.route('/:symptomId')
  .delete(async (req, res) => {
    const { params } = req;
    const { symptomId } = params;
    try {
      await symptomService.deleteSymptom(symptomId)
      res.status(204).send()
    } catch(err) {
      throw err
    }
  })

router.route('/:symptomId')
  .put(async (req, res) => {
    const { symptomId } = req.params
    const { body } = req
    try {
      const symptom = await symptomService.updateSymptom(symptomId, body)
      res.status(200).json(symptom)
    } catch (e) {
      console.log(e)
    }
  })
exports.router = router

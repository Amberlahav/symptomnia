'use strict'

const express = require('express')
const router = express.Router()

const symptomService = require('./symptomService')

// GET /symptoms/
router.route('/')
  .get(async (req, res, next) => {
    try {
      // 1. Fetch all symptoms from database
      const symptoms = await symptomService.listSymptoms()
      // 2. Respond with list of symptoms
      res.status(200).send({
        results: symptoms
      })
    } catch (e) {
      // 3. If error, send to the error handler
      next(e)
    }
  })

// POST /symptoms/
router.route('/')
  .post(async (req, res, next) => {
    // 1. Get data from request body
    const { body } = req;
    try {
      // 2. Create symptom from data
      const symptom = await symptomService.createSymptom(body)
      // 3. Respond with created symptom
      res.status(201).send({
        results: [symptom]
      })
    } catch (e) {
      // 4. If error, send to the error handler
      next(e)
    }
  })

// GET /symptoms/:symptomId
router.route('/:symptomId')
  .get(async (req, res) => {
    const { params } = req
    const { symptomId } = params
      const symptom = await symptomService.getSymptom(symptomId)
      if(symptom) {
          res.json(symptom)
      } else {
          res.status(404).send()
      }
})

// GET /symptoms/:symptomId/entries
router.route('/:symptomId/entries')
  .get(
    async (req, res, next) => {
      try {
        const { symptomId } = req.params;
        const symptoms = await symptomService.listSymptoms({
          filter: { _id: symptomId },
          include: ['entries'],
        });

        res.json({ results: symptoms });
      } catch (e) {
        next(e);
      }
    }
  );
  

exports.router = router

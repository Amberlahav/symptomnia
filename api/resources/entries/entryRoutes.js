'use strict'

const express = require('express')
const router = express.Router()

const entryService = require('./entryService')

// GET /entries/
router.route('/')
  .get(async (req, res, next) => {
    try {
      const entries = await entryService.listEntries()
      res.status(200).send({
        results: entries
      })
    } catch (e) {
      next(e)
    }
  })

// POST /entries/
router.route('/')
  .post(async (req, res, next) => {
    const { body } = req;
    try {
      const entry = await entryService.createEntry(body)
      res.status(201).send({
        results: [entry]
      })
    } catch (e) {
      next(e)
    }
  })

// GET /entries/:entryId
router.route('/:entryId')
  .get(async (req, res) => {
    const { params } = req
    const { entryId } = params
      const entry = await entryService.getEntry(entryId)
      if(entry) {
          res.json(entry)
      } else {
          res.status(404).send()
      }
  })


exports.router = router

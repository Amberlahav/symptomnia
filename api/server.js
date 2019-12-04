'use strict'

const mongoose = require('mongoose')
const express = require('express')
const path = require('path');

// 1. Create main express intance
const app = express()

// 2. Require routes
const { router: symptomRoutes } = require('./resources/symptoms/symptomRoutes')
const { router: entryRoutes } = require('./resources/entries/entryRoutes')

// 3. Require constants
const { URL, PORT } = require('./utils/constants')

const publicPath = path.resolve(__dirname, '..', 'build');
app.use('/', express.static(publicPath));

// 4. Ensure that the router is parsing the request body to appropriately format incoming requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 5. Utilise routes
app.use('/api/symptoms', symptomRoutes)
app.use('/api/entries', entryRoutes)

// middelware to redirect to index.html if no paths match 
app.use('/*', (req, res, next) => {
  res.sendFile(path.join(publicPath, 'index.html'));
})

// 6. Define configuration for mongodb
const MONGO_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// 7. Start server
mongoose
  .connect(URL, MONGO_CONFIG)
  .then(async () => {
    console.log(`Connected to database at ${URL}`)
    await require('./utils/seed').truncate();
    await require('./utils/seed').seed();
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })


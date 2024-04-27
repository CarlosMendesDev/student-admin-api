import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import { AppDataSource } from './database/dataSource'

AppDataSource.initialize()
  .then(async () => {
    const app = express()
    app.use(express.json())

    app.listen(3000)

    console.log('running on port 3000')
  })
  .catch((error) => console.log(error))

import 'dotenv/config'
import express from 'express'
import { AppDataSource } from './database/dataSource'
import routes from './routes'
import cors from 'cors'

AppDataSource.initialize()
  .then(async () => {
    const app = express()
    app.use(cors())

    app.use(express.json())

    app.use(routes)

    app.listen(3001)

    console.log('running on port 3001')
  })
  .catch((error) => console.log(error))

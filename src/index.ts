import 'dotenv/config'
import express from 'express'
import { AppDataSource } from './database/dataSource'
import routes from './routes'

AppDataSource.initialize()
  .then(async () => {
    const app = express()
    app.use(express.json())

    app.use(routes)

    app.listen(3000)

    console.log('running on port 3000')
  })
  .catch((error) => console.log(error))

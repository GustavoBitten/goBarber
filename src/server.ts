import 'reflect-metadata'
import express, { json } from 'express'
import routes from './routes'

import './database'
import uploadConfig from './config/upload'

const app = express()


app.use(json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)


app.listen(3333,()=>console.log('Server online on port 3333'))
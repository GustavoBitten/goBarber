import express, { request, response } from 'express'

const app = express()

app.get('/', (request, response) =>{

    return response.send('online')
 } )


 app.listen(3333,()=>console.log('Server online on port 3333'))
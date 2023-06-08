// const redis          = require('redis')
// const {promisify }   = require('util')

// const client = redis.createClient({
//   port: 6379,
//   host: '127.0.0.1',
// })

// client.connect()
// const GET_ASYNC = promisify(client.get).bind(client)
// const SET_ASYNC = promisify(client.set).bind(client)

// client.on('connect', () => {
//   console.log('Client connected to redis...')
// })

// client.on('ready', () => {
//   console.log('Client connected to redis and ready to use...')
// })

// client.on('error', (err) => {
//   console.log(err.message)
// })

// client.on('end', () => {
//   console.log('Client disconnected from redis')
// })

// process.on('SIGINT', () => {
//   client.quit()
// })


// module.exports = {client , GET_ASYNC,SET_ASYNC}
const session = require('express-session')
const connectRedis = require('connect-redis')
const redisSessionsClient = require('../db/redisSessions/redisSessionsClient')

//express-session require un store, 
//para eso usamos la libreria connect-redis 

const RedisStore = connectRedis(session)

module.exports = session({
    name: 'sessionCookieVoto',
    store: new RedisStore({ client: redisSessionsClient }),
    secret: '78b31c2f705d051930bc67198c290c9b1eb92f1379d2a932bcaa85c258d64d77',
    saveUninitialized: false, //no guardar si no está inicializada la sesion
    resave: false, //no guardar si no hay cambios
    cookie: { //COOKIE-FLAGS
        secure: false,//solo responder por https si va en true, HAY QUE HABILITARLO LUEGO
        httpOnly: true, //prevenir XSS, que javascript no lea las cookies
        maxAge: 1000 * 60 //tiempo de las sesiones 1 min
    }
})


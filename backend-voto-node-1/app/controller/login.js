const bcrypt = require("bcryptjs")
const redisAuthClient = require('../db/redisAuth/redisAuthUserClient')


function login(req, res) {
    const { body: { ci, password } } = req;


    redisAuthClient.GET(ci, (err, response) => {
        if (err) console.log(err.message)
        if (response) {
            bcrypt.compare(password, response, function (err, result) {

                if (result) {
                    req.session.ci = ci
                    return res.send("Logueado con exito")
                } else {
                    return res.status(401).send('user o contraseña incorrecta')
                }
            });
        }

        else {
            return res.status(401).send('user o contraseña incorrecta')
        }

    })


}





module.exports = login
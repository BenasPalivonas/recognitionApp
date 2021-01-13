signIn = (req, res, knex, bcrypt) => {
    knex.select("*").from("login").where({
        email: req.body.email
    }).then(user => {
        if (bcrypt.compareSync(req.body.password, user[0].hash) === true) {
            knex.select("*").from("users").where({
                email: user[0].email
            })
                .then(user => {
                    res.json(user[0]);
                }).catch(err => res.status(400).json(false));
        }
    }).catch(err => res.status(400).json(false));
}
module.exports = {
    signInHandler: signIn
}
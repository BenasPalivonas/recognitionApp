register = (req, res, knex, bcrypt) => {
    const { email, name, password, id } = req.body;
    console.log(req.body);
    if (password.length === 0 || email.length === 0 || name.length === 0) {
        res.status(400).json("Fill in the required fields");
    }
    const hash = bcrypt.hashSync(password);
    knex.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        }).into('login')
            .returning("email")
            .then(loginEmail => {
                knex('users').returning('*').insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date(),
                }).then(user => res.json(user[0]))
                    .catch(err => res.status(400).json("User already exsists"));
            })
            .then(trx.commit)
            .catch(trx.rollback)
    }).catch(err => res.status(400).json(false));
}
module.exports = {
    handleRegister: register
}
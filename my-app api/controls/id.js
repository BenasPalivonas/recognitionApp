id = (req, res, knex) => {
    const { id } = req.params;
    let found = false
    knex.select("*").from("users").where({
        id: id
    }).then(data => {
        console.log(data.length);
        if (data.length != 0) {
            res.json(data[0]);

        }
        else {
            res.json("user not found");
        }

    }).catch(err => res.json("error", err))
}
module.exports = {
    idHandler: id
}
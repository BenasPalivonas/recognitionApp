get = (req, res, knex) => {
    res.json("its working")
}


module.exports = {
    getHandler: get
}
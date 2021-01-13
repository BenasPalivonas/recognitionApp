const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: 'ec0736061a9c46d4977e2e712b6b2a4d'
});
const api = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.url
    ).then((response) => res.json(response))
        .catch((err) => console.log(err))
}
const image = (req, res, knex) => {
    const { id } = req.body;
    knex("users").where("id", "=", id).increment(
        'entries', 1).returning('entries').then(data => {
            res.json(data);
        }).catch(err => console.log("error", err));
}
module.exports = {
    imageHandler: image,
    apiHandler: api
}
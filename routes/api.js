let convertHandler = require('../controllers/convertHandler')

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render('index', {
            title: 'Imperial Converter',
            showResult: false
        })
    })

    app.get('/api/convert', (req, res) => {
        convertHandler(req, res)
    })
}
const router = require('express').Router();

//import all the API routes from /api/index.js
const apiRoutes = require('./api');

//add prefix of '/api' to all of the API routes imported from the 'api' directory
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1> ☠ Womp Womp, 404 ERROR, what went wrong? Go double check the code!</h1>')
});

module.exports = router;
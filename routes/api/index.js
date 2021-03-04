const router = require('express').Router();

const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//add prefixes '/users' and 'thoughts' to routes created in  'user-routes.js' and 'thought-routes.js'
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
const router = require('express').Router();

const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThoughtById,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thought-controller');

//set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

//set up GET one, PUT and DELETE by _id at /api/thoughts/:id    
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThought)


// /api/thoughts/:thoughtId/reactions    
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;




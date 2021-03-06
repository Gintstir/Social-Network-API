const { User, Thought } = require('../models');

const thoughtController = {

    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate(
            {
                path: 'users',
                select: '-__v'
            }
        )
        select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }

    //create thought

    //get thought by Id

    //UPDATE thought by Id

    //DELETE thought by Id

    //Add a reaction to a thought

    //delete a reaction




}


module.exports = thoughtController;
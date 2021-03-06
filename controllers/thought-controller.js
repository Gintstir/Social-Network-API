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
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //create thought
    createThought( { body }, res) {
        Thought.create( body )
        .then(({ _id }) => {
            return User.findByIdAndUpdate(
                { _id: params.userId },
                { $push: {thoughts: _id }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'Sorry Dave...🤖 No User found with this username!'});
                return;
            }
            res.json(dbUserData, { message: 'Thought successfully created!' } )
        })
        .catch(err => res.status(400).json(err))
    },
    //get thought by Id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate(
            {
                path: 'reactions',
                select: '-__v'
            }
        )
        .populate(
            {
                path: 'user',
                select: '-__v'
            }
        )
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought 🤯 found with this ID!'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    //UPDATE thought by Id
    updateThoughtById({ params, body }, res) {
        Thought.findByIdAndUpdate({ _id: params.thoughtId}, body, { new: true, runValidators: true })
        .the(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thought 🤯 found with this Id!'})
                return;              
            }
            res.json(dbThoughtData, { message: 'Update successful!'} )
        })
        .catch(err => res.json(err))
    },


    //DELETE thought by Id
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.id })
        .then(deleteThought => {
            if(!deleteThought) {
                return res.status(404).json({ message: 'No thought 🤯 found with this ID!'})               
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId }},
                { new: true }
            )            
        })
        .then(dbUserData=> {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User 👨🏼‍🎤 found with this ID!'})
                return;
            }
            res.json(dbUserData, { message: 'Thought successfully deleted!' } );
        })
        .catch(err => res.json(err));
    },


    //Add a reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { reactions: body }},
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought 🤯 found with this ID!'})
                return;
            }
            res.json(dbThoughtData, { message: 'Reaction successfully added!' } )
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },


    //delete a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought 🤯 found with this ID!'})
                return;
            }
            res.json(dbThoughtData, {message: 'Reaction successfully deleted!' } )
        })
    }



}


module.exports = thoughtController;
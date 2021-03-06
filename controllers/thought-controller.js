const { User, Thought } = require('../models');

const thoughtController = {

    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate(
            {
                path: 'user',
                select: '-__v'
            }
        )
        .select('-__v')
        .sort({ _id: 1 })
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
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: {thoughts: _id }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'Sorry Dave...🤖 No User found with this username!'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },
    //get thought by Id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
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
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
        .then(updateThoughtById => {
            if(!updateThoughtById) {
                res.status(404).json({ message: 'No Thought 🤯 found with this Id!'})
                return;              
            }
            res.json(updateThoughtById)
        })
        .catch(err => res.json(err))
    },


    //DELETE thought by Id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(deleteThought => {
            if(!deleteThought) {
                res.status(404).json({ message: 'No thought 🤯 found with this ID!'})
                return
            }
        //     return User.findOneAndUpdate(
        //         { username: params.username },
        //         { $pull: { thoughts: params.id }},
        //         { new: true }
        //     )            
        // })
        // .then(dbUserData=> {
        //     if(!dbUserData) {
        //         res.status(404).json({ message: 'No User 👨🏼‍🎤 found with this ID!'})
        //         return;
        //     }
            res.json(deleteThought);
        })
        .catch(err => res.json(err));
    },


    //Add a reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body }},
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought 🤯 found with this ID!'})
                return;
            }
            res.json(dbThoughtData)
            console.log(`Reaction added: ${reactions.body}`)
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
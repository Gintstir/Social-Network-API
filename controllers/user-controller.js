const { User, Thought } = require('../models');

const userController = {

    //GET all users - /api/users
    getAllUsers(req, res) {
        User.find({})
        // .populate(
        //     {
        //         path: 'thoughts',
        //         select: '-__v'
        //     }
        // )
        .select('-__v')
        // .select('-thoughts')        
        .sort({ _id: 1 })//sort in Asc order by _id
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //CREATE user - /api/users    
    createUser( {body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },


    //GET user by Id- /api/users/:id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate(
            {
                path: 'thoughts',
                select: '-__v'
            }
        )
        .populate(
            {
                path: 'friends',
                select: '-__v'
            },
        )
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user 👨🏼‍🎤 found with this ID '})
                return;
            }
            res.json(dbUserData)
            console.log(`You found User: ${params.id}`)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //UPDATE user by Id - /api/users/:id
    updateUserById({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user 👨🏼‍🎤 found with this id!' })
                return;
            }
            res.json(dbUserData);
            console.log("User Updated!");
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    //DELETE user by Id /api/users/:id
    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user 👨🏼‍🎤 found with this ID!'})
                return;
            }
            res.json(dbUserData)
            console.log('User deleted!')
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //ADD friend- /api/users/:userID/friends/:friendId
    addFriend( {params}, res) {
        
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId }},
            { new: true, runValidators: true}
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user 👨🏼‍🎤 found with this ID!'})
                return;
            }
            res.json(dbUserData);
            console.log('Friend Added successfully!')
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //DELETE friend /api/users/:userID/friends/:friendId
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: {friends: params.friendId }},
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No Friend 🦹🏼‍♀️ found with this ID'})
                return;
            }
            res.json(dbUserData);
            console.log("Friend successfully removed")
        })
        .catch(err => res.json(err));
    }

}

module.exports = userController;
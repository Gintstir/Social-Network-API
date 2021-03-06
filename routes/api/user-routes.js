const router = require('express').Router();

//import all query's from controller folder here
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');


//set up GET all and POST at /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

//set up GET one, PUT and DELETE by _id at /api/users/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUser);

router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;

/*
example data:
{
    "username": "lernantino",
    "email": "lernantino@gmail.com"
}
*/
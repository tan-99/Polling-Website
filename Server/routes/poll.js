const router = require('express').Router()
const handle = require('../handlers')

const auth = require('../middlewares/auth')

// Middleware
router.use('/', auth);

// Routes
router.get('/', handle.showPolls);
router.post('/', handle.createPoll);//show everything

router.route('/user').get(auth, handle.usersPolls)

router
    .route('/:id')
    .get(handle.getPoll)
    .post(auth, handle.vote)
    .delete(auth, handle.deletePoll)

module.exports = router
const router = require('express').Router();
const {
  getWorker,
  getSingleWorker,
  createWorker,
  updateWorker,
  deleteWorker,
  addFriend,
  removeFriend,
} = require('../../controllers/worker-controller');

// /api/workers
router.route('/').get(getWorker).post(createWorker);

// /api/workers/:userId
router.route('/:userId').get(getSingleWorker).put(updateWorker).delete(deleteWorker);

// /api/workers/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
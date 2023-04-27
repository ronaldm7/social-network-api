const router = require('express').Router();
const {
  getReport,
  getSingleReport,
  createReport,
  updateReport,
  deleteReport,
  addTime,
  removeTime,
} = require('../../controllers/dailyReport-controller');

// /api/thoughts
router.route('/').get(getReport).post(createReport);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleReport).put(updateReport).delete(deleteReport);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addTime);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeTime);

module.exports = router;

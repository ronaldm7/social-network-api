const {Workers, dailyreport} = require('../models');

const workerController = {
  // get all Workers
  getWorker(req, res) {
    Workers.find()
      .select('-__v')
      .then((dbworkersData) => {
        res.json(dbworkersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get single Worker by id
  getSingleWorker(req, res) {
    Workers.findOne({ _id: req.params.WorkerId })
      .select('-__v')
      .populate('friends')
      .populate('Reports')
      .then((dbworkersData) => {
        if (!dbworkersData) {
          return res.status(404).json({ message: 'No Worker with this id!' });
        }
        res.json(dbworkersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new Worker
  createWorker(req, res) {
    Workers.create(req.body)
      .then((dbworkersData) => {
        res.json(dbworkersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update a Worker
  updateWorker(req, res) {
    Workers.findOneAndUpdate(
      { _id: req.params.WorkerId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbworkersData) => {
        if (!dbworkersData) {
          return res.status(404).json({ message: 'No Worker with this id!' });
        }
        res.json(dbworkersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete Worker (BONUS: and delete associated Reports)
  deleteWorker(req, res) {
    Workers.findOneAndDelete({ _id: req.params.WorkerId })
      .then((dbworkersData) => {
        if (!dbworkersData) {
          return res.status(404).json({ message: 'No Worker with this id!' });
        }

        // BONUS: get ids of Worker's `Reports` and delete them all
        return dailyreport.deleteMany({ _id: { $in: dbworkersData.Reports } });
      })
      .then(() => {
        res.json({ message: 'Worker and associated Reports deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add friend to friend list
  addFriend(req, res) {
    Workers.findOneAndUpdate({ _id: req.params.WorkerId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then((dbworkersData) => {
        if (!dbworkersData) {
          return res.status(404).json({ message: 'No Worker with this id!' });
        }
        res.json(dbworkersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // remove friend from friend list
  removeFriend(req, res) {
    Workers.findOneAndUpdate({ _id: req.params.WorkerId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbworkersData) => {
        if (!dbworkersData) {
          return res.status(404).json({ message: 'No Worker with this id!' });
        }
        res.json(dbworkersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = workerController;

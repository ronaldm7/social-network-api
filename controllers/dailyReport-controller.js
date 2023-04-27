const { dailyreport, Workers } = require('../models');

const ReportController = {
  // get all Reports
  getReport(req, res) {
    dailyreport.find()
      .sort({ createdAt: -1 })
      .then((dbdailyreportsData) => {
        res.json(dbdailyreportsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get single Report by id
  getSingleReport(req, res) {
    dailyreport.findOne({ _id: req.params.ReportId })
      .then((dbdailyreportsData) => {
        if (!dbdailyreportsData) {
          return res.status(404).json({ message: 'No Report with this id!' });
        }
        res.json(dbdailyreportsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a Report
  createReport(req, res) {
    dailyreport.create(req.body)
      .then((dbdailyreportsData) => {
        return Worker.findOneAndUpdate(
          { _id: req.body.WorkerId },
          { $push: { Reports: dbdailyreportsData._id } },
          { new: true }
        );
      })
      .then((dbWorkerData) => {
        if (!dbWorkerData) {
          return res.status(404).json({ message: 'Report created but no Worker with this id!' });
        }

        res.json({ message: 'Report successfully created!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update Report
  updateReport(req, res) {
    dailyreport.findOneAndUpdate({ _id: req.params.ReportId }, { $set: req.body }, { runValidators: true, new: true })
      .then((dbdailyreportsData) => {
        if (!dbdailyreportsData) {
          return res.status(404).json({ message: 'No Report with this id!' });
        }
        res.json(dbdailyreportsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete Report
  deleteReport(req, res) {
    dailyreport.findOneAndRemove({ _id: req.params.dailyreportId })
      .then((dbdailyreportsData) => {
        if (!dbdailyreportsData) {
          return res.status(404).json({ message: 'No Report with this id!' });
        }

        // remove Report id from Worker's `Reports` field
        return Worker.findOneAndUpdate(
          { Reports: req.params.ReportId },
          { $pull: { Reports: req.params.ReportId } },
          { new: true }
        );
      })
      .then((dbWorkerData) => {
        if (!dbWorkerData) {
          return res.status(404).json({ message: 'Report created but no Worker with this id!' });
        }
        res.json({ message: 'Report successfully deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add a reaction to a Report
  addTime(req, res) {
    dailyreport.findOneAndUpdate(
      { _id: req.params.ReportId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbdailyreportsData) => {
        if (!dbdailyreportsData) {
          return res.status(404).json({ message: 'No Report with this id!' });
        }
        res.json(dbdailyreportsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // remove reaction from a Report
  removeTime(req, res) {
    dailyreport.findOneAndUpdate(
      { _id: req.params.ReportId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbdailyreportsData) => {
        if (!dbdailyreportsData) {
          return res.status(404).json({ message: 'No Report with this id!' });
        }
        res.json(dbdailyreportsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = ReportController;

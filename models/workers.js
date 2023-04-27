const { Schema, model } = require('mongoose');

const WorkerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Report: [
      {
        type: Schema.Types.ObjectId,
        ref: 'report',
      },
    ],
   
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


const Workers = model('workers', WorkerSchema);

module.exports = Workers;

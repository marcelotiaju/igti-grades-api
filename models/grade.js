import mongoose, { Schema } from 'mongoose';

const gradeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    lastModified: {
        type: Date,
        required: true,
        default: Date.now
    }
});

Schema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

const  gradeModel =  mongoose.model('grade', gradeSchema, 'grade');

export { gradeModel };
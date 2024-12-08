const { Schema, model } = require('mongoose');

const staffSchema = new Schema({
    IdUser: { type: String, required: true, ref: 'User' }, 
    StaffRole: { type: Boolean, default: false }, 
});

const Staff = model('Staff', staffSchema);

module.exports = Staff;

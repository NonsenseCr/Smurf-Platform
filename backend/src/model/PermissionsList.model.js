const { Schema, model } = require('mongoose');

const permissionsListSchema = new Schema({
    IdPermissions: { type: Number, required: true },
    ParentPermissions: { type: Number, required: false },
    PermissionsName: { type: String, required: false },
    Description: { type: String, required: false },
    PermissionsStats: { type: Number, required: false },
    Active: { type: Boolean, default: true },
});

const PermissionsList = model('PermissionsList', permissionsListSchema);

module.exports = PermissionsList;

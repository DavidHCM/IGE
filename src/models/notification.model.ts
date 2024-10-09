import { Schema, model, SchemaTypes } from 'mongoose';

const notificationSchema = new Schema({
    notificationId: { type: SchemaTypes.String, required: true },
    userId: { type: SchemaTypes.String, required: true },
    deliveryId: { type: SchemaTypes.String, required: true },
    message: { type: SchemaTypes.String, required: true },
    type: { type: SchemaTypes.String, required: true }, // Ej: info, warning, alert
    status: { type: SchemaTypes.String, required: true }, // Ej: unread, read, archived
    createdAt: { type: SchemaTypes.Date, default: Date.now },
});

const NotificationModel = model('notifications', notificationSchema);

export default NotificationModel;

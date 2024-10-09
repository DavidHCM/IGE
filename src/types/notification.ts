export interface Notification {
    notificationId: string;
    userId: string;
    deliveryId: string;
    message: string;
    type: string;
    status: string;
    createdAt: Date;
}
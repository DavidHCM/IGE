import { Request, Response } from 'express';
import ChatMessage from './../models/chatMessage.model';
import { HTTP_STATUS } from '../types/http-status-codes';
import { ChatMessage as ChatMessageType } from '../types/chatMessage';

class chatMessageController {
    async create(req: Request, res: Response) {
        try {
            const {
                messageId,
                fromUserId,
                toUserId,
                deliveryId,
                content,
                createdAt
            }: ChatMessageType = req.body;

            const existingMessage = await ChatMessage.findOne({ messageId });

            if (existingMessage) {
                throw ('Message already exists: ' + HTTP_STATUS.CONFLICT);
            }

            const newMessage = new ChatMessage({
                messageId,
                fromUserId,
                toUserId,
                deliveryId,
                content,
                createdAt
            });

            const savedMessage = await newMessage.save();
            res.status(HTTP_STATUS.SUCCESS).json(savedMessage);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error creating chat message';

            res.status(status).send({ message, error: err });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const results = await ChatMessage.find({});
            res.send(results);
        } catch (err) {
            res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'No chat messages found' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const messageId = req.params.messageId;
            const existingMessage = await ChatMessage.findOne({ messageId });
            if (!existingMessage) {
                throw ('Chat message does not exist: ' + HTTP_STATUS.NOT_FOUND);
            }
            res.send(existingMessage);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.NOT_FOUND;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error fetching chat message';

            res.status(status).send({ message, error: err });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const messageId = req.params.messageId;
            const updatedData = req.body;

            const existingMessage = await ChatMessage.findOne({ messageId });

            if (!existingMessage) {
                throw ('Chat message does not exist: ' + HTTP_STATUS.CONFLICT);
            }

            const updatedMessage = await ChatMessage.findOneAndUpdate(
                { messageId },
                updatedData,
                { new: true, runValidators: true }
            );

            res.status(HTTP_STATUS.SUCCESS).json(updatedMessage);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error updating chat message';

            res.status(status).send({ message, error: err });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const messageId = req.params.messageId;
            const existingMessage = await ChatMessage.findOne({ messageId });

            if (!existingMessage) {
                throw ('Chat message does not exist: ' + HTTP_STATUS.CONFLICT);
            }

            const deletedMessage = await ChatMessage.deleteOne({ messageId });
            res.status(HTTP_STATUS.SUCCESS).json(deletedMessage);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error deleting chat message';

            res.status(status).send({ message, error: err });
        }
    }
}

export const chatMessageControllers = new chatMessageController();
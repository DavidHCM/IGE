import { Request, Response } from 'express';
import Delivery from './../models/delivery.model';
import {HTTP_STATUS} from '../types/http-status-codes';
import {Delivery as DeliveryType} from '../types/delivery';
import {userControllers} from "./user.controller";


class deliveryController {
    async create(req: Request, res: Response) {
        try {
            const {
                deliveryId,
                assignedTo,
                status,
                route,
                productDetails,
                pickupLocation,
                deliveryLocation,
                scheduledTime,
                deliveredAt,
                createdAt,
                updatedAt,
            }: DeliveryType = req.body;

            const existingDelivery = await Delivery.findOne({ deliveryId });

            if (existingDelivery) {
                throw ('Delivery already exists: ' + HTTP_STATUS.CONFLICT);
            }

            const newDelivery = new Delivery({
                deliveryId,
                assignedTo,
                status,
                route,
                productDetails,
                pickupLocation,
                deliveryLocation,
                scheduledTime,
                deliveredAt,
                createdAt,
                updatedAt,
            });

            const savedDelivery = await newDelivery.save();

            res.status(HTTP_STATUS.SUCCESS).json(savedDelivery);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error creating delivery';

            res.status(status).send({ message, error: err });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const results = await Delivery.find({});
            res.send(results);
        } catch (err) {
            res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'No deliveries found' });
        }
    }

    async getByDate(req: Request, res: Response): Promise<void> {
        try{
            const { startDate, endDate } = req.body;
            //console.log(startDate, endDate);
            if (!startDate || !endDate) {
                throw new Error('Start date and end date are required');
            }

            const start = new Date(startDate as string);
            const end = new Date(endDate as string);

            const results = await Delivery.find({
                scheduledTime: { $gte: start, $lte: end }
            });

            if (!results.length) {
                throw ('Deliveries not found: ' + HTTP_STATUS.NOT_FOUND);
            }

            const mapUsers = results.map(item => item.assignedTo);

            const users = await Promise.all(mapUsers.map(async userId => {
                return userControllers.getId(userId);
            }));

            res.status(HTTP_STATUS.SUCCESS).json({deliveries: results, users: users});
            //res.status(HTTP_STATUS.SUCCESS).json(results);
        }catch(err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.NOT_FOUND;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error searching delivery';

            res.status(status).send({message, error: err});
        }
    }

    async getByDriver(req: Request, res:Response){
        try {
            const assignedTo = req.query.driverId;
            const existingDelivery = await Delivery.find({ assignedTo });
            if (!existingDelivery) {
                throw ('Driver does not have deliveries: ' + HTTP_STATUS.NOT_FOUND);
            }

            const user = await userControllers.getId(assignedTo);

            res.send({delivery: existingDelivery, user: user});
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.NOT_FOUND;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error creating delivery';

            res.status(status).send({ message, error: err });
        }
    }



    async getById(req: Request, res: Response) {
        try {
            const deliveryId = req.params.deliveryId;
            const existingDelivery = await Delivery.findOne({ deliveryId });
            if (!existingDelivery) {
                throw ('Delivery does not exist: ' + HTTP_STATUS.NOT_FOUND);
            }
            res.send(existingDelivery);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.NOT_FOUND;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error creating delivery';

            res.status(status).send({ message, error: err });
        }
    };

    async update(req: Request, res: Response) {
        try{
            const deliveryId = req.params.deliveryId;
            console.log(deliveryId)
            const updatedData = req.body;
            console.log(updatedData)

            const existingDelivery = await Delivery.findOne({ deliveryId });

            if (!existingDelivery) {
                throw ('Delivery does not exist or cant be found: ' + HTTP_STATUS.CONFLICT);
            }

            const updatedDelivery = await Delivery.findOneAndUpdate(
                { deliveryId },
                updatedData,
                { new: true, runValidators: true }
            );

            res.status(HTTP_STATUS.SUCCESS).json(updatedDelivery);

        }catch(err){
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error creating delivery';

            res.status(status).send({ message, error: err });
        }
    };

    async delete(req: Request, res: Response) {
        try{
            const deliveryId = req.params.deliveryId;
            const existingDelivery = await Delivery.findOne({ deliveryId });

            if (!existingDelivery) {
                throw ('Delivery does not exist or cant be found: ' + HTTP_STATUS.CONFLICT);
            }

            const deletedDelivery = await Delivery.deleteOne({ deliveryId });

            res.status(HTTP_STATUS.SUCCESS).json(deletedDelivery);
        }catch(err){
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error creating delivery';

            res.status(status).send({ message, error: err });
        }
    };

}

export const deliveryControllers = new deliveryController();
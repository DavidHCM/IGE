import { Request, Response } from 'express';
import Delivery from './../models/delivery.model';
import {HTTP_STATUS} from '../types/http-status-codes';
import {Delivery as DeliveryType} from '../types/delivery';


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

    async getById(req: Request, res: Response) {
        try {
            const deliveryId = req.params.deliveryId;
            const existingDelivery = await Delivery.findOne({ deliveryId });
            res.send(existingDelivery);
        } catch (err) {
            res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'No deliveries found' });
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
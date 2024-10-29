import { Request, Response } from 'express';
import axios from 'axios';
import RouteSuggestion from './../models/routeSuggestion.model';
import { HTTP_STATUS } from '../types/http-status-codes';
import { RouteSuggestion as RouteType } from "../types/routeSuggestion";

class routeSuggestionController {
    async create(req: Request, res: Response) {
        try {
            const {
                routeSuggestionId,
                deliveryId,
                suggestedRoute,
                estimatedTime,
                createdAt
            }: RouteType = req.body;

            const existingRouteSuggestion = await RouteSuggestion.findOne({ routeSuggestionId });

            if (existingRouteSuggestion) {
                throw ('Route suggestion already exists: ' + HTTP_STATUS.CONFLICT);
            }

            const newRouteSuggestion = new RouteSuggestion({
                routeSuggestionId,
                deliveryId,
                suggestedRoute,
                estimatedTime,
                createdAt
            });

            const savedRouteSuggestion = await newRouteSuggestion.save();
            res.status(HTTP_STATUS.SUCCESS).json(savedRouteSuggestion);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error creating route suggestion';

            res.status(status).send({ message, error: err });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const results = await RouteSuggestion.find({});
            res.send(results);
        } catch (err) {
            res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'No route suggestions found' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const routeSuggestionId = req.params.routeSuggestionId;
            const existingRouteSuggestion = await RouteSuggestion.findOne({ routeSuggestionId });
            if (!existingRouteSuggestion) {
                throw ('Route suggestion does not exist: ' + HTTP_STATUS.NOT_FOUND);
            }
            res.send(existingRouteSuggestion);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.NOT_FOUND;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error fetching route suggestion';

            res.status(status).send({ message, error: err });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const routeSuggestionId = req.params.routeSuggestionId;
            const updatedData = req.body;

            const existingRouteSuggestion = await RouteSuggestion.findOne({ routeSuggestionId });

            if (!existingRouteSuggestion) {
                throw ('Route suggestion does not exist: ' + HTTP_STATUS.CONFLICT);
            }

            const updatedRouteSuggestion = await RouteSuggestion.findOneAndUpdate(
                { routeSuggestionId },
                updatedData,
                { new: true, runValidators: true }
            );

            res.status(HTTP_STATUS.SUCCESS).json(updatedRouteSuggestion);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error updating route suggestion';

            res.status(status).send({ message, error: err });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const routeSuggestionId = req.params.routeSuggestionId;
            const existingRouteSuggestion = await RouteSuggestion.findOne({ routeSuggestionId });

            if (!existingRouteSuggestion) {
                throw ('Route suggestion does not exist: ' + HTTP_STATUS.CONFLICT);
            }

            const deletedRouteSuggestion = await RouteSuggestion.deleteOne({ routeSuggestionId });
            res.status(HTTP_STATUS.SUCCESS).json(deletedRouteSuggestion);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error deleting route suggestion';

            res.status(status).send({ message, error: err });
        }
    }

    async routeFromMap(req: Request, res: Response): Promise<void> {
        try {
            const { start, end } = req.body;
            console.log(start, end);

            if (!start || !end) {
                throw ('Start and end cordinated requeried: ' + HTTP_STATUS.CONFLICT);
            }

            // TODO: Esta url del server cambiaria en produccion
            const osrmUrl = `http://localhost:5000/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson`;
            const response = await axios.get(osrmUrl);

            const routeData = response.data;

            // Enviar la respuesta al cliente en formato GeoJSON
            res.status(200).json(routeData);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error deleting route suggestion';

            res.status(status).send({ message, error: err });
        }
    }

}

export const routeSuggestionControllers = new routeSuggestionController();

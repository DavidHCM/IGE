import { Request, Response } from 'express';
import Incident from './../models/incident.model';
import { HTTP_STATUS } from '../types/http-status-codes';
import { Incident as IncidentType } from '../types/incident';

class incidentController {

    async create(req: Request, res: Response) {
        try {
            const {
                incidentId,
                reportedBy,
                deliveryId,
                type,
                description,
                status,
                createdAt,
                resolvedAt,
                location
            }: IncidentType = req.body;

            const existingIncident = await Incident.findOne({ incidentId });

            if (existingIncident) {
                throw ('Incident already exists: ' + HTTP_STATUS.CONFLICT);
            }

            const newIncident = new Incident({
                incidentId,
                reportedBy,
                deliveryId,
                type,
                description,
                status,
                createdAt,
                resolvedAt,
                location
            });

            const savedIncident = await newIncident.save();
            res.status(HTTP_STATUS.SUCCESS).json(savedIncident);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error creating incident';

            res.status(status).send({ message, error: err });
        }
    }


    async getAll(req: Request, res: Response) {
        try {
            const results = await Incident.find({});
            res.send(results);
        } catch (err) {
            res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'No incidents found' });
        }
    }


    async getById(req: Request, res: Response) {
        try {
            const incidentId = req.params.incidentId;
            console.log(incidentId)
            const existingIncident = await Incident.findOne({ incidentId });
            if (!existingIncident) {
                throw ('Incident does not exist: ' + HTTP_STATUS.NOT_FOUND);
            }
            res.send(existingIncident);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.NOT_FOUND;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error fetching incident';

            res.status(status).send({ message, error: err });
        }
    }


    async update(req: Request, res: Response) {
        try {
            const incidentId = req.params.incidentId;
            const updatedData = req.body;

            const existingIncident = await Incident.findOne({ incidentId });

            if (!existingIncident) {
                throw ('Incident does not exist: ' + HTTP_STATUS.NOT_FOUND);
            }

            const updatedIncident = await Incident.findOneAndUpdate(
                { incidentId },
                updatedData,
                { new: true, runValidators: true }
            );

            res.status(HTTP_STATUS.SUCCESS).json(updatedIncident);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.NOT_FOUND;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error updating incident';

            res.status(status).send({ message, error: err });
        }
    }


    async delete(req: Request, res: Response) {
        try {
            const incidentId = req.params.incidentId;
            const existingIncident = await Incident.findOne({ incidentId });

            if (!existingIncident) {
                throw ('Incident does not exist: ' + HTTP_STATUS.NOT_FOUND);
            }

            const deletedIncident = await Incident.deleteOne({ incidentId });
            res.status(HTTP_STATUS.SUCCESS).json(deletedIncident);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.NOT_FOUND;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error deleting incident';

            res.status(status).send({ message, error: err });
        }
    }
}

export const incidentControllers = new incidentController();

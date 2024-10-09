import { Request, Response } from 'express';
import Incident from './../models/incident.model';
import {HTTP_STATUS} from '../types/http-status-codes';
import {Incident as IncidentType} from '../types/incident';


class incidentController {
    async create(req: Request, res: Response) {
        try{

        }catch(err){

        }
    }

    async getAll(req: Request, res: Response) {
        try{

        }catch(err){

        }
    }

    async getById(req: Request, res: Response) {
        try{

        }catch(err){

        }
    };

    async update(req: Request, res: Response) {
        try{

        }catch(err){

        }
    };

    async delete(req: Request, res: Response) {
        try{

        }catch(err){

        }
    };

}

export const incidentControllers = new incidentController();
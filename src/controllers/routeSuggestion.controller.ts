import { Request, Response } from 'express';
import routeSuggestion from './../models/routeSuggestion.model';
import {HTTP_STATUS} from '../types/http-status-codes';
import {Incident as IncidentType} from '../types/incident';
import {RouteSuggestion as RouteType} from "../types/routeSuggestion";


class routeSuggestionController {
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

export const routeSuggestionControllers = new routeSuggestionController();
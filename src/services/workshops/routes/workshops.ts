import { Request, Response } from 'express';
import { CreateWorkshops, GetAllWorkshops, GetAllWorkshopsForReports, ReplaceWorkshopById } from '../WorkshopController';
import { IWorkshop } from '../models/workshop.model'
import { checkWorkshopParams } from '../../../middleware/check';

export default [
  {
    path: '/api/v1/workshop/current/create',
    method: 'post',
    handler: [
      checkWorkshopParams,
      async (req: Request, res: Response) => {
        const result: IWorkshop = await CreateWorkshops(req.body);
        res.status(200).send(result);
      }
    ]
  },
  {
    path: '/api/v1/workshop/reports',
    method: 'get',
    handler: async (req: Request, res: Response) => {
      const result: Array<IWorkshop> = await GetAllWorkshopsForReports();
      res.status(200).send(result);
    }
  },
  {
    path: '/api/v1/workshop/current',
    method: 'get',
    handler: async (req: Request, res: Response) => {
      const result: Array<IWorkshop> = await GetAllWorkshops();
      res.status(200).send(result);
    }
  },
  {
    path: '/api/v1/workshop/update/:_id',
    method: 'put',
    handler: async (req: Request, res: Response) => {
      const _id = req.params._id;
      const result = await ReplaceWorkshopById(_id, req.body);
      res.status(200).send(result);
    }
  }
];
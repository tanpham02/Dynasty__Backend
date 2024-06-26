/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express';

import { StaffModel } from '@app/models';
import { StaffService } from '@app/services';
import { HttpStatusCode, Params } from '@app/types';

const staffService = new StaffService(StaffModel, 'staff');

const staffController = {
  // SEARCH PAGINATION
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { pageIndex = 0, pageSize = 10, fullName, role, sortBy } = req.query;

    const params: Params = {
      fullName: fullName?.toString(),
      role: role?.toString(),
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize),
      sortBy: sortBy?.toString(),
    };

    try {
      const result = await staffService.getPaginationExcludePassword(params);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error: any) {
      next(error);
    }
  },

  // CREATE USER
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await staffService.createStaff(req);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },

  // CHECK MATCH OLD PASSWORD WHEN CHANGE PASSWORD
  checkMatchOldPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await staffService.checkMatchOldPassword(req);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },

  // UPDATE USER
  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const staff = await staffService.updateStaff(id?.toString()!, req);
      res.status(HttpStatusCode.OK).json(staff);
    } catch (error: any) {
      console.log('🚀 ~ file: staff.ts:49 ~ update: ~ error:', error);
      next();
    }
  },

  // GET USER BY ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await staffService.getByIdOverriding(id);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },

  // GET USER BY ID
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.query;
    try {
      const { message } = await staffService.delete(ids);
      res.status(HttpStatusCode.OK).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default staffController;

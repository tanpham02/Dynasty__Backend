/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FIELDS_NAME } from '@app/constants';
import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import UserModel from '@app/models/users';
import User from '@app/models/users/@type';
import { TypeUpload } from '@app/types';
import { comparingObjectId } from '@app/utils/comparingObjectId';
import handleUploadFile from '@app/utils/handleUploadFile';
import hashPassword from '@app/utils/hashPassword';
import { Request } from 'express';
import { Model } from 'mongoose';
import CRUDService from './crudService';

class UserService extends CRUDService<User> {
  constructor(model: Model<User>, nameService: string) {
    super(model, nameService);
  }

  // CREATE
  async createOverriding(req: Request) {
    const { password, ...user }: User = req?.body?.[FIELDS_NAME.USER]
      ? JSON.parse(req?.body?.[FIELDS_NAME.USER])
      : {};
    const avatars = handleUploadFile(req, TypeUpload.ONE);

    const existUser = await UserModel.findOne({
      $or: [
        { username: user?.username },
        { phoneNumber: user?.phoneNumber },
        { email: user?.email },
      ],
    });

    if (existUser) {
      const exception = new Exception(
        HttpStatusCode.CONFLICT,
        'Username or phoneNumber or email already exist',
      );
      throw exception;
    }

    if (avatars[0]) {
      user.image = avatars[0];
    }

    if (!password) {
      const exception = new Exception(HttpStatusCode.BAD_REQUEST, 'password field is requirement');
      throw exception;
    }
    const passwordAfterHash = await hashPassword(password);
    const newUser = new this.model({
      ...user,
      password: passwordAfterHash,
    });
    await newUser.save();

    const { password: pw, ...remainingUser } = newUser.toObject();
    return remainingUser;
  }

  // UPDATE
  async updateOverriding(id: string, req: Request) {
    const dataUpdate: User = req.body?.[FIELDS_NAME.USER]
      ? JSON.parse(req?.body?.[FIELDS_NAME.USER])
      : {};

    const avatars = handleUploadFile(req, TypeUpload.ONE);

    const isUserAlreadyExist = await UserModel.findById(id);
    const existUser = await UserModel.findOne({
      $or: [
        { username: dataUpdate?.username },
        { phoneNumber: dataUpdate?.phoneNumber },
        { email: dataUpdate?.email },
      ],
    });
    let newDataUpdate: any = {};

    if (!isUserAlreadyExist) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'User not found');
      throw exception;
    }

    if (existUser && !comparingObjectId(existUser._id, isUserAlreadyExist._id)) {
      const exception = new Exception(HttpStatusCode.CONFLICT, 'User information already exist');
      throw exception;
    }

    if (Object.keys(dataUpdate).length > 0) {
      newDataUpdate = {
        ...dataUpdate,
      };
    }

    if (avatars[0]) {
      newDataUpdate.image = avatars[0];
    }

    if (newDataUpdate?.password) {
      const passwordAfterHash = await hashPassword(newDataUpdate?.password);
      newDataUpdate.password = passwordAfterHash;
    }

    await this.model.findByIdAndUpdate(id, newDataUpdate, { new: true });
    return { message: `Update ${this.nameService} success` };
  }

  // GET BY ID
  async getByIdOverriding(id: string) {
    const user = await this.model.findById(id);
    if (!user) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, 'User not found!');
      throw exception;
    }
    const { password, ...remainingUser } = JSON.parse(JSON.stringify(user));
    return remainingUser;
  }
}

export default UserService;

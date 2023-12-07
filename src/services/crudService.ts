/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Filter, Params, SortOrderBy } from '@app/types';
import { AnyObject, Document, Model } from 'mongoose';
import { Request } from 'express';
import { HttpStatusCode } from '@app/exception/type';
import { Exception } from '@app/exception';
import { Category } from '@app/models/category/@type';

class CRUDService<T extends Document> {
  protected model: Model<T>;
  protected nameService: string;
  constructor(model: Model<T>, nameService: string) {
    this.model = model;
    this.nameService = nameService;
  }

  // FIND ALL
  async findAll() {
    const getAll = await this.model.find();
    return getAll;
  }

  // SEARCH PAGINATION
  async getPagination(params: Params) {
    const {
      pageIndex,
      pageSize,
      name,
      productId,
      comboPromotionsId,
      categoryId,
      types,
      cityId,
      districtId,
      wardId,
      fullName,
      from,
      to,
      role,
      sort,
    } = params;

    const filter: Filter = {};
    let sortFieldName: { [key: string]: any } = {};

    if (name) {
      const patternWithName = { $regex: new RegExp(name, 'gi') };
      filter.name = patternWithName;
    }

    if (productId) {
      filter.productIds = productId;
    }

    if (comboPromotionsId) {
      filter.comboPromotionsId = comboPromotionsId;
    }

    if (categoryId) {
      filter.categoryId = categoryId;
    }

    if (types) {
      filter.types = { $all: types?.split(',') };
    }

    if (cityId) {
      filter.cityId = cityId;
    }

    if (districtId) {
      filter.districtId = districtId;
    }

    if (wardId) {
      filter.wardId = wardId;
    }

    if (fullName) {
      const patternWithFullName = { $regex: new RegExp(fullName, 'gi') };
      filter.fullName = patternWithFullName;
    }

    if (role) {
      filter.role = role;
    }

    if (from && to) {
      filter.createdAt = { $gte: from, $lte: to };
    }

    if (sort) {
      const arraySorts = sort.split(', ');
      sortFieldName = arraySorts
        .map((item) => ({
          [item.split(':')?.[0].toString()]: `${item.split(':')?.[1] as any}`,
        }))
        .reduce((acc: any, next: any) => Object.assign(acc, next), {});
    }

    const data = await this.model
      .find(filter)
      .limit(pageSize)
      .skip(pageSize * pageIndex)
      .sort(sortFieldName);

    const totalElement = await this.model.find(filter).count();
    const totalPages = Math.ceil(totalElement / pageSize);
    const isLastPage = pageIndex + 1 >= totalPages;
    const result = {
      data,
      totalElement,
      pageIndex,
      pageSize,
      totalPage: totalPages,
      isLastPage: isLastPage,
    };
    return result;
  }

  // SEARCH PAGINATION (EXCLUDE PASSWORD)
  async getPaginationExcludePw(params: Params) {
    const getDataPagination = await this.getPagination(params);
    const result = {
      ...getDataPagination,
      data:
        getDataPagination.data.length > 0
          ? getDataPagination.data.map((item: T) => {
              const { password, ...remainingUser } = item.toObject();
              return remainingUser;
            })
          : [],
    };
    return result;
  }

  // CREATE
  async create(req: Request) {
    const create = new this.model(req.body);
    return await create.save();
  }

  // GET BY ID
  async getById(id: string) {
    const response = await this.model.findById(id);
    if (!response) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, `${this.nameService} not found!`);
      throw exception;
    }
    return response;
  }

  // UPDATE
  async update(id: string, req: Request, fieldName: string) {
    const dataUpdate = req?.body?.[fieldName] ? JSON.parse(req?.body?.[fieldName]) : {};

    const alreadyExist = await this.getById(id);

    if (!Object.keys(fieldName).length) {
      const exception = new Exception(HttpStatusCode.BAD_REQUEST, "Request body can't be empty");
      throw exception;
    }

    if (!alreadyExist) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, `Not found ${this.nameService}!`);
      throw exception;
    }

    await this.model.findByIdAndUpdate({ _id: id }, dataUpdate, { new: true });

    return { message: `Update ${this.nameService} success` };
  }

  // DELETE
  async delete(ids: string[] | any) {
    if (!ids) {
      const exception = new Exception(HttpStatusCode.BAD_REQUEST, "ids field can't be empty");
      throw exception;
    }

    await this.model.deleteMany({
      _id: {
        $in: ids, // $in operator: sẽ tìm bất kì những thằng nào trong database có _id match với nhứng thằng trong list id truyền vào ($in operator: nhận value[] or value)
      },
    });

    return { message: `Delete ${this.nameService} success` };
  }
}

export default CRUDService;

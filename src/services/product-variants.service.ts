/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request } from 'express';
import { Model } from 'mongoose';

import Exception from '@app/exception';
import ProductModel from '@app/models/products.model';
import { CRUDService } from '@app/services';
import { HttpStatusCode } from '@app/types';
import { ProductVariants } from '@app/types/product-variants.type';
import { generateUnsignedSlug } from '@app/utils';

class ProductVariantService extends CRUDService<ProductVariants> {
  constructor(model: Model<ProductVariants>, serviceName: string) {
    super(model, serviceName);
  }

  // UPDATE
  async updateOverriding(id: string, req: Request, fieldName: string) {
    const dataUpdate = req?.body?.[fieldName] ? JSON.parse(req?.body?.[fieldName]) : {};

    const alreadyExist = await this.getById(id);

    if (!Object.keys(fieldName)?.length) {
      const exception = new Exception(HttpStatusCode.BAD_REQUEST, "Request body can't be empty");
      throw exception;
    }

    if (!alreadyExist) {
      const exception = new Exception(HttpStatusCode.NOT_FOUND, `Not found ${this.serviceName}!`);
      throw exception;
    }

    if (dataUpdate?.productItem?.name) {
      dataUpdate.productItem.slug = generateUnsignedSlug(dataUpdate.productItem.name);
    }

    await this.model.findByIdAndUpdate({ _id: id }, dataUpdate, { new: true });

    return { message: `Update ${this.serviceName} success` };
  }

  // DELETE
  async deleteOverriding(ids: string[]) {
    const { message } = await this.delete(ids);

    await ProductModel.updateMany(
      {
        productsVariant: { $in: ids },
      },
      { $pull: { productsVariant: { $in: ids } } },
    );

    return { message };
  }
}

export default ProductVariantService;

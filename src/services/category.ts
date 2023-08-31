import CRUDService from '@app/services/crudService';
import { Model } from 'mongoose';
import { Category, ChildCategory } from '@app/models/category/@type';
import ProductModel from '@app/models/product';
import { Request } from 'express';

class CategoryService extends CRUDService<Category> {
  constructor(model: Model<Category>, nameService: String) {
    super(model, nameService);
  }

  // CREATE CATEGORY
  async createOverriding(req: Request) {
    try {
      const newCategory = new this.model(req.body);
      const listProductId = newCategory.productsDTO;
      const childrenCategory = newCategory.childCategory;
      if (listProductId?.length) {
        await ProductModel.updateMany(
          {
            _id: { $in: listProductId },
          },
          { $set: { categoryId: newCategory._id } },
        );
      }
      if (childrenCategory) {
        for (let i = 0; i < childrenCategory.length; i++) {
          const element = childrenCategory[i];
          element.parentId = newCategory._id;
        }
      }
      return newCategory.save();
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }

  // CREATE CATEGORY
  async updateOverriding(id: string, req: Request) {
    try {
      const childrenCategory = req.body.childCategory;
      if (childrenCategory) {
        for (let i = 0; i < childrenCategory.length; i++) {
          const element = childrenCategory[i];
          element.parentId = id;
        }
      }

      return await this.model.findByIdAndUpdate(
        id,
        { ...req.body, childrenCategory },
        { new: true },
      );
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when update ${this.nameService} with ${error}`);
    }
  }

  // DELETE CATEGORY
  async deleteOverriding(ids: string[] | string | any) {
    try {
      await this.model.deleteMany({ _id: { $in: ids } });
      await ProductModel.updateMany(
        {
          categoryId: { $in: ids },
        },
        { $set: { categoryId: null } },
      );
      return { message: `Delete ${this.nameService} success` };
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when delete ${this.nameService} with ${error}`);
    }
  }

  // GET CHILDREN CATEGORY BY ID
  async getChildrenCategoryById(childCategoryId: string | any, populateName?: string | string[]) {
    try {
      const childrenCategory = await this.model.findOne({
        childCategory: { $elemMatch: { _id: childCategoryId } },
      });
      const result = childrenCategory?.childCategory?.find(
        (child: { _id: any }) => String(child._id) === childCategoryId,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when find by id ${this.nameService} with ${error}`);
    }
  }

  // GET CATEGORY BY ID
  async getCategoryById(id: string | any) {
    try {
      const category = await this.model.findOne({
        $or: [{ _id: id }, { 'childCategory._id': id }],
      });
      return category;
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when find by id ${this.nameService} with ${error}`);
    }
  }

  // DELETE CHILDREN CATEGORY
  async deleteChildCategoryOverriding(
    parentCategoryId: string | any,
    childCategoryId: string | string[] | any,
  ) {
    try {
      await this.model.updateOne(
        { _id: parentCategoryId },
        { $pull: { childCategory: { _id: { $in: childCategoryId } } } },
      );

      await ProductModel.updateMany(
        {
          categoryId: childCategoryId,
        },
        { $set: { categoryId: null } },
      );
      return { message: `Delete children category success` };
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when delete children category with ${error}`);
    }
  }

  // UPDATE CHILDREN CATEGORY
  async updateChildrenCategory(childCategoryId: string | any, req: Request) {
    try {
      const category = await this.model.findOne({ 'childCategory._id': childCategoryId });
      const childCategory = category?.childCategory?.find(
        (child: { _id: any }) => String(child._id) === childCategoryId,
      );
      await childCategory?.set(req.body).save();
      return category?.save();
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when update children ${this.nameService} with ${error}`);
    }
  }

  // ADD CHILDREN CATEGORY
  async addChildrenCategory(parentCategoryId: string | any, req: Request) {
    try {
      console.log('body', req.body);

      const category = await this.model.findById({ _id: parentCategoryId });

      const data = {
        children: {
          ...req?.body?.children,
        },
        parentId: parentCategoryId,
      };

      await category?.childCategory?.push(data);
      await category?.save();

      const categoryId = category?.childCategory?.[category?.childCategory.length - 1]._id;
      const productListId = req.body.productsDTO;
      if (productListId) {
        await ProductModel.updateMany(
          {
            _id: { $in: productListId },
          },
          {
            $set: {
              categoryId: categoryId,
            },
          },
        );
      }
      return { message: `Add children category success` };
    } catch (error) {
      console.log(error);
      throw new Error(`Occur error when add children category with ${error}`);
    }
  }
}

export default CategoryService;

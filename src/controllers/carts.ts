import { Exception } from '@app/exception';
import { HttpStatusCode } from '@app/exception/type';
import CartModel from '@app/models/carts';
import CartService from '@app/services/carts';
import { Params } from '@app/types';
import { NextFunction, Request, Response } from 'express';

const cartService = new CartService(CartModel, 'cart');

const cartController = {
  // ADD CART
  addCart: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId } = req.params;
    try {
      await cartService.addCartItem(customerId, req);
      res.status(HttpStatusCode.OK).json({ message: 'Add cart successfully' });
    } catch (error) {
      next(error);
    }
  },

  // UPDATE CART
  updateCart: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId } = req.params;
    try {
      await cartService.updateCartITem(customerId, req);
      res.status(HttpStatusCode.OK).json({ message: 'Update cart successfully' });
    } catch (error) {
      next(error);
    }
  },

  // DELETE CART
  deleteCart: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId } = req.params;
    const { productIds } = req.query;
    try {
      await cartService.deleteCartItem(customerId as string, productIds as string[]);
      res.status(HttpStatusCode.OK).json({ message: 'Delete cart successfully' });
    } catch (error) {
      next(error);
    }
  },

  // GET CART BY CUSTOMER_ID
  getCartById: async (req: Request, res: Response, next: NextFunction) => {
    const { customerId } = req.params;
    try {
      const cart = await cartService.getCartByCustomerId(customerId);
      console.log('🚀 ~ file: carts.ts:50 ~ getCartById: ~ cart:', cart);
      res.status(HttpStatusCode.OK).json(cart);
    } catch (error) {
      next(error);
    }
  },
};

export default cartController;
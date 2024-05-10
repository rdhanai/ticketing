import express, { Request, Response } from "express";
import { body } from "express-validator";
import { stripe } from "../stripe";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
} from "@rdhanai.tickets/common";

import { Order, OrderStatus } from "../models/order";
import { Payment } from "../models/payment";
import { natsWrapper } from "../nats-wrapper";

import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [
    body("token").not().isEmpty().withMessage("Token is required"),
    body("orderId").not().isEmpty().withMessage("Order ID is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId, token } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("You can not pay expired or cancelled order");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: order.price * 100,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const payment = await Payment.build({
      orderId: orderId,
      stripeId: paymentIntent.id,
    });

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ paymentId: payment.id });
  }
);

export { router as createChargeRouter };

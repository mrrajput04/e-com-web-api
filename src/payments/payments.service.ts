import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRequestBody } from './types/PaymentRequestBody';

@Injectable()
export class PaymentsService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }
  createPayment(paymentRequestBody: PaymentRequestBody): Promise<any> {
    let sumAmount = 0;
    paymentRequestBody.products.forEach((product) => {
      console.log(product.price, '===>>');
      sumAmount = sumAmount + product.price * product.quantity;
    });
    console.log(sumAmount, '==>>');
    return this.stripe.paymentIntents.create({
      amount: sumAmount,
      currency: paymentRequestBody.currency,
    });
  }
}

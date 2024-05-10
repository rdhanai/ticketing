import { Subjects, Publisher, PaymentCreatedEvent } from '@rdhanai.tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

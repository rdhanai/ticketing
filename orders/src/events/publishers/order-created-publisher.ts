import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@rdhanai.tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@rdhanai.tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

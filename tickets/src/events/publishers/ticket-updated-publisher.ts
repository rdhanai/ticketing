import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@rdhanai.tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

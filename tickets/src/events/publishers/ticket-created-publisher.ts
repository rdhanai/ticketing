import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@rdhanai.tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

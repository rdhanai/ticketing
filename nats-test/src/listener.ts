import nats from "node-nats-streaming";
import { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");
  const options = stan.subscriptionOptions().setManualAckMode(true);
  const ticketSubs = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );
  ticketSubs.on("message", (msg: Message) => {
    // console.log("Message received", msg.getData());
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }
    msg.ack();
  });
});

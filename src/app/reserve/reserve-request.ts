import { Card } from "./card";
import { Ticket } from "./ticket";

export interface ReserveRequest {
    ticket?: Ticket
    card?: Card
}

import { Card } from "./card";
import { ReservedSeats } from "./reserved-seats";
import { Ticket } from "./ticket";

export interface ReserveRequest {
    ticket?: Ticket
    card?: Card
    reservedSeats?: ReservedSeats[]
}

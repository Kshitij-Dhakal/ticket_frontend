import { ReservedSeats } from "../reserve/reserved-seats";
import { Hall } from "./hall";
import { Movie } from "./movie";

export interface Show {
    id: number;
    hall?: Hall;
    movie?: Movie;
    date?: number;
    reservedSeats?: ReservedSeats[];
}

import { Hall } from "./hall";
import { Movie } from "./movie";

export interface Show {
    id: number;
    hall?: Hall;
    movie?: Movie;
    date?: number;
    reserved?: number;
}

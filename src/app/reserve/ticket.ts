import { Movie } from "../shows/movie"

export interface Ticket {
    id?: number
    show?: Movie
    date?: number
}

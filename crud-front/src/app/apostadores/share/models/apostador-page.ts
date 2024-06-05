import { Apostador } from "./apostador";

export interface ApostadorPage {
    apostadores: Apostador[],
    totaElements: number,
    totalPages?: number
}

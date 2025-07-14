import DatabaseFrases from "./DatabaseFrases"

type HistoricalResponse = {
    page: number,
    rowsCount: number | null,
    data: DatabaseFrases[]
}

export default HistoricalResponse
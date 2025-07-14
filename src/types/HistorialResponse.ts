import FrasesDatabase from "./database/FrasesDatabase"

type HistoricalResponse = {
    page: number,
    rowsCount: number | null,
    data: FrasesDatabase[]
}

export default HistoricalResponse
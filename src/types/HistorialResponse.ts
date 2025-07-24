import FrasesDatabase from "./database/FrasesDatabase.js"

type HistoricalResponse = {
    page: number,
    rowsCount: number | null,
    data: FrasesDatabase[]
}

export default HistoricalResponse
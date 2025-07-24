import FrasesDatabase from "./database/FrasesDatabase.js"

type GetManyTextResponse = {
    rowsCount: number | null,
    data: FrasesDatabase[]
}

export default GetManyTextResponse
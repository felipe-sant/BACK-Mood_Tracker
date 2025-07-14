import FrasesDatabase from "./database/FrasesDatabase"

type GetManyTextResponse = {
    rowsCount: number | null,
    data: FrasesDatabase[]
}

export default GetManyTextResponse
import DatabaseFrases from "./DatabaseFrases"

type GetManyTextResponse = {
    rowsCount: number | null,
    data: DatabaseFrases[]
}

export default GetManyTextResponse
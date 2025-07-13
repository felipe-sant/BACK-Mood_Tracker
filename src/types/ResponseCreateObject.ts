import DatabaseFrases from "./DatabaseFrases"

type ResponseGetManyText = {
    page: number,
    rowsCount: number | null,
    data: DatabaseFrases[]
}

export default ResponseGetManyText
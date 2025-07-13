import client from '../db'
import DatabaseFrases from '../types/DatabaseFrases';
import ResponsePredict from '../types/ResponsePredict';

export class DatabaseService {
    async saveText(text: string): Promise<void> {
        const query = `INSERT INTO frases (text) VALUES ('${text}')`
        await client.query(query)
    }

    async getManyText(page: number, offSet: number, limit: number): Promise<{ page: number, rowsCount: number | null, data: Array<DatabaseFrases> }> {
        const query = `SELECT * FROM frases ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offSet}`
        const res = await client.query(query)
        const rows = res.rows as Array<DatabaseFrases>
        const rowsCount: number | null = res.rowCount
        return {
            page: page,
            rowsCount: rowsCount,
            data: rows
        }
    }

    async findText(text: string): Promise<DatabaseFrases | undefined> {
        const query = `SELECT * FROM frases WHERE text='${text}'`
        const res = (await client.query(query)).rows as Array<DatabaseFrases>
        return res[0] as DatabaseFrases | undefined
    }

    async setPredict(_id: number, predict: ResponsePredict): Promise<void> {
        const query = `UPDATE frases SET intention='${predict.intention}', intention_number=${predict.intentionNumber} WHERE _id=${_id}`
        await client.query(query)
    }
}
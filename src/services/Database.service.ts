import client from '../db'
import DatabaseFrases from '../types/DatabaseFrases';

export class DatabaseService {
    async saveText(text: string): Promise<void> {
        console.log(text)
        console.log(typeof text)
        const query = `INSERT INTO frases (text) VALUES ('${text}')`
        await client.query(query)
    }

    async findText(text: string): Promise<DatabaseFrases | {}> {
        const query = `SELECT _id, text FROM frases WHERE text='${text}'`
        const res = await client.query(query) as DatabaseFrases | {}
        return res
    }
}
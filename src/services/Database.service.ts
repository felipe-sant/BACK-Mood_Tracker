import client from '../db'
import FrasesDatabase from '../types/database/FrasesDatabase';
import GetManyTextResponse from '../types/GetManyTextResponse';
import PredictResponse from '../types/PredictResponse';

export class DatabaseService {
    /**
     * Função de salvamento de registro na tabela frases
     * @param {string} text Texto a ser salvo no banco de dados
     * @description Salva um novo objeto na tabela frases
     */
    async saveText(text: string): Promise<void> {
        const query = `INSERT INTO frases (text) VALUES ('${text}')`
        await client.query(query)
    }

    /**
     * Função para pegar grandes quantidades de frases.
     * @param {number} limit Número limite de objetos retornados
     * @param {number} offSet Número de objetos pulados
     * @returns {GetManyTextResponse} Retorna um objeto com a número de linhas e dados.
     * @description Retorna varios objetos da tabela frases do banco de dados, com base na página e no limite estipulado.
     */
    async getManyText(limit?: number, offSet?: number): Promise<GetManyTextResponse> {
        let query = `SELECT * FROM frases ORDER BY created_at DESC`
        if (limit) {
            query += ` LIMIT ${limit}`
            if (offSet) {
                query += ` OFFSET ${offSet}`
            }
        }
        const res = await client.query(query)
        const rows = res.rows as Array<FrasesDatabase>
        const rowsCount: number | null = res.rowCount
        return {
            rowsCount: rowsCount,
            data: rows
        }
    }

    /**
     * Função para pegar um frase especifica.
     * @param {string} text Texto a ser procurado no bd.
     * @returns {FrasesDatabase} Retorna o objeto ultimo objeto registrado vindo do bd com o filtro do texto.
     * @description Retorna um objeto da tabela frases com base no filtro de texto, retornando o ultimo registrado.
     */
    async findText(text: string, _id?: number): Promise<FrasesDatabase | undefined> {
        let query = `SELECT * FROM frases WHERE text='${text}' ORDER BY created_at DESC`;
        if (_id) { query = `SELECT * FROM frases WHERE _id=${_id} ORDER BY created_at DESC`; }
        const res = (await client.query(query)).rows as Array<FrasesDatabase>
        return res[0] as FrasesDatabase | undefined
    }

    /**
     * Função para setar o predict em uma frase especifica.
     * @param {number} _id Identificador para buscar no bd. 
     * @param {PredictResponse} predict Predict que sera inserido no objeto.
     * @description Atualiza uma frase colocando o novo predict.
     */
    async setPredict(_id: number, predict: PredictResponse): Promise<void> {
        const query = `UPDATE frases SET intention='${predict.intention}', intention_number=${predict.intention_number} WHERE _id=${_id}`
        await client.query(query)
    }
}
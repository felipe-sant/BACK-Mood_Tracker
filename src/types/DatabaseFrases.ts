type DatabaseFrases = {
    _id: number,
    text: string,
    intention: "positive" | "neutral" | "negative",
    intentionNumber: -1 | 0 | 1
}

export default DatabaseFrases
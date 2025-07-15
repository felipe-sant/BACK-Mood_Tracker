type FrasesDatabase = {
    _id: number,
    text: string,
    intention: "positive" | "neutral" | "negative",
    intention_number: -1 | 0 | 1,
    created_at: Date, // data com fuso
    updated_at: Date, // data com fuso
}

export default FrasesDatabase
type PredictResponse = {
    intention: "positive" | "neutral" | "negative"
    intention_number: -1 | 0 | 1
}

export default PredictResponse
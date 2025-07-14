type PredictResponse = {
    intention: "positive" | "neutral" | "negative"
    intentionNumber: -1 | 0 | 1
}

export default PredictResponse
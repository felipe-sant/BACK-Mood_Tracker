type PredictResponse = {
    text: "positive" | "neutral" | "negative"
    score: -1 | 0 | 1
}

export default PredictResponse
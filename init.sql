CREATE TABLE frases (
    _id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    intention TEXT CHECK (intention IN ('positive', 'neutral', 'negative')),
    intentionNumber INTEGER CHECK (intentionNumber IN (-1, 0, 1))
);
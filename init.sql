CREATE TABLE frases (
    _id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    intention TEXT CHECK (intention IN ('positive', 'neutral', 'negative')),
    intention_number INTEGER CHECK (intention_number IN (-1, 0, 1))
);
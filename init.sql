SET TIME ZONE 'America/Sao_Paulo';

CREATE TABLE frases (
    _id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    intention TEXT CHECK (intention IN ('positive', 'neutral', 'negative')),
    intention_number INTEGER CHECK (intention_number IN (-1, 0, 1)),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_frases_updated_at
BEFORE UPDATE ON frases
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

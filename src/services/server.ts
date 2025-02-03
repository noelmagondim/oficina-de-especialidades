import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { Request, Response } from "express";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Rota para testar se o servidor está rodando
app.get("/", (req: Request, res: Response) => {
  res.send("API do site de inscrições está funcionando!");
});

// ⚠️ Em vez de usar app.listen(), exporte o app como handler para o Vercel
export default app;

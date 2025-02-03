import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { Request, Response } from "express";
import { getEspecialidadesSaturday, getEspecialidadesSunday } from "../src/services/supabaseService"; // Funções para buscar especialidades
import { saveRegistration } from "../src/services/registrationService.ts"; // Função para salvar inscrição

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota para testar se o servidor está funcionando
app.get("/", (req: Request, res: Response) => {
  res.send("API do site de inscrições está funcionando!");
});

// Rota para obter as especialidades de sábado
app.get("/saturdaySpecialties", async (req: Request, res: Response) => {
  try {
    const especialidadesSaturday = await getEspecialidadesSaturday();
    res.json(especialidadesSaturday);
  } catch (error) {
    res.status(500).send("Erro ao obter especialidades de sábado");
  }
});

// Rota para obter as especialidades de domingo
app.get("/sundaySpecialties", async (req: Request, res: Response) => {
  try {
    const especialidadesSunday = await getEspecialidadesSunday();
    res.json(especialidadesSunday);
  } catch (error) {
    res.status(500).send("Erro ao obter especialidades de domingo");
  }
});

// Rota para salvar a inscrição
app.post("/registration", async (req: Request, res: Response) => {
  const { nome, email, telefone, especialidade, horario } = req.body;
  
  try {
    await saveRegistration(nome, email, telefone, especialidade, horario);
    res.status(201).send("Inscrição realizada com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao salvar inscrição");
  }
});

// Porta do servidor (não usa app.listen no Vercel)
export default app;

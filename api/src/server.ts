import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getEspecialidadesSaturday, getEspecialidadesSunday } from "./services/supabaseService";
import { saveRegistration } from "./services/registrationService";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("API do site de inscrições está funcionando!");
});

app.get("/api/saturdaySpecialties", async (req, res) => {
  try {
    const especialidadesSaturday = await getEspecialidadesSaturday();
    res.json(especialidadesSaturday);
  } catch (error) {
    res.status(500).send("Erro ao obter especialidades de sábado");
  }
});

app.get("/api/sundaySpecialties", async (req, res) => {
  try {
    const especialidadesSunday = await getEspecialidadesSunday();
    res.json(especialidadesSunday);
  } catch (error) {
    res.status(500).send("Erro ao obter especialidades de domingo");
  }
});

app.post("/api/registration", async (req, res) => {
  const { nome, email, telefone, especialidade, horario } = req.body;
  try {
    await saveRegistration(nome, email, telefone, especialidade, horario);
    res.status(201).send("Inscrição realizada com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao salvar inscrição");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

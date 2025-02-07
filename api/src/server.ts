import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getEspecialidadesSaturday, getEspecialidadesSunday } from "./services/supabaseService";
import { saveRegistration } from "./services/registrationService";
import { getDistrictsAndClubs } from "../src/services/supabaseService";

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
    console.error("Erro ao obter especialidades de sábado:", error);
    res.status(500).json({ error: "Erro ao obter especialidades de sábado" });
  }
});

app.get("/api/sundaySpecialties", async (req, res) => {
  try {
    const especialidadesSunday = await getEspecialidadesSunday();
    res.json(especialidadesSunday);
  } catch (error) {
    console.error("Erro ao obter especialidades de domingo:", error);
    res.status(500).json({ error: "Erro ao obter especialidades de domingo" });
  }
});

app.post("/api/submitRegistration", async (req: any, res:any ) => {
  try {
    const { fullName, email, phone, age, district, club, saturdaySpecialties, sundaySpecialties, confirmationCode } = req.body;

    if (!fullName || !email || !phone || !age || !district || !club || !saturdaySpecialties || !sundaySpecialties || !confirmationCode) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    console.log("📩 Recebendo dados:", req.body);

    await saveRegistration({
      fullName,
      email,
      phone,
      age,
      district,
      club,
      saturdaySpecialties,
      sundaySpecialties,
      confirmationCode
    });

    res.status(201).json({ message: "Inscrição realizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar inscrição:", error);
    res.status(500).json({ error: "Erro ao salvar inscrição" });
  }
});

app.get("/api/districts", async (req, res) => {
  const districts = await getDistrictsAndClubs();
  res.json(districts);
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getEspecialidadesSaturday, getEspecialidadesSunday } from "./services/supabaseService";
import { saveRegistration } from "./services/registrationService";
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do site de inscrições está funcionando!");
});

app.get("/saturdaySpecialties", async (req, res) => {
  try {
    const especialidadesSaturday = await getEspecialidadesSaturday();
    res.json(especialidadesSaturday);
  } catch (error) {
    res.status(500).send("Erro ao obter especialidades de sábado");
  }
});

app.get("/sundaySpecialties", async (req, res) => {
  try {
    const especialidadesSunday = await getEspecialidadesSunday();
    res.json(especialidadesSunday);
  } catch (error) {
    res.status(500).send("Erro ao obter especialidades de domingo");
  }
});

app.post("/registration", async (req, res) => {
  const { nome, email, telefone, especialidade, horario } = req.body;

  try {
    await saveRegistration(nome, email, telefone, especialidade, horario);
    res.status(201).send("Inscrição realizada com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao salvar inscrição");
  }
});

app.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.from('Especialidades').select('*').limit(1);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Erro ao testar conexão com o banco:', err);
    res.status(500).json({ message: 'Erro ao conectar ao banco de dados' });
  }
});

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);  // Ou você pode usar diretamente o app se for para o Vercel
};


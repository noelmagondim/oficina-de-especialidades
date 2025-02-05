import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getEspecialidadesSaturday = async () => {
  const { data, error } = await supabase
    .from("especialidades_sabado") // Ajuste para o nome correto da tabela
    .select("*");

  if (error) {
    console.error('Erro ao buscar especialidades:', error);
    throw error;
  }
  return data;
};

export const getEspecialidadesSunday = async () => {
  const { data, error } = await supabase
    .from("especialidades_domingo") // Ajuste para o nome correto da tabela
    .select("*");

  if (error) {
    console.error('Erro ao buscar especialidades:', error);
    throw error;
  }
  return data;
};
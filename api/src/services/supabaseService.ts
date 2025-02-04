import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
console.log('Supabase URL:', process.env.SUPABASE_URL); // Verifique se a URL está sendo carregada
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
console.log('Supabase Anon Key:', process.env.SUPABASE_ANON_KEY); // Verifique se a chave está sendo carregada
const supabase = createClient(supabaseUrl, supabaseKey);

export const getEspecialidadesSaturday = async () => {
  const { data, error } = await supabase
    .from("especialidades_sabado") // Ajuste para o nome correto da tabela
    .select("*");

  if (error) {
    throw error;
  }
  return data;
};

export const getEspecialidadesSunday = async () => {
  const { data, error } = await supabase
    .from("especialidades_domingo") // Ajuste para o nome correto da tabela
    .select("*");

  if (error) {
    throw error;
  }
  return data;
};

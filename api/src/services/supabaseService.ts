import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export const getEspecialidadesSaturday = async () => {
  const { data, error } = await supabase.from('especialidades_sabado').select('*'); // Verifique se o nome da tabela está correto
  console.log(data, error);
  if (error) {
    console.error('Erro ao buscar especialidades:', error);
    return [];
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
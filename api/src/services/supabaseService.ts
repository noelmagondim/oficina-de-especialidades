import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export const getEspecialidadesSaturday = async () => {
  const { data, error } = await supabase.from("especialidades_sabado").select("*");
  if (error) {
    console.error("Erro ao buscar especialidades de sábado:", error);
    return [];
  }
  return data;
};

export const getEspecialidadesSunday = async () => {
  const { data, error } = await supabase.from("especialidades_domingo").select("*");
  if (error) {
    console.error("Erro ao buscar especialidades de domingo:", error);
    throw error;
  }
  return data;
};

// Define um tipo para os dados de inscrição
interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  district: string;
  club: string;
  saturdaySpecialties: string;
  sundaySpecialties: string;
}

// Ajustando para receber um objeto
export const saveRegistration = async (registration: RegistrationData) => {
  const { error } = await supabase.from("inscrições").insert([registration]);

  if (error) {
    console.error("Erro ao salvar inscrição:", error);
    throw error;
  }
};

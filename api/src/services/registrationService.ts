import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const saveRegistration = async (
  nome: string,
  email: string,
  telefone: string,
  especialidade: string,
  horario: string
) => {
  const { error } = await supabase
    .from("inscricoes")
    .insert([
      {
        nome,
        email,
        telefone,
        especialidade,
        horario,
      },
    ]);

  if (error) {
    throw error;
  }
};

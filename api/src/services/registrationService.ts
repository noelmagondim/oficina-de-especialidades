import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Definição do tipo para a inscrição
interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  age: number,
  district: string;
  club: string;
  saturdaySpecialties: string;
  sundaySpecialties: string;
  confirmationCode: string;
}

export const saveRegistration = async (data: RegistrationData) => {
  const formattedData = {
    "fullName": data.fullName,
    "email": data.email,
    "phone": data.phone,
    "age": Number(data.age), 
    "district": data.district,
    "club": data.club,
    "saturdaySpecialties": data.saturdaySpecialties,
    "sundaySpecialties": data.sundaySpecialties,
    "confirmationCode": data.confirmationCode,
    "criado_em": new Date().toISOString()
  };

  console.log("📩 Dados formatados para inserção:", JSON.stringify(formattedData, null, 2));

  const { data: insertedData, error } = await supabase
    .from("inscrições")
    .insert([formattedData])
    .select();

  console.log("🔍 Resposta do Supabase:", JSON.stringify({ insertedData, error }, null, 2));

  if (error) {
    console.error("❌ Erro ao salvar no banco:", JSON.stringify(error, null, 2));
    throw new Error(`Erro ao salvar inscrição: ${error.message || "Erro desconhecido"}`);
  }
};

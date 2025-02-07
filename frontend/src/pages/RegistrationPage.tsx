import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import "../styles/RegistrationPage.css";

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    district: "",
    club: "",
  });

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    phone: false,
    age: false,
    district: false,
    club: false,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\(\d{2}\) \d \d{4}-\d{4}$/.test(phone);
  const validateAge = (age: string) => {
    const numAge = parseInt(age, 10);
    return !isNaN(numAge) && numAge > 0;
  };

  const handleNext = () => {
    const newErrors = {
      fullName: formData.fullName.trim() === "",
      email: !validateEmail(formData.email),
      phone: !validatePhone(formData.phone),
      age: !validateAge(formData.age),
      district: formData.district.trim() === "",
      club: formData.club.trim() === "",
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    // Salvando todas as informações no `localStorage`
    localStorage.setItem("registrationData", JSON.stringify(formData));

    navigate("/saturdaySpecialties");
  };

  const districts = [
    { name: "Alto da Conceição", clubs: ["Águia Real", "Arautos do Advento", "Nova Jerusalém"] },
    { name: "Central", clubs: ["Felinos", "Leão de Judá", "Pena Inspirada", "Tribo de Judá"] },
    { name: "Cohab", clubs: ["Exército de Deus", "Filhos do Altíssimo", "Filhos de Israel", "Fortaleza Suprema", "Guerreiros do Altíssimo", "Guerreiros do Alto", "Kerygma", "Valentes da Serra", "Rocha Firme"] },
  ];

  const selectedDistrict = districts.find((d) => d.name === formData.district);

  return (
    <div className="registration-container">
      <h1 className="title">Formulário de Inscrição</h1>
      <form className="form-container">
        {[
          { label: "Nome Completo", name: "fullName", type: "text" },
          { label: "E-mail", name: "email", type: "email" },
          { label: "Idade", name: "age", type: "number" },
        ].map((field) => (
          <div key={field.name} className="form-group">
            <label className="label">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={(formData as any)[field.name]}
              onChange={handleChange}
              className={`input ${errors[field.name as keyof typeof errors] ? "input-error" : ""}`}
            />
            {field.name === "email" && errors.email && <span className="error-message">Informe um e-mail válido</span>}
            {field.name === "age" && errors.age && <span className="error-message">Informe uma idade válida</span>}
          </div>
        ))}

        <div className="form-group">
          <label className="label">Telefone</label>
          <InputMask
            mask="(99) 9 9999-9999"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`input ${errors.phone ? "input-error" : ""}`}
          />
          {errors.phone && <span className="error-message">Informe um telefone válido</span>}
        </div>

        <div className="form-group">
          <label htmlFor="district" className="label">Distrito</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={`input ${errors.district ? "input-error" : ""}`}
          >
            <option value="">Selecione seu distrito</option>
            {districts.map((district) => (
              <option key={district.name} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {selectedDistrict && (
          <div className="form-group">
            <label htmlFor="club" className="label">Clube</label>
            <select
              id="club"
              name="club"
              value={formData.club}
              onChange={handleChange}
              className={`input ${errors.club ? "input-error" : ""}`}
            >
              <option value="">Selecione seu Clube</option>
              {selectedDistrict.clubs.map((club) => (
                <option key={club} value={club}>
                  {club}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="button" onClick={handleNext} className="submit">
          Próximo
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/RegistrationPage.css'; // Importando o arquivo CSS externo

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    district: '',
    club: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    navigate('/saturdaySpecialties');
  };

  const districts = [
    { name: "Alto da Conceição", clubs: ["A", "B", "C"] },
    { name: "Central", clubs: ["D", "E", "F", "G"] },
    { name: "Cohab", clubs: ["H", "I", "J", "K", "L"] },
  ];

  const selectedDistrict = districts.find((d) => d.name === formData.district);

  return (
    <div className="registration-container">
      <h1 className="title">Formulário de Inscrição</h1>
      <form className="form-container">
        <div className="form-group">
          <label className="label">Nome Completo</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Telefone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Idade</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="district" className="label">Distrito</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="input"
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
            className="input"
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
        
        <button
          type="button"
          onClick={handleNext}
          className="submit"
        >
          Próximo
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
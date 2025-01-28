import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/RegistrationPage.css'; // Importando o arquivo CSS externo

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
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
          <label className="label">Clube</label>
          <input
            type="text"
            name="club"
            value={formData.club}
            onChange={handleChange}
            className="input"
          />
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="submit-button"
        >
          Próximo
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;

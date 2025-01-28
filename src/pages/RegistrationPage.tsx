import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Formulário de Inscrição</h1>
      <form>
        <div>
          <label>Nome Completo</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Idade</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Clube</label>
          <input
            type="text"
            name="club"
            value={formData.club}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          onClick={handleNext}
        >
          Próximo
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;

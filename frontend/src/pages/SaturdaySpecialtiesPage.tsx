import React, { useState, useEffect } from 'react';
import '../styles/SaturdaySpecialtiesPage.css'; 
import { useNavigate } from 'react-router-dom';

type Specialty = {
  name: string;
  slots: Record<string, number>; // Horários e vagas disponíveis
};

const SaturdaySpecialtiesPage: React.FC = () => {
  const [selectedSlots, setSelectedSlots] = useState<{ name: string; time: string }[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);  // Para mostrar o carregando
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Carregar dados da API ao montar o componente
  useEffect(() => {
    fetch('/api/saturdaySpecialties')  // Aqui está a rota que você precisa ajustar de acordo com a sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error('Falha ao carregar dados da API');
        }
        return response.json();
      })
      .then((data) => {
        setAvailableSlots(data); // Supondo que a API retorne os dados no formato correto
        setLoading(false);  // Dados carregados
      })
      .catch((err) => {
        setError(err.message);  // Caso tenha um erro ao carregar
        setLoading(false);
      });
  }, []);

  const handleSelect = (specialty: string, time: string) => {
    const isSpecialtySelected = selectedSlots.some((slot) => slot.name === specialty);
    if (isSpecialtySelected) {
      alert(`Você já selecionou um horário para ${specialty}.`);
      return;
    }

    const isTimeTaken = selectedSlots.some((slot) => slot.time === time);
    if (isTimeTaken) {
      alert(`Você já selecionou um horário para ${time}.`);
      return;
    }

    const specialtyData = availableSlots.findIndex((s) => s.name === specialty);
    if (specialtyData === -1 || availableSlots[specialtyData].slots[time] === 0) {
      alert(`Sem vagas disponíveis para ${specialty} às ${time}.`);
      return;
    }

    setSelectedSlots([...selectedSlots, { name: specialty, time }]);

    const updatedSlots = [...availableSlots];
    updatedSlots[specialtyData].slots[time] -= 1;
    setAvailableSlots(updatedSlots);
  };

  const handleRemove = (specialty: string, time: string) => {
    setSelectedSlots(selectedSlots.filter((slot) => !(slot.name === specialty && slot.time === time)));

    const specialtyData = availableSlots.findIndex((s) => s.name === specialty);
    if (specialtyData !== -1) {
      const updatedSlots = [...availableSlots];
      updatedSlots[specialtyData].slots[time] += 1;
      setAvailableSlots(updatedSlots);
    }
  };

  const handleNext = () => {
    localStorage.setItem('saturdaySpecialties', JSON.stringify(selectedSlots));
    navigate('/sundaySpecialties');
  };

  const handleBack = () => {
    navigate('/registration');
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="specialties-container">
      <h1 className="title">Selecione as Especialidades do Sábado</h1>
      <div className="specialties-grid">
        {availableSlots.map((specialty) => (
          <div key={specialty.name} className="specialty-card">
            <h2 className="specialty-name">{specialty.name}</h2>
            <div className="time-buttons">
              {Object.keys(specialty.slots).map((time) => {
                const isSpecialtySelected = selectedSlots.some((slot) => slot.name === specialty.name);
                return (
                  <button
                    key={time}
                    onClick={() => handleSelect(specialty.name, time)}
                    disabled={isSpecialtySelected || specialty.slots[time] === 0}
                    className={`time-button ${specialty.slots[time] === 0 || isSpecialtySelected ? 'disabled' : 'active'}`}
                  >
                    {time} ({specialty.slots[time]} vagas)
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="selected-container">
        <h2 className="selected-title">Suas Seleções:</h2>
        {selectedSlots.length > 0 ? (
          <ul className="selected-list">
            {selectedSlots.map((slot, index) => (
              <li key={index} className="selected-item">
                <span>{slot.name} às {slot.time}</span>
                <button
                  onClick={() => handleRemove(slot.name, slot.time)}
                  className="remove-button"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma especialidade selecionada ainda.</p>
        )}
      </div>
      <button
          type="button"
          onClick={handleBack}
          className="submit-button"
        >
          Voltar
        </button>
      <button
          type="button"
          onClick={handleNext}
          className="submit-button"
        >
          Próximo
        </button>
    </div>
  );
};

export default SaturdaySpecialtiesPage;

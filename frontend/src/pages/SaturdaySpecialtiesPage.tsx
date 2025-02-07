import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SaturdaySpecialtiesPage.css';

interface Specialty {
  id: number;
  name: string;
  slots: Record<string, number>; // Horários e vagas disponíveis
}

const SaturdaySpecialtiesPage: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlots, setSelectedSlots] = useState<{ name: string; time: string }[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Specialty[]>([]);
  const navigate = useNavigate();

  // Carregar especialidades da API
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/saturdaySpecialties');
        if (!response.ok) throw new Error('Erro ao buscar especialidades');
        
        const specialtiesData = await response.json();
        setSpecialties(specialtiesData);
        setAvailableSlots(specialtiesData); // Inicializa com os horários disponíveis
      } catch (error) {
        console.error('Erro ao carregar especialidades de sábado:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  if (loading) {
    return <p>Carregando especialidades...</p>;
  }

  // Selecionar um horário
  const handleSelect = (specialty: string, time: string) => {
    // Verifica se já selecionou essa especialidade
    if (selectedSlots.some((slot) => slot.name === specialty)) {
      alert(`Você já selecionou um horário para ${specialty}.`);
      return;
    }

    // Verifica se já selecionou esse horário para outra especialidade
    if (selectedSlots.some((slot) => slot.time === time)) {
      alert(`Você já selecionou um horário para ${time}.`);
      return;
    }

    // Encontra a especialidade nos slots disponíveis
    const specialtyIndex = availableSlots.findIndex((s) => s.name === specialty);
    if (specialtyIndex === -1 || availableSlots[specialtyIndex].slots[time] === 0) {
      alert(`Sem vagas disponíveis para ${specialty} às ${time}.`);
      return;
    }

    // Atualiza estado
    setSelectedSlots([...selectedSlots, { name: specialty, time }]);

    // Atualiza as vagas disponíveis
    const updatedSlots = [...availableSlots];
    updatedSlots[specialtyIndex].slots[time] -= 1;
    setAvailableSlots(updatedSlots);
  };

  // Remover um horário selecionado
  const handleRemove = (specialty: string, time: string) => {
    setSelectedSlots(selectedSlots.filter((slot) => !(slot.name === specialty && slot.time === time)));

    // Restaurar a vaga removida
    const specialtyIndex = availableSlots.findIndex((s) => s.name === specialty);
    if (specialtyIndex !== -1) {
      const updatedSlots = [...availableSlots];
      updatedSlots[specialtyIndex].slots[time] += 1;
      setAvailableSlots(updatedSlots);
    }
  };

  // Ir para a próxima página
  const handleNext = () => {
    localStorage.setItem('saturdaySpecialties', JSON.stringify(selectedSlots));
    navigate('/sundaySpecialties');
  };

  // Voltar para a página anterior
  const handleBack = () => {
    navigate('/registration');
  };

  return (
    <div className="specialties-container">
      <h1 className="title">Selecione as Especialidades do Sábado</h1>
      <div className="specialties-grid">
        {availableSlots.map((specialty) => (
          <div key={specialty.id} className="specialty-card">
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

      {/* Lista de Selecionados */}
      <div className="selected-container">
        <h2 className="selected-title">Suas Seleções:</h2>
        {selectedSlots.length > 0 ? (
          <ul className="selected-list">
            {selectedSlots.map((slot, index) => (
              <li key={index} className="selected-item">
                <span>{slot.name} às {slot.time}</span>
                <button onClick={() => handleRemove(slot.name, slot.time)} className="remove-button">
                  Remover
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma especialidade selecionada ainda.</p>
        )}
      </div>

      {/* Botões de Navegação */}
      <div className="button-container">
        <button onClick={handleBack} className="submit-button">Voltar</button>
        <button onClick={handleNext} className="submit-button">Próximo</button>
      </div>
    </div>
  );
};

export default SaturdaySpecialtiesPage;

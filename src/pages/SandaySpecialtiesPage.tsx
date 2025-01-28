import React, { useState } from 'react';
import '/src/styles/SaturdaySpecialtiesPage.css';
import { useNavigate } from 'react-router-dom';

type Specialty = {
  name: string;
  slots: Record<string, number>; // Horários e vagas disponíveis
};

const specialtiesData: Specialty[] = [
  { name: 'Especialidade 5', slots: { '08:00': 50, '09:00': 50, '10:00': 50, '11:00': 50 } },
  { name: 'Especialidade 6', slots: { '08:00': 50, '09:00': 50, '10:00': 50, '11:00': 50 } },
  { name: 'Especialidade 7', slots: { '08:00': 50, '09:00': 50, '10:00': 50, '11:00': 50 } },
  { name: 'Especialidade 8', slots: { '08:00': 50, '09:00': 50, '10:00': 50, '11:00': 50 } },
];

const SandaySpecialtiesPage: React.FC = () => {
  const [selectedSlots, setSelectedSlots] = useState<{ specialty: string; time: string }[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Specialty[]>([...specialtiesData]);

  const handleSelect = (specialty: string, time: string) => {
    // Verificar se a especialidade já foi selecionada
    const isSpecialtySelected = selectedSlots.some((slot) => slot.specialty === specialty);
    if (isSpecialtySelected) {
      alert(`Você já selecionou um horário para ${specialty}.`);
      return;
    }
    // Verificar se o horário já foi selecionado
    const isTimeTaken = selectedSlots.some((slot) => slot.time === time);
    if (isTimeTaken) {
      alert(`Você já selecionou um horário para ${time}.`);
      return;
    }

    // Verificar se há vagas disponíveis
    const specialtyData = availableSlots.findIndex((s) => s.name === specialty);
    if (specialtyData === -1 || availableSlots[specialtyData].slots[time] === 0) {
      alert(`Sem vagas disponíveis para ${specialty} às ${time}.`);
      return;
    }

    // Atualizar o estado de seleção
    setSelectedSlots([...selectedSlots, { specialty: specialty, time }]);

    // Atualizar o estado de vagas
    const updatedSlots = [...availableSlots];
    updatedSlots[specialtyData].slots[time] -= 1;
    setAvailableSlots(updatedSlots);
  };

  const handleRemove = (specialty: string, time: string) => {
    // Remover a seleção
    setSelectedSlots(selectedSlots.filter((slot) => !(slot.specialty === specialty && slot.time === time)));

    // Repor a vaga
    const specialtyData = availableSlots.findIndex((s) => s.name === specialty);
    if (specialtyData !== -1) {
      const updatedSlots = [...availableSlots];
      updatedSlots[specialtyData].slots[time] += 1;
      setAvailableSlots(updatedSlots);
    }
  };

  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/saturdaySpecialties');
  };

  const handleNext = () => {
    navigate('/confirmationPage');
  };

  return (
    <div className="specialties-container">
      <h1 className="title">Selecione as Especialidades do Domingo</h1>
      <div className="specialties-grid">
        {specialtiesData.map((specialty) => (
          <div key={specialty.name} className="specialty-card">
            <h2 className="specialty-name">{specialty.name}</h2>
            <div className="time-buttons">
              {Object.keys(specialty.slots).map((time) => {
                const isSpecialtySelected = selectedSlots.some((slot) => slot.specialty === specialty.name);
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
                <span>{slot.specialty} às {slot.time}</span>
                <button
                  onClick={() => handleRemove(slot.specialty, slot.time)}
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
          className="submit-button"
          onClick={handleBack}
        >
          Voltar
        </button>
      <button
          type="button"
          className="submit-button"
          onClick={handleNext}
        >
          Enviar
        </button>
    </div>
  );
};

export default SandaySpecialtiesPage;

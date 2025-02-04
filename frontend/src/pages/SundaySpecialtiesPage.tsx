import React, { useState, useEffect } from 'react';
import '../styles/SaturdaySpecialtiesPage.css';
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

const SundaySpecialtiesPage: React.FC = () => {
  const [selectedSlots, setSelectedSlots] = useState<{ name: string; time: string }[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Specialty[]>(specialtiesData);

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

  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/saturdaySpecialties');
  };

  const generateConfirmationCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  };

  const handleSubmit = () => {
    localStorage.setItem('sundaySpecialties', JSON.stringify(selectedSlots));

    const code = generateConfirmationCode();
    localStorage.setItem('confirmationCode', code);

    fetch('/api/saveSelections', {  // Alterar para a URL do seu servidor
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selections: selectedSlots,
        confirmationCode: code,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      navigate('/confirmationPage');
    })
    .catch((error) => console.error('Erro ao enviar seleções:', error));
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
        onClick={handleSubmit}
        className="submit-button"
      >
        Enviar
      </button>
    </div>
  );
};

export default SundaySpecialtiesPage;

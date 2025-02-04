import React, { useState } from 'react';
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
  const [availableSlots, setAvailableSlots] = useState<Specialty[]>([...specialtiesData]);

  const handleSelect = (specialty: string, time: string) => {
    // Verificar se a especialidade já foi selecionada
    const isSpecialtySelected = selectedSlots.some((slot) => slot.name === specialty);
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
    setSelectedSlots([...selectedSlots, { name: specialty, time }]);

    // Atualizar o estado de vagas
    const updatedSlots = [...availableSlots];
    updatedSlots[specialtyData].slots[time] -= 1;
    setAvailableSlots(updatedSlots);
  };

  const handleRemove = (specialty: string, time: string) => {
    // Remover a seleção
    setSelectedSlots(selectedSlots.filter((slot) => !(slot.name === specialty && slot.time === time)));

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

    // Função para gerar um código único de confirmação
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
      // Gera o código de confirmação
      localStorage.setItem('sundaySpecialties', JSON.stringify(selectedSlots));

      const code = generateConfirmationCode();
      
      // Salva o código no localStorage para acessá-lo na página 4
      localStorage.setItem('confirmationCode', code);
      
    // Navega para a página 4
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
          className="submit-button"
          onClick={handleBack}
        >
          Voltar
        </button>
      <button
          type="button"
          className="submit-button"
          onClick={handleSubmit}
        >
          Enviar
        </button>
    </div>
  );
};

export default SundaySpecialtiesPage;

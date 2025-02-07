import React, { useState, useEffect } from 'react';
import '../styles/SaturdaySpecialtiesPage.css';
import { useNavigate } from 'react-router-dom';

interface Specialty {
  id: number;
  name: string;
  slots: Record<string, number>; // Horários e vagas disponíveis
}

interface SelectedSlot {
  name: string;
  time: string;
  }

const SundaySpecialtiesPage: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlots, setSelectedSlots] = useState<{ name: string; time: string }[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Specialty[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isNewRegistration = !localStorage.getItem("registrationData"); // Verifica se é uma nova inscrição
  
    if (isNewRegistration) {
      localStorage.removeItem("sundaySpecialties"); // Limpa as especialidades do domingo se for uma nova inscrição
    }
  
    const fetchSpecialties = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sundaySpecialties');
        if (!response.ok) throw new Error('Erro ao buscar especialidades');
        const specialtiesData: Specialty[] = await response.json();
        setSpecialties(specialtiesData);
        setAvailableSlots(specialtiesData);
      } catch (error) {
        console.error('Erro ao carregar especialidades do domingo:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSpecialties();
  
    // Carrega seleções do localStorage
    const savedSelections = JSON.parse(localStorage.getItem("sundaySpecialties") || "[]");
    setSelectedSlots(savedSelections);
  }, []);
  

  if (loading) return <p>Carregando especialidades...</p>;

  const handleSelect = (specialty: string, time: string) => {
    if (selectedSlots.some((slot) => slot.name === specialty)) {
      alert(`Você já selecionou um horário para ${specialty}.`);
      return;
    }

    if (selectedSlots.some((slot) => slot.time === time)) {
      alert(`Você já selecionou um horário para ${time}.`);
      return;
    }

    const specialtyIndex = availableSlots.findIndex((s) => s.name === specialty);
    if (specialtyIndex === -1 || availableSlots[specialtyIndex].slots[time] === 0) {
      alert(`Sem vagas disponíveis para ${specialty} às ${time}.`);
      return;
    }

    const updatedSelections = [...selectedSlots, { name: specialty, time }];
    setSelectedSlots(updatedSelections);
    localStorage.setItem("sundaySpecialties", JSON.stringify(updatedSelections));

    const updatedSlots = [...availableSlots];
    updatedSlots[specialtyIndex].slots[time] -= 1;
    setAvailableSlots(updatedSlots);
  };

  const handleRemove = (specialty: string, time: string) => {
    const updatedSelections = selectedSlots.filter((slot) => !(slot.name === specialty && slot.time === time));
    setSelectedSlots(updatedSelections);
    localStorage.setItem("sundaySpecialties", JSON.stringify(updatedSelections));

    const specialtyIndex = availableSlots.findIndex((s) => s.name === specialty);
    if (specialtyIndex !== -1) {
      const updatedSlots = [...availableSlots];
      updatedSlots[specialtyIndex].slots[time] += 1;
      setAvailableSlots(updatedSlots);
    }
  };

  const handleBack = () => {
    navigate('/saturdaySpecialties');
  };

  const handleSubmit = async () => {
    const registrationData = JSON.parse(localStorage.getItem("registrationData") || "{}");
    const saturdaySpecialties = JSON.parse(localStorage.getItem("saturdaySpecialties") || "[]");
    const sundaySpecialties = JSON.parse(localStorage.getItem("sundaySpecialties") || "[]");
  
    if (!registrationData.fullName || saturdaySpecialties.length === 0 || sundaySpecialties.length === 0) {
      alert("Preencha todas as informações antes de continuar.");
      return;
    }
  
    const requestData = {
      fullName: registrationData.fullName,
      email: registrationData.email,
      phone: registrationData.phone,
      age: registrationData.age,
      district: registrationData.district,
      club: registrationData.club,
      saturdaySpecialties,
      sundaySpecialties,
      confirmationCode: Math.random().toString(36).substring(2, 8), // Código aleatório
    };
    
    try {
      const response = await fetch("http://localhost:3000/api/submitRegistration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao enviar inscrição");
      }
  
      alert("Inscrição realizada com sucesso!");
      navigate("/confirmationPage");
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error);
      alert("Falha ao enviar inscrição.");
    }
  };

  return (
    <div className="specialties-container">
      <h1 className="title">Selecione as Especialidades do Domingo</h1>
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
      <button type="button" onClick={handleBack} className="submit-button">Voltar</button>
      <button type="button" onClick={handleSubmit} className="submit-button">Enviar</button>
    </div>
  );
};

export default SundaySpecialtiesPage;

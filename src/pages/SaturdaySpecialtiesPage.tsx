import React, { useState } from 'react';

type Specialty = {
  name: string;
  slots: Record<string, number>; // Horários e vagas disponíveis
};

const specialtiesData: Specialty[] = [
  { name: 'Especialidade 1', slots: { '14:00': 50, '15:00': 50, '16:00': 50, '17:00': 50 } },
  { name: 'Especialidade 2', slots: { '14:00': 50, '15:00': 50, '16:00': 50, '17:00': 50 } },
  { name: 'Especialidade 3', slots: { '14:00': 50, '15:00': 50, '16:00': 50, '17:00': 50 } },
  { name: 'Especialidade 4', slots: { '14:00': 50, '15:00': 50, '16:00': 50, '17:00': 50 } },
];

const SaturdaySpecialtiesPage: React.FC = () => {
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Selecione as Especialidades do Sábado</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {specialtiesData.map((specialty) => (
          <div key={specialty.name} className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{specialty.name}</h2>
            <div className="flex flex-col space-y-2">
              {Object.keys(specialty.slots).map((time) => {
                const isSpecialtySelected = selectedSlots.some((slot) => slot.specialty === specialty.name);
                return (
                  <button
                    key={time}
                    onClick={() => handleSelect(specialty.name, time)}
                    disabled={isSpecialtySelected || specialty.slots[time] === 0}
                    className={`px-4 py-2 rounded-md text-white ${
                      specialty.slots[time] === 0 || isSpecialtySelected
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {time} ({specialty.slots[time]} vagas)
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Suas Seleções:</h2>
        {selectedSlots.length > 0 ? (
          <ul className="space-y-2">
            {selectedSlots.map((slot, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-gray-200 rounded-md"
              >
                <span>
                  {slot.specialty} às {slot.time}
                </span>
                <button
                  onClick={() => handleRemove(slot.specialty, slot.time)}
                  className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
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
    </div>
  );
};

export default SaturdaySpecialtiesPage;

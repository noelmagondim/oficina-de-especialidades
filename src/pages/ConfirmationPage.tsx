import React, { useEffect, useState } from 'react';
import '/src/styles/ConfirmationPage.css';

const ConfirmationPage: React.FC = () => {
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [club, setClub] = useState<string | null>(null);
  const [saturdaySpecialties, setSaturdaySpecialties] = useState<{ name: string; time: string }[]>([]);
  const [sundaySpecialties, setSundaySpecialties] = useState<{ name: string; time: string }[]>([]);

  useEffect(() => {
    setConfirmationCode(localStorage.getItem('confirmationCode'));
    setFullName(localStorage.getItem('fullName'));
    setClub(localStorage.getItem('club'));
    setSaturdaySpecialties(JSON.parse(localStorage.getItem('saturdaySpecialties') || '[]'));
    setSundaySpecialties(JSON.parse(localStorage.getItem('sundaySpecialties') || '[]'));
  }, []);

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">Confirmação de Inscrição</h1>
      <p className="confirmation-text">Nome: <span className="confirmation-highlight">{fullName || "Não informado"}</span></p>
      <p className="confirmation-text">Clube: <span className="confirmation-highlight">{club || "Não informado"}</span></p>
      <p className="confirmation-text">Código de Confirmação: <span className="confirmation-highlight">{confirmationCode || "Não informado"}</span></p>
      
      <h2 className="confirmation-subtitle">Especialidades Escolhidas:</h2>
      <ul className="confirmation-list">
        {saturdaySpecialties.length > 0 && (
          <li>
            <strong>Sábado:</strong>
            <ul className="confirmation-sublist">
              {saturdaySpecialties.map((spec, index) => (
                <li key={index}>{spec.name} - {spec.time}</li>
              ))}
            </ul>
          </li>
        )}
        {sundaySpecialties.length > 0 && (
          <li>
            <strong>Domingo:</strong>
            <ul className="confirmation-sublist">
              {sundaySpecialties.map((spec, index) => (
                <li key={index}>{spec.name} - {spec.time}</li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ConfirmationPage;

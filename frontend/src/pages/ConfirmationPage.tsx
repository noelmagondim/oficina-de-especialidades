import React, { useEffect, useState } from 'react';
import '../styles/ConfirmationPage.css';
import { jsPDF } from 'jspdf';

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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Confirmação de Inscrição', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Nome: ${fullName || "Não informado"}`, 20, 30);
    doc.text(`Clube: ${club || "Não informado"}`, 20, 40);
    doc.text(`Código de Confirmação: ${confirmationCode || "Não informado"}`, 20, 50);

    doc.text('Especialidades Escolhidas:', 20, 60);
    let yOffset = 70;
    
    if (saturdaySpecialties.length > 0) {
      doc.text('Sábado:', 20, yOffset);
      yOffset += 10;
      saturdaySpecialties.forEach((spec) => {
        doc.text(`${spec.name} - ${spec.time}`, 20, yOffset);
        yOffset += 10;
      });
    }
    
    if (sundaySpecialties.length > 0) {
      doc.text('Domingo:', 20, yOffset);
      yOffset += 10;
      sundaySpecialties.forEach((spec) => {
        doc.text(`${spec.name} - ${spec.time}`, 20, yOffset);
        yOffset += 10;
      })
    }
      doc.save('cartao_confirmacao.pdf'); // Gera o PDF e faz o download
    }

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

      <button
        onClick={handleDownloadPDF}
        className="download-pdf-button"
      >
        Baixar Cartão de Confirmação
      </button>
    </div>
  );
};

export default ConfirmationPage;
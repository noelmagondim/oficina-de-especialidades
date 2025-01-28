import { useEffect, useState } from 'react';
import '/src/styles/ConfirmationPage.css';

const ConfirmationPage: React.FC = () => {
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

  useEffect(() => {
    // Recupera o código do localStorage
    const code = localStorage.getItem('confirmationCode');
    
    // Se o código não for encontrado, você pode lidar com a situação, mas
    // como garantimos que o código foi gerado corretamente na página 3,
    // isso não deve ocorrer.
    if (code) {
      setConfirmationCode(code);
    }
  }, []);

  return (
    <div className="confirmation-container">
      <h1>Inscrição realizada com sucesso!</h1>
      {confirmationCode ? (
        <p>Seu código de confirmação é: <strong>{confirmationCode}</strong></p>
      ) : (
        <p>O código de confirmação não foi encontrado. Tente novamente.</p>
      )}
    </div>
  );
};

export default ConfirmationPage;

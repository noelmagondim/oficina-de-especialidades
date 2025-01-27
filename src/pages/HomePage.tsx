import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
    <h1>Bem-vindo ao Nosso Site!</h1>
    <p>Conheça mais sobre nossa feira de especialidades e inscreva-se para participar.</p>
    <button
      onClick={() => navigate('/registration')}
    >
      Iniciar Inscrição
    </button>
  </div>
  );
};

export default HomePage;
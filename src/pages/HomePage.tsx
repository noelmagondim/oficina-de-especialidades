import { useNavigate } from "react-router-dom";
import "/src/styles/HomePage.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="title">Realize sua inscrição aqui!</h1>
      <p className="description">Inscreva-se para participar</p>
      <button
        onClick={() => navigate('/registration')}
        className="signup-button"
      >
        Iniciar Inscrição
      </button>
    </div>
  );
};

export default HomePage;


import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
    <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Nosso Site!</h1>
    <p className="text-lg mb-6">Conheça mais sobre nossa feira de especialidades e inscreva-se para participar.</p>
    <button
      onClick={() => navigate('/registration')}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
    >
      Iniciar Inscrição
    </button>
  </div>
  );
};

export default HomePage;
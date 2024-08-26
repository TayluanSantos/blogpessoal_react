import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const {handleLogout} = useContext(AuthContext)
  
  function logout(){
    handleLogout();
    alert("Usuário foi desconectado com sucesso!");
    navigate("/");
  }


  return (
    <div className="flex justify-between  bg-indigo-900 px-20 py-3 text-white">
        <div className="text-2xl font-bold uppercase">
            <Link to='/home'>Blog Pessoal</Link>
        </div>
        <div>
            <ul className="flex *:px-1">
              <li className="hover:underline cursor-pointer">Postagem</li>
              <li className="hover:underline cursor-pointer">Tema</li>
              <li className="hover:underline cursor-pointer">Cadastrar Tema</li>
              <li className="hover:underline cursor-pointer">Perfil</li>
              <li className="hover:underline cursor-pointer"><Link to ='' onClick={logout}>Sair </Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
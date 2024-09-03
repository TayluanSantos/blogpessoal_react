import { createContext, ReactNode, useState } from "react";
import UsuarioLogin from "../model/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

interface AuthContextProps {
    usuario: UsuarioLogin;

    handleLogin(usuario:UsuarioLogin): Promise<void> 
    handleLogout():void;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode 
}
export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({children}:AuthProviderProps){
    const [usuario,setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })
    const [isLoading,setIsLoading] = useState(false);

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true);
        try {
            await login(`/usuarios/logar`,usuarioLogin,setUsuario);
            ToastAlerta("Usuário autenticado com sucesso!","sucesso")
        } catch (error) {
            ToastAlerta("Os dados do usuário estão inconsistentes!","erro")
        }
        setIsLoading(false);
    }
  function handleLogout(){
    setUsuario({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })
  }
  return (
    <AuthContext.Provider value={{usuario,handleLogin,handleLogout,isLoading}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
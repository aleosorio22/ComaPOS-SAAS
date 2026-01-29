import { createContext, useContext, useEffect, useState } from "react";
import { supabase, MostrarUsuarios, InsertarEmpresa, InsertarAdmin, MostrarTipoDocumentos, MostrarRolesXnombre } from "../index";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if(session==null){
        setUser(null);
      }
      else{
        setUser(session?.user);
        //console.log("session",session.user)
        insertarDatos(session?.user.id, session?.user.email);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const insertarDatos = async (auth_id, correo) =>{

    const response = await MostrarUsuarios({auth_id : auth_id});
    if(response){
      return;
    }
    else{
      const responseEmpresa = await InsertarEmpresa({
        auth_id : auth_id
      })
      const responseTipoDoc = await MostrarTipoDocumentos({empresa_id : responseEmpresa?.empresa_id});
      console.log("responseTipoDoc", responseTipoDoc)

      const responseRol = await MostrarRolesXnombre({rol_nombre : "superadmin"});

      const pUser = {
        tipo_doc_id: responseTipoDoc[0].tipo_doc_id,
        rol_id: responseRol.rol_id,
        correo: correo,
        fecharegistro: new Date(),
        auth_id: auth_id,
      }
      
      await InsertarAdmin(pUser);

    }
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
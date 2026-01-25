
import {ConfiguracionesTemplate, MostrarModulos, Spinner1, useModulosStore} from "../index"
import { useQuery } from "@tanstack/react-query";

export function Configuraciones() {
  const {mostrarModulos} = useModulosStore();

  const { isLoading, error} = useQuery({
    queryKey: ["mostrar modulos"], 
    queryFn: mostrarModulos,
  })
  if (isLoading){
    return <Spinner1 />;
  }
  if (error){
    return <span>Error: {error.message}</span>
  }
  return (
      <ConfiguracionesTemplate />
  ); 
}
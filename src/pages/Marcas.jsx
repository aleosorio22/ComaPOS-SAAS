import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { MarcasTemplate, Spinner1, useEmpresaStore, useMarcaStore } from "../index";


export function Marcas() {
  const {mostrarMarca, buscarMarca, buscador} = useMarcaStore();
  const {dataempresa} = useEmpresaStore();
  
  // Un solo query que maneja tanto mostrar todos como buscar
  const {isLoading, error, isFetching} = useQuery({
    queryKey: ["mostrar marcas", dataempresa?.empresa_id, buscador], 
    queryFn: () => {
      // Si hay texto en el buscador, buscar; si no, mostrar todos
      if(buscador.trim() !== "") {
        return buscarMarca({empresa_id: dataempresa?.empresa_id, descripcion: buscador});
      } else {
        return mostrarMarca({empresa_id: dataempresa?.empresa_id});
      }
    },
    enabled: !!dataempresa?.empresa_id,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 0
  })

  
  // Solo mostrar spinner en la carga inicial (cuando no hay empresa_id)
  if(isLoading && !dataempresa?.empresa_id) return <Spinner1 />;
  if(error) return <span>Error: {error.message}</span>;
  
  return (
      <MarcasTemplate />
  );
}

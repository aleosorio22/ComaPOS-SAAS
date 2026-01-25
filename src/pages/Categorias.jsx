import styled from "styled-components";
import { CategoriasTemplate } from "../components/templates/CategoriasTemplate";
import { useQuery } from "@tanstack/react-query";
import { Spinner1, useCategoriaStore, useEmpresaStore } from "../index";


export function Categorias() {
  const {mostrarCategorias, buscarCategorias, buscador} = useCategoriaStore();
  const {dataempresa} = useEmpresaStore();
  
  // Un solo query que maneja tanto mostrar todos como buscar
  const {isLoading, error, isFetching} = useQuery({
    queryKey: ["categorias", dataempresa?.empresa_id, buscador], 
    queryFn: () => {
      // Si hay texto en el buscador, buscar; si no, mostrar todos
      if(buscador.trim() !== "") {
        return buscarCategorias({empresa_id: dataempresa?.empresa_id, descripcion: buscador});
      } else {
        return mostrarCategorias({empresa_id: dataempresa?.empresa_id});
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
      <CategoriasTemplate />
  );
}

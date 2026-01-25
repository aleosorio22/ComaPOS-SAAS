import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { ProductosTemplate, Spinner1, useCategoriaStore, useEmpresaStore, useProductosStore, useSucursalesStore } from "../index";
import Swal from "sweetalert2";


export function Productos() {
  const {mostrarCategorias} = useCategoriaStore();
  const {mostrarSucursales} = useSucursalesStore()
  const {mostrarProductos, buscarProductos, buscador, setRefetch} = useProductosStore();
  const {dataempresa} = useEmpresaStore();
  
  // 
  const {isLoading, error, refetch} = useQuery({
    queryKey: ["mostrar Productos", dataempresa?.empresa_id], 
    queryFn: () => 
      mostrarProductos({empresa_id: dataempresa?.empresa_id, refetchs:refetch})
    ,
    enabled: !!dataempresa?.empresa_id,
    refetchOnWindowFocus: false,
  });

  useQuery({ 
    queryKey: ["buscar productos", buscador],
    queryFn: () => buscarProductos({empresa_id: dataempresa?.empresa_id, buscador: buscador}),
    enabled: !!dataempresa?.empresa_id,
    refetchOnWindowFocus: false,
  });
  
  //mostrar sucursales
  useQuery({
    queryKey: ["mostrar sucursales", dataempresa?.empresa_id],
    queryFn: () => mostrarSucursales({empresa_id: dataempresa?.empresa_id}),
    enabled: !!dataempresa?.empresa_id,
    refetchOnWindowFocus: false
  })

  //mostrar categorias
  useQuery({
    queryKey: ["mostrar categorias", dataempresa?.empresa_id],
    queryFn: () => mostrarCategorias({empresa_id: dataempresa?.empresa_id}),
    enabled: !!dataempresa?.empresa_id,
    refetchOnWindowFocus: false
  })

  // Solo mostrar spinner en la carga inicial (cuando no hay empresa_id)
  if (isLoading) {
    return <Spinner1 />;
  }
  if(error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  } 
  
  return (
      <ProductosTemplate />
  );
}

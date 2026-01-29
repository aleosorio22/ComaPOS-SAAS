import styled from "styled-components";
import { ClientesProveedoresTemplate, useClientesProveedoresStore, useEmpresaStore } from "../index";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export function ClientesProveedores() {
  const location = useLocation();
  const { dataempresa} = useEmpresaStore();
  const {tipo, mostrarCP, buscarCP, buscador} = useClientesProveedoresStore();
  const {isLoading} = useQuery({
    queryKey: ["Mostrar clientes y proveedores", { empresa_id: dataempresa?.empresa_id, tipo: location.pathname==="/configuracion/clientes"?"Cliente":"Proveedor" }],
    queryFn:()=> mostrarCP({ empresa_id: dataempresa?.empresa_id, cp_tipo: location.pathname==="/configuracion/clientes"?"Cliente":"Proveedor"}),
    enabled: !!dataempresa,
    refetchOnWindowFocus: false,
  })
  //buscador
  useQuery({
    queryKey: ["Buscar clientes y proveedores", buscador],
    queryFn:()=> buscarCP({ empresa_id: dataempresa?.empresa_id, cp_tipo: location.pathname==="/configuracion/clientes"?"Cliente":"Proveedor", buscador: buscador}),
    enabled: !!dataempresa,
    refetchOnWindowFocus: false,
  })
  if(isLoading){
    return <span>cargando...</span>
  }
  return (
    <ClientesProveedoresTemplate />
  );
}



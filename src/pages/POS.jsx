import { useQuery } from "@tanstack/react-query";
import {POSTemplate, SpinnerSecundario, useAlmacenesStore, useEmpresaStore, useProductosStore, useSucursalesStore, useVentasStore} from "../index"



export function POS() {
  const {dataempresa} = useEmpresaStore();
  const {buscarProductos, buscador} = useProductosStore();
  const {mostrarAlmacenXSucursal} = useAlmacenesStore();
  const {mostrarVentasXSucursal} = useVentasStore();
  const {sucursalesAsignadasItemSelect, dataSucursales} = useSucursalesStore();
  const {productosItemSelect} = useProductosStore();
  useQuery({ 
    queryKey: ["buscar productos", buscador],
    queryFn: () => buscarProductos({empresa_id: dataempresa?.empresa_id, buscador: buscador}),
    enabled: !!dataempresa?.empresa_id,
    refetchOnWindowFocus: false,
  });
  const {isLoading, error} = useQuery({
    queryKey: ["mostrar almacen x sucursal", sucursalesAsignadasItemSelect?.sucursal_id],
    queryFn: () => mostrarAlmacenXSucursal({sucursal_id: sucursalesAsignadasItemSelect?.sucursal_id}),
    enabled: !!sucursalesAsignadasItemSelect?.sucursal_id,
  });

  if(isLoading){
    return <SpinnerSecundario texto="Cargando ventas......"/>;
  }  
  
  if(error){
    return <span>Error loading data...{error.message}</span>
  }
  return <POSTemplate />;
}


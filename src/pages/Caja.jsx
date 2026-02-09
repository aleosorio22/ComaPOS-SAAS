import { useQuery } from "@tanstack/react-query";
import { AperturarCaja, CajaTemplate, SpinnerSecundario, useAlmacenesStore, useCajaStore, useCierreCajaStore, useEmpresaStore, useSucursalesStore } from "../index";

export function Caja() {
  const {mostrarAlmacenXSucursal} = useAlmacenesStore();
  const {sucursalesAsignadasItemSelect, dataSucursales} = useSucursalesStore();
  const {dataempresa} = useEmpresaStore();
  const {mostrarCajaXSucursal} = useCajaStore();
  const {mostrarCierreCaja} = useCierreCajaStore();
  const {isLoading, error} = useQuery({
    queryKey: ["mostrar almacen x sucursal", sucursalesAsignadasItemSelect?.sucursal_id],
    queryFn: () => mostrarAlmacenXSucursal({sucursal_id: sucursalesAsignadasItemSelect?.sucursal_id}),
    enabled: !!sucursalesAsignadasItemSelect?.sucursal_id,
  });
  //mostrar cajas x sucursal
  const {data: dataCaja} = useQuery({
    queryKey: ["mostrar caja x sucursal", {sucursal_id: sucursalesAsignadasItemSelect?.sucursal_id, empresa_id: dataempresa?.empresa_id}],
    queryFn: () => mostrarCajaXSucursal({sucursal_id: sucursalesAsignadasItemSelect?.sucursal_id, empresa_id: dataempresa?.empresa_id}),
    enabled: !!sucursalesAsignadasItemSelect?.sucursal_id,
    refetchOnWindowFocus: false,
  })
  //mostrar cierres de caja
  const {isLoading: isLoadingCierreCaja, data: dataCierreCaja, error: errorCierreCaja} = useQuery({
    queryKey: ["mostrar cierres de caja", { empresa_id: dataempresa?.empresa_id, sucursal_id: sucursalesAsignadasItemSelect?.sucursal_id, caja_id: dataCaja?.caja_id}],
    queryFn: () => mostrarCierreCaja({empresa_id: dataempresa?.empresa_id, sucursal_id: sucursalesAsignadasItemSelect?.sucursal_id, caja_id: dataCaja?.caja_id}),
    enabled: !!dataCaja?.caja_id,
  })
  //mostrar spinner mientras carga la información de caja y cierres de caja
  if(isLoadingCierreCaja){
    return <SpinnerSecundario texto="cargando cierres de caja"/>
  }
  if (errorCierreCaja){
    return <span>Error al cargar cierres de caja{errorCierreCaja.message}</span>
  }

  //mostrar aperturar caja si no hay datos de cierre de caja
  if(!dataCierreCaja){
    if(dataCierreCaja === null){
      return <AperturarCaja/>
    }
  }
  // mostrar Caja si hay datos de caja
  if(dataCierreCaja != null){
    return <CajaTemplate/>
  }
}


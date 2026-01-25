import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,
  ConvertirCapitalize,
  useProductosStore,
  useEmpresaStore,
  ContainerSelector,
  Switch1,
  Selector,
  useSucursalesStore,
  ListaDesplegable,
  useCategoriaStore,
  Checkbox1,
  Generarcodigo,
  Btngenerarcodigo,
  useAlmacenesStore
} from "../../../index";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {Device} from "../../../styles/breakpoints"
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export function RegistrarProductos({
  onClose,
  dataSelect,
  accion,
  setIsExploding,
}) {
  //validar checkboxes 
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [sevendepor, setSevendepor] = useState("UNIDAD");

  // Cargar datos al editar
  useEffect(() => {
    if (accion === "Editar" && dataSelect?.sevende_por) {
      // Cargar tipo de venta
      if (dataSelect.sevende_por === "GRANEL") {
        setIsChecked1(false);
        setIsChecked2(true);
        setSevendepor("GRANEL");
      } else {
        setIsChecked1(true);
        setIsChecked2(false);
        setSevendepor("UNIDAD");
      }
      
      // Cargar estado de inventarios
      if (dataSelect.maneja_inventarios) {
        setStateInventarios(true);
        setStateEnableStock(true);
      } else {
        setStateEnableStock(false);
      }
    }
  }, [accion, dataSelect]);
  
  const handleCheckboxChange = (checkboxNumber) => {
    if(checkboxNumber === 1){
      setIsChecked1(true)
      setIsChecked2(false)
      setSevendepor("UNIDAD")
    } else {
      setIsChecked1(false)
      setIsChecked2(true) 
      setSevendepor("GRANEL")
    }
  }
  //
  const { dataProductos, insertarProductos, editarProductos, refetchs } = useProductosStore();
  const { dataempresa } = useEmpresaStore();
  const {insertarStockAlmacenes, mostrarAlmacen, dataAlmacen, eliminarAlmacen} = useAlmacenesStore();
  const [stateInventarios, setStateInventarios] = useState(false);
  const [stateEnableStock, setStateEnableStock] = useState(false);
  const {sucursalesItemSelect, dataSucursales, selectSucursal} = useSucursalesStore();
  const [stateSucursalesLista, setStateSucursalesLista] = useState(false);
  const {dataCategorias, selectCategoria, categoriaItemSelect} = useCategoriaStore();
  const [stateCategoriasLista, setStateCategoriasLista] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm();

  const { isPending, mutate: doInsertar } = useMutation({
    mutationFn: insertar,
    mutationKey: "insertar Productos",
    onError: (err) => console.log("El error", err.message),
    onSuccess: () => cerrarFormulario(),
  });

  const {data: queryDataAlmacen, error, isLoading, refetch} = useQuery({
    queryKey: ["mostrar stock almacen x sucursales", dataSelect?.producto_id, sucursalesItemSelect?.sucursal_id],
    queryFn: () => mostrarAlmacen({producto_id : dataSelect?.producto_id, sucursal_id: sucursalesItemSelect?.sucursal_id}),
    enabled: !!dataSelect?.producto_id && !!sucursalesItemSelect?.sucursal_id && stateInventarios && accion === "Editar",
    refetchOnWindowFocus: false
  })

  //#region Cargar datos de stock cuando queryDataAlmacen cambia
  useEffect(() => {
    if (queryDataAlmacen && accion === "Editar") {
      reset({
        stock: queryDataAlmacen.stock || "",
        stock_minimo: queryDataAlmacen.stock_minimo || ""
      }, {
        keepDefaultValues: true
      });
    }
  }, [queryDataAlmacen, accion, reset]);
  //#endregion
  const handlesub = (data) => {
    doInsertar(data);
  };
  const cerrarFormulario = () => {
    onClose();
    setIsExploding(true);
  };

  
  //#region validar la data que se envia y la accion (editar o insertar)
  async function insertar(data) {
    validarDatosVacios(data);
    if (accion === "Editar") {
      const p = {
        _producto_id : dataSelect.producto_id,
        _producto_nombre : ConvertirCapitalize(data.producto_nombre),
        _precio_venta : parseFloat(data.precio_venta),
        _precio_compra : parseFloat(data.precio_compra),
        _categoria_id : categoriaItemSelect.categoria_id,
        _codigo_barras : data.codigo_barras,
        _codigo_interno : data.codigo_interno,
        _empresa_id : dataempresa.empresa_id,
        _sevende_por : sevendepor, 
        _maneja_inventarios : stateInventarios
      };
      await editarProductos(p); 
      if(stateInventarios){
        if(dataAlmacen == null){
         const palmacenes = {
            sucursal_id: sucursalesItemSelect.sucursal_id,
            producto_id: dataSelect.producto_id,
            stock: parseFloat(data.stock),
            stock_minimo: parseFloat(data.stock_minimo)
          } 
          await insertarStockAlmacenes(palmacenes);
        }
      }
    } else {
      const p = {
        _producto_nombre : ConvertirCapitalize(data.producto_nombre),
        _precio_venta : parseFloat(data.precio_venta),
        _precio_compra : parseFloat(data.precio_compra),
        _categoria_id : categoriaItemSelect.categoria_id,
        _codigo_barras : data.codigo_barras,
        _codigo_interno : data.codigo_interno,
        _empresa_id : dataempresa.empresa_id,
        _sevende_por : sevendepor, 
        _maneja_inventarios : stateInventarios,
        _maneja_multiprecios : false
      };
      const id_producto_nuevo = await insertarProductos(p);
      
      if(stateInventarios){
        const palmacenes = {
          sucursal_id: sucursalesItemSelect.sucursal_id,
          producto_id: id_producto_nuevo,
          stock: parseFloat(data.stock),
          stock_minimo: parseFloat(data.stock_minimo)
        }
        await insertarStockAlmacenes(palmacenes);
      }    
    }
  }
  //#endregion 

  //#region validar check inventarios
  function checkUseInventarios(){
  
    if (accion === "Editar" ){
      if (dataAlmacen){
       if (stateInventarios) {
          Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Si desactiva esta opción se eliminará el stock asociado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
          }).then(async (result) => {
            if (result.isConfirmed) {
              setStateInventarios(false);
              await eliminarAlmacen({almacen_id: queryDataAlmacen?.almacen_id});

            }
          });  
        } else {
          setStateInventarios(true);
        } 
      } else {
        setStateInventarios(!stateInventarios);
      }
    }else {
      if (!stateInventarios && !sucursalesItemSelect?.sucursal_id) {
        Swal.fire({
          title: "Atención",
          text: "Debe seleccionar una sucursal antes de controlar stock",
          icon: "warning",
          confirmButtonText: "Entendido"
        });
        return;
      }
      setStateInventarios(!stateInventarios);
    }
    
  }
  //#endregion
  //#region funcion de validar datos vacios
  function validarDatosVacios(data) {
    // Precios (si vienen como string)
    if (!data.precio_venta || data.precio_venta.toString().trim() === "") {
      data.precio_venta = 0;
    }
    if (!data.precio_compra || data.precio_compra.toString().trim() === "") {
      data.precio_compra = 0;
    }
    // Códigos
    if (!data.codigo_barras || data.codigo_barras.toString().trim() === "") {
      data.codigo_barras = null;
    }
    if (!data.codigo_interno || data.codigo_interno.toString().trim() === "") {
      data.codigo_interno = null;
    }

    if(stateInventarios){
      if(!dataAlmacen){
        if (!data.stock || data.stock.toString().trim() === "") {
          data.stock = 0;
        }
        if (!data.stock_minimo || data.stock_minimo.toString().trim() === "") {
          data.stock_minimo = 0;
        }
      }
      
    }

    return data;
  }
  

  //#endregion

  //#region generar codigos
  function generarCodigoBarras(){
    // Si está editando, usar el ID del producto actual
    // Si está registrando, obtener el último ID de la lista
    let productoId = 0;
    if (accion === "Editar" && dataSelect?.producto_id) {
      productoId = dataSelect.producto_id;
    } else if (dataProductos && Array.isArray(dataProductos) && dataProductos.length > 0) {
      productoId = Math.max(...dataProductos.map(p => p.producto_id || 0));
    }
    const nuevoCodigo = Generarcodigo({ producto_id: productoId });
    setValue('codigo_barras', nuevoCodigo);
  }
  function generarCodigoInterno(){
    let productoId = 0;
    if (accion === "Editar" && dataSelect?.producto_id) {
      productoId = dataSelect.producto_id;
    } else if (dataProductos && Array.isArray(dataProductos) && dataProductos.length > 0) {
      productoId = Math.max(...dataProductos.map(p => p.producto_id || 0));
    }
    const nuevoCodigo = Generarcodigo({ producto_id: productoId });
    setValue('codigo_interno', nuevoCodigo);
  }
  //#endregion

  return (
    <Container>
      {isPending ? (
        <span>...🔼</span>
      ) : (
        <div className="sub-contenedor">
          <div className="headers">
            <section>
              <h1>
                {accion == "Editar"
                  ? "Editar Productos"
                  : "Registrar nuevo Producto"}
              </h1>
            </section>

            <section>
              <span onClick={()=>{
                if(refetchs) refetchs();
                onClose();
              }}>
                x
              </span>
            </section>
          </div>
          <form className="formulario" onSubmit={handleSubmit(handlesub)}>
              <section className="seccion1">
                <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.producto_nombre || ""}
                    type="text"
                    placeholder="Nombre"
                    {...register("producto_nombre", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Productos</label>
                  {errors.producto_nombre?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.precio_venta || ""}
                    step="0.01"
                    type="number"
                    placeholder="Precio Venta"
                    {...register("precio_venta")}
                  />
                  <label className="form__label">Precio Venta</label>
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.precio_compra || ""}
                    step="0.01"
                    type="number"
                    placeholder="Precio Compra"
                    {...register("precio_compra")}
                  />
                  <label className="form__label">Precio Compra</label>
                </InputText>
              </article> 
              <article className="contentPadregenerar">
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.codigo_barras || ""}
                    type="text"
                    placeholder="Codigo de barras"
                    {...register("codigo_barras", {
                      required: false,
                    })}
                  />
                  <label className="form__label">Codigo de barras</label>
                </InputText>
                <ContainerBtngenerar>
                  <Btngenerarcodigo 
                    titulo="Generar"
                    funcion={generarCodigoBarras}
                  />
                </ContainerBtngenerar>
              </article>
              <article className="contentPadregenerar">
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.codigo_interno || ""}
                    type="text"
                    placeholder="Codigo interno"
                    {...register("codigo_interno", {
                      required: false,
                    })}
                  />
                  <label className="form__label">Codigo interno</label>
                  {errors.codigo_interno?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
                
                <ContainerBtngenerar>
                  <Btngenerarcodigo 
                    titulo="Generar"
                    funcion={generarCodigoInterno}
                  />
                </ContainerBtngenerar>
              </article>
              
              </section>
              <section className="seccion2">

                <label>Se vende por</label>
                <ContainerSelector>
                  <label>Unidad</label>
                  <Checkbox1 isChecked={isChecked1} onChange={() => handleCheckboxChange(1)}/>
                  <label>Granel</label>
                  <Checkbox1 isChecked={isChecked2} onChange={() => handleCheckboxChange(2)} />
                </ContainerSelector>

                <ContainerSelector>
                      <label>Categoría</label>
                      <Selector state={stateCategoriasLista}
                        funcion={() => setStateCategoriasLista(!stateCategoriasLista)}
                        color={v.colorPrincipal} 
                        texto2={categoriaItemSelect?.categoria_nombre || "Seleccionar sucursal"}
                      />
                      <ListaDesplegable funcion={selectCategoria}
                        state={stateCategoriasLista}
                        data={dataCategorias}
                        campoMostrar="categoria_nombre"
                        top="4rem" 
                        setState={()=>
                          setStateCategoriasLista(!stateCategoriasLista)
                        }
                      />
                    </ContainerSelector>
                <ContainerSelector> 
                <label>Controlar Stock</label>
                <Switch1 
                  state={stateInventarios} 
                  setState={checkUseInventarios}
                />
              

                </ContainerSelector>
                {
                  stateInventarios && (
                  <ContainerStock>
                    
                    <ContainerSelector>
                      <label>Sucursal</label>
                      <Selector state={stateSucursalesLista}
                        funcion={() => setStateSucursalesLista(!stateSucursalesLista)}
                        color={v.colorPrincipal} 
                        texto2={sucursalesItemSelect?.nombre || "Seleccionar sucursal"}
                      />
                      <ListaDesplegable refetch ={refetch}
                        funcion={selectSucursal}
                        state={stateSucursalesLista}
                        data={dataSucursales || []}
                        campoMostrar="nombre"
                        top="4rem" 
                        setState={()=>
                          setStateSucursalesLista(!stateSucursalesLista)
                        }
                      />
                    </ContainerSelector>
                    {
                      stateEnableStock && (
                      <ContainerMensajeStock>
                        <span>Para editar el stock, dirijase al modulo de Kardex</span>
                      </ContainerMensajeStock>
                    )}
                    
                    <article>
                  <InputText icono={<v.iconoflechaderecha />}>
                    <input disabled = {stateEnableStock}
                      className="form__field"
                      defaultValue={dataAlmacen?.stock || ""}
                      step="0.01"
                      type="number"
                      placeholder="Stock"
                      {...register("stock")}
                    />
                    <label className="form__label">Stock</label>
                  </InputText>
                  </article>
                    <article>
                  <InputText icono={<v.iconoflechaderecha />}>
                    <input disabled = {stateEnableStock}
                      className="form__field"
                      defaultValue={dataAlmacen?.stock_minimo || ""}
                      step="0.01"
                      type="number"
                      placeholder="Stock Mínimo"
                      {...register("stock_minimo")}
                    />
                    <label className="form__label">Stock Mínimo</label>
                  </InputText>
                  </article>
                  </ContainerStock>)
                }
                
              </section>
              <Btn1
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor={v.colorPrincipal}
                color={v.colorTerciario}
              />
          </form>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    position: relative;
    width: 100%;
    max-width: 90%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    height: calc(100vh -  20px);
    overflow-y: auto;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;

      @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }

      .seccion1, .seccion2{
        gap:20px;
        display: flex;
        flex-direction: column;
      }
      .contentPadregenerar{
        position: relative;
      }
    }
  }
`;

const ContainerBtngenerar = styled.div`
  position: absolute;
  right: 0%;
  top: 10%;

`;

const ContainerStock = styled.div`
  border: 1px solid rgba(240,104,46,0.9);
  display: flex;
  border-radius: 12px;
  padding: 12px;
  flex-direction: column;
  background-color: rgba(240,127,46,0.05)
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;

  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;

const ContainerMensajeStock = styled.div`
  text-align: center;
  color: #856404;
  background-color: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 10px;
  padding: 10px 15px;
  margin: 10px 0;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(255, 193, 7, 0.2);
`
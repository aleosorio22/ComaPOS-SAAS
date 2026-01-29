import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,
  useClientesProveedoresStore,
  ConvertirTitleCase,
} from "../../../index";
import { useForm } from "react-hook-form";
import { CirclePicker } from "react-color";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useMutation } from "@tanstack/react-query";

export function RegistrarClientesProveedores({
  onClose,
  dataSelect,
  accion,
  setIsExploding,
}) {
  const {tipo, insertarCP, editarCP} = useClientesProveedoresStore();
  const { dataempresa } = useEmpresaStore();
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isPending, mutate: doInsertar } = useMutation({
    mutationFn: insertar,
    mutationKey: "insertar clientes proveedores mutation",
    onError: (err) => console.log("El error", err.message),
    onSuccess: () => cerrarFormulario(),
  });
  const handlesub = (data) => {
    doInsertar(data);
  };
  const cerrarFormulario = () => {
    onClose();
    setIsExploding(true);
  };
  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        _cp_id: dataSelect.cp_id,
        _cp_nombres: ConvertirTitleCase(data.cp_nombres),
        _empresa_id: dataempresa.empresa_id,
        _cp_direccion: data.cp_direccion,
        _cp_telefono: data.cp_telefono,
        _cp_email: data.cp_email,
        _cp_id_nacional: data.cp_id_nacional,
        _cp_id_fiscal: data.cp_id_fiscal,
        _cp_tipo: tipo
      };
      await editarCP(p);
    } else {
      const p = {
        _cp_nombres: ConvertirTitleCase(data.cp_nombres),
        _empresa_id: dataempresa.empresa_id,
        _cp_direccion: data.cp_direccion,
        _cp_telefono: data.cp_telefono,
        _cp_email: data.cp_email,
        _cp_id_nacional: data.cp_id_nacional,
        _cp_id_fiscal: data.cp_id_fiscal,
        _cp_tipo: tipo
      };

      await insertarCP(p);
    }
  }
  
  useEffect(() => {
    if (accion === "Editar") {
    }
  }, []);
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
                  ? "Editar " + tipo
                  : "Registrar nuevo " + tipo}
              </h1>
            </section>

            <section>
              <span onClick={onClose}>x</span>
            </section>
          </div>
          <form className="formulario" onSubmit={handleSubmit(handlesub)}>
            <section className="form-subcontainer">
              {/* nombres */}
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.cp_nombres}
                    type="text"
                    placeholder={tipo}
                    {...register("cp_nombres", {
                      required: true,
                    })}
                  />
                  <label className="form__label">{tipo}</label>
                  {errors.cp_nombres?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              {/* direccion */}
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.cp_direccion}
                    type="text"
                    placeholder="dirección"
                    {...register("cp_direccion", {
                      required: true,
                    })}
                  />
                  <label className="form__label">dirección</label>
                  {errors.cp_direccion?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              {/* teléfono */} 
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.cp_telefono}
                    type="text"
                    placeholder="teléfono"
                    {...register("cp_telefono")}
                  />
                  <label className="form__label">teléfono</label>
                </InputText>
              </article>   
              {/* cp_email */} 
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.cp_email}
                    type="text"
                    placeholder="email"
                    {...register("cp_email")}
                  />
                  <label className="form__label">email</label>
                </InputText>
              </article> 
              {/* cp_id_nacional */} 
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.cp_id_nacional}
                    type="text"
                    placeholder="Identificador nacional"
                    {...register("cp_id_nacional")}
                  />
                  <label className="form__label">Documento de identificacion nacional</label>
                </InputText>
              </article>  
              {/* cp_id_fiscal */} 
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.cp_id_fiscal}
                    type="text"
                    placeholder="Identificador fiscal"
                    {...register("cp_id_fiscal")}
                  />
                  <label className="form__label">Documento de identificacion fiscal</label>
                </InputText>
              </article>                                   
              <Btn1
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor={v.colorPrincipal}
                color={v.colorTerciario}
              />
            </section>
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
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

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
      .form-subcontainer {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
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
const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  border: 2px dashed #f9d70b;
  border-radius: 5px;
  background-color: rgba(249, 215, 11, 0.1);
  padding: 8px;
  position: relative;
  gap: 3px;
  margin-bottom: 8px;

  .ContentImage {
    overflow: hidden;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  input {
    display: none;
  }
`;
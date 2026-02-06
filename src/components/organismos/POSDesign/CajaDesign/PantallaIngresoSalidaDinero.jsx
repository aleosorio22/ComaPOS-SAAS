import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Btn1, InputText2, useCierreCajaStore, useEmpresaStore } from "../../../../index";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Device } from "../../../../styles/breakpoints";
import {v} from "../../../../styles/variables";

export function PantallaIngresoSalidaDinero() {
    const {tipoRegistro, setStateCierreCaja} = useCierreCajaStore();
    const [startDate, setStartDate] = useState(new Date());
    const [selectedCategoria, setSelectedCategoria] = useState("");
    const {dataempresa} = useEmpresaStore();
    
    const categorias = ["Gastos operativos", "Pago de servicios", "Compra de inventario", "Otros"];
    
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleCancelar = () => {
        setStateCierreCaja(false);
    };

    return (
        <Overlay>
            <ModalContainer>
                <ModalHeader>
                    <div className="header-title">
                        <Icon icon={tipoRegistro === "Ingreso" ? "mdi:cash-plus" : "mdi:cash-minus"} className="icon-header" />
                        <h2>Registrar {tipoRegistro === "Ingreso" ? "Ingreso" : "Egreso"}</h2>
                    </div>
                    <button className="btn-close" onClick={handleCancelar}>
                        <Icon icon="fa7-solid:xmark" />
                    </button>
                </ModalHeader>

                <ModalBody>
                    <div className="fecha-registro">
                        <span>Fecha de registro: {formatDate(startDate)}</span>
                    </div>

                    <FormRow>
                        <FormGroup>
                            <Label>Categoría</Label>
                            <div className="input-with-button">
                                <InputText2>
                                    <select 
                                        className="form__field"
                                        value={selectedCategoria}
                                        onChange={(e) => setSelectedCategoria(e.target.value)}
                                    >
                                        <option value="">Seleccionar categoría</option>
                                        {categorias.map((cat, index) => (
                                            <option key={index} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </InputText2>
                                <IconButton>
                                    <Icon icon="fa7-solid:circle-plus" />
                                </IconButton>
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <Label>{tipoRegistro === "Ingreso" ? "Monto que ingresó" : "Monto que salió"}</Label>
                            <InputWithPrefix>
                                <span className="prefix">{dataempresa?.currency}</span>
                                <InputText2>
                                    <input 
                                        className="form__field"
                                        type="number" 
                                        placeholder="00.00"
                                        step="0.01"
                                    />
                                </InputText2>
                            </InputWithPrefix>
                        </FormGroup>
                    </FormRow>

                    <FormGroup>
                        <Label>Motivo</Label>
                        <InputText2>
                            <input 
                                className="form__field"
                                type="text" 
                                placeholder={tipoRegistro === "Ingreso" ? "Motivo del ingreso" : "Motivo del egreso"}
                            />
                        </InputText2>
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            {tipoRegistro === "Ingreso" ? "Recibió de" : "Entregó a"}
                        </Label>
                        <InputText2>
                            <input 
                                className="form__field"
                                type="text" 
                                placeholder={tipoRegistro === "Ingreso" ? "¿A quién recibe el dinero?" : "¿A quién entregara el dinero?"}
                            />
                        </InputText2>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Btn1 
                        titulo="Cancelar"
                        bgcolor="transparent"
                        color={({ theme }) => theme.text}
                        border="2px"
                        funcion={handleCancelar}
                        icono={<Icon icon="fa7-solid:xmark" />}
                    />
                    <Btn1 
                        titulo={tipoRegistro === "Ingreso" ? "Registrar Ingreso" : "Registrar Egreso"}
                        bgcolor={v.colorPrincipal}
                        color="#FFFFFF"
                        icono={<Icon icon="mdi:content-save" />}
                    />
                </ModalFooter>
            </ModalContainer>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
`;

const ModalContainer = styled.div`
    background-color: ${({ theme }) => theme.bgcards};
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 800px;
    max-height: 95vh;
    overflow: auto;
    display: flex;
    flex-direction: column;    
    /* Ocultar scrollbar pero mantener funcionalidad */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE y Edge */
    
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari y Opera */
    }`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 2px solid ${({ theme }) => theme.bg2};
    
    .header-title {
        display: flex;
        align-items: center;
        gap: 12px;
        .icon-header {
            font-size: 2em;
            color: ${({ theme }) => theme.colorPrincipal};
        }
        h2 {
            margin: 0;
            font-size: 1.5em;
            font-weight: 600;
            color: ${({ theme }) => theme.text};
        }
    }
    
    .btn-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s;
        
        svg {
            font-size: 1.5em;
            color: ${({ theme }) => theme.colorSubtitle};
        }
        
        &:hover {
            background-color: ${({ theme }) => theme.bg2};
        }
    }
`;

const ModalBody = styled.div`
    padding: 15px 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    .fecha-registro {
        padding: 12px 16px;
        background-color: ${({ theme }) => theme.bg2};
        border-radius: 8px;
        
        span {
            font-weight: 600;
            color: ${({ theme }) => theme.text};
            font-size: 0.95em;
        }
    }
`;

const FormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    
    @media ${Device.tablet}{
        grid-template-columns: 1fr 280px;
    }
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    .input-with-button {
        display: flex;
        gap: 10px;
        align-items: flex-start;
    }
`;

const InputWithPrefix = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    
    .prefix {
        padding: 12px 15px;
        font-weight: 600;
        color: ${({ theme }) => theme.text};
        background-color: ${({ theme }) => theme.bg2};
        border: 2px solid ${({ theme }) => theme.color2};
        border-radius: 15px;
        min-height: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 5px;
    }
    
    /* InputText2 mantiene su estilo normal */
    > div {
        flex: 1;
    }
`;

const Label = styled.label`
    font-weight: 600;
    font-size: 0.95em;
    color: ${(props) => props.$color || props.theme.text};
`;

const IconButton = styled.button`
    background-color: ${({ theme }) => theme.colorPrincipal};
    border: none;
    border-radius: 8px;
    padding: 12px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    min-height: 49px;
    
    svg {
        font-size: 1.5em;
        color: white;
    }
    
    &:hover {
        opacity: 0.8;
        transform: scale(1.05);
    }
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    border-top: 2px solid ${({ theme }) => theme.bg2};
    gap: 15px;
    
    @media ${Device.tablet}{
        justify-content: flex-end;
    }
    
    button {
        flex: 1;
        
        @media ${Device.tablet}{
            flex: initial;
        }
    }
`;
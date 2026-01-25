import styled from "styled-components";
import {Title, InputText2, Btn1, Linea, Footer, useAuthStore} from "../../index"
import {v} from "../../styles/variables"
import {Device} from  "../../styles/breakpoints"

export function LoginTemplate() {
    const { loginGoogle } = useAuthStore();

  return (
    <Container>
        <div className="card">
            <ContentLogo>
                <img src={v.logo}/>
            </ContentLogo>
            <LogoTitle>
                <span>ComaPOS | Punto de venta</span>
            </LogoTitle>

            <Title $paddingbottom="20px">Ingresar</Title>
            <form>
                <InputText2>
                    <input className="form__field" placeholder="email" type="text"/>
                </InputText2>
                <InputText2>
                    <input className="form__field" placeholder="contraseña" type="password"/>
                </InputText2>
                <Btn1 border="2px" titulo="INGRESAR" bgcolor="#1CB0F6" color="255,255,255" width="100%"></Btn1>
            </form>
            <Linea>
                <span>O</span>
            </Linea>
            <Btn1
                border="2px"
                funcion={loginGoogle}
                titulo="Google"
                bgcolor="#fff"
                icono={<v.iconogoogle />}
            />
        </div>
        <Footer />
    </Container>
  );
}

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 20px;
    flex-direction: column;
    padding: 0 10px;
    color: ${({theme}) => theme.text};
    .card{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        width: 100%;
        @media ${Device.tablet} {
            width: 400px;
        
        }
        form{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }
    
  
`;

const ContentLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    img{
        width: 10%;
    }
`
const LogoTitle = styled.div`
    span{
        font-weight: 700;
    }
`
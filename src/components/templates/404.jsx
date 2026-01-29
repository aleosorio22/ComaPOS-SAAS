import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Layout } from "../../hooks/Layout";

export function PageNot() {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <Container>
        <ContentWrapper>
          <ErrorCode>404</ErrorCode>
          <Icon icon="fluent-emoji:confused-face" className="emoji" />
          <Title>¡Página no encontrada!</Title>
          <Description>
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </Description>
          <ButtonGroup>
            <HomeButton onClick={() => navigate("/")}>
              <Icon icon="material-symbols:home" />
              Ir al inicio
            </HomeButton>
            <BackButton onClick={() => navigate(-1)}>
              <Icon icon="material-symbols:arrow-back" />
              Regresar
            </BackButton>
          </ButtonGroup>
        </ContentWrapper>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  padding: 2rem;
  background: ${({ theme }) => theme.body};
`;

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 600px;
  
  .emoji {
    font-size: 120px;
    margin: 1rem 0;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, #263686 0%, #89CBA6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 1rem 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin: 1.5rem 0 2rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const HomeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: #263686;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    font-size: 1.3rem;
  }
  
  &:hover {
    background: #1a2660;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(38, 54, 134, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #263686;
  background: transparent;
  border: 2px solid #263686;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    font-size: 1.3rem;
  }
  
  &:hover {
    background: #263686;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(38, 54, 134, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;
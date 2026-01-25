import styled from "styled-components";
import { v } from "../../../styles/variables";

export function TotalAPagar({ total = 0 }) {
  return (
    <Container>
      <Header>
        <IconWrapper>
          <v.iconoprecioventa />
        </IconWrapper>
        <Label>Total a Pagar</Label>
      </Header>
      <TotalAmount>
        <Currency>S/</Currency>
        <Amount>{total.toFixed(2)}</Amount>
      </TotalAmount>
    </Container>
  );
}

const Container = styled.div`
  background: ${({ theme }) => theme.bgcards};
  border: 2px solid ${v.colorPrincipal};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(38, 54, 134, 0.2);
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
`;

const IconWrapper = styled.div`
  background: ${v.colorPrincipal};
  color: ${v.colorTerciario};
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(38, 54, 134, 0.3);
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TotalAmount = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 15px;
  background: ${({ theme }) => theme.bg2};
  border-radius: 8px;
  border-left: 4px solid ${v.colorSecundario};
`;

const Currency = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${v.colorPrincipal};
`;

const Amount = styled.span`
  font-size: 36px;
  font-weight: 700;
  color: ${v.colorPrincipal};
  font-family: 'Poppins', sans-serif;
  letter-spacing: -1px;
`;

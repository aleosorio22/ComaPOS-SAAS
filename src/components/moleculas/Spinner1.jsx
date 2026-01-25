import styled from "styled-components";
import { PulseLoader} from "react-spinners"

export function Spinner1() {
  return (
    <Container>
      <PulseLoader color="#0D375F" size={80}/>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

import styled, { css } from "styled-components";
import { color } from "../../Constants/color";

export const RequestDimmer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RequestBox = styled.div`
  min-width: 20rem;
  min-height: 25rem;
  background: white;
  border-radius: 8px;  
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 1rem 2rem;
  box-shadow: 0 0 10px ${color.grey_2};
`;

const backgroundPanel = css`
  background: ${color.primary};

  p {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-right: 1rem;
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;

    :hover {
      background: white;
      color: ${color.primary};
    }
  }
`;

export const RequestPanel = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  p {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;    
    border: 1px solid ${color.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${color.primary};
    cursor: pointer;

    :hover {
      background: ${color.primary};
      color: white;
    }
  }

  ${(props) => props.is_colored && backgroundPanel}
`;

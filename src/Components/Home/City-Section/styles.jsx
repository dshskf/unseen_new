import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 35rem;
  margin-top: 7rem;
  display: flex;
  flex-wrap: wrap;
`;

const onHoverEffect = {
  img: css`
    transform: scale(1.2);
  `,
  overlay: css`
    opacity: 0;
  `,
};

export const Sub = styled.div`
  width: 25%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden !important;
  cursor: pointer;

  p {
    color: white;
    font-size: 2rem;
    z-index: 1;
    pointer-events: none;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  transition: 1.5s all;
  ${(props) => (props.isHover ? onHoverEffect.img : undefined)}
`;

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  transition: 2s all;

  ${(props) => (props.isHover ? onHoverEffect.overlay : undefined)}
`;

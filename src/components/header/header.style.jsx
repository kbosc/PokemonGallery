import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const HeaderTitle = styled.h1`
  text-align: center;
  width: 100vw;
  font-size: clamp(40px, 8vw, 80px);
  color: ${(props) => props.theme.colors.secondary};
`;

export const HeaderNav = styled.nav`
  display: flex;
  gap: 2rem;
`;

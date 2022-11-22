import styled from "styled-components";

export const GalleryContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;
export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  color: black;
  /* display: grid;
    grid-template-columns: repeat(auto-fill,minmax(20rem, 1fr));
    grid-auto-rows: 20rem;
    grid-gap: 2rem; */
`;

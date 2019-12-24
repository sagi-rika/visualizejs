import styled from 'styled-components';

export const Border = styled.div`
  position: relative;
  font-family: 'Poppins', sans-serif;
  padding: 0.6rem;
  border: 1px dashed #ccc;
  border-radius: 8px;
  height: 100%;
  width: 50%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  padding-top: 4em;
`;

export const Label = styled.label`
  position: absolute;
  top: 1rem;
  left: 2rem;
  opacity: 0.5;
`;

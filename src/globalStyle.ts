import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body, html {
    height: 100%;
    margin: 0;
  }
  body {
    background-image: url(${({ theme }: any) => theme.bgImage});
    color: ${({ theme }) => theme.colors.ctrl};
    font-family: Roboto;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`
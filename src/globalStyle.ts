import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body, html {
    margin: 0;
  }
  body {
    background-image: url(${({ theme }) => theme.bgImage});
    color: ${({ theme }) => theme.colors.ctrl};
    font-family: Roboto;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Almoni', Arial, serif;
    height: 100%;
    font-weight: 500;
    font-size: 18px;
    color: rgba(55, 55, 78, 0.94);
    letter-spacing: 0.2px;
    padding:0;
    margin:0;
    direction: ltr;
    font-kerning: none;
    &.ieClass {
        @media (max-height: 620px) {
            zoom: 100%;
        }
    }
  }

  // cancel the native select gray background
  // .MuiSelect-select:focus {
  //   background-color: #ffffff !important;
  // }
  
  
  
  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  *, *::before, *::after {
    box-sizing: inherit;
  }

  #__next {
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  // disable up/down arrows on chrome input type=number
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  // disable IE clear X button on input
  input::-ms-clear {
    display: none;
  }
`;

export { GlobalStyle };
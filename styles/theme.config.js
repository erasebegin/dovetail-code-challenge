import { createGlobalStyle } from "styled-components";

export const appTheme = {
    body: "#ffffff",
    text: "#0A0D16",
    accent: "#fab921",
};

export const GlobalStyles = createGlobalStyle`

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        font-family: "Raleway", sans-serif;
        font-weight: 400;
        font-style: normal;
        transition: all 0.50s linear;
    }

    input, textarea, button {
        font-family: inherit;
    }

    h1, h2, h3 {
        margin: 0;
        padding: 0;
    }

    button {
        background: none;
        border: none;
        color: ${({ theme }) => theme.text};
        padding: 0.5rem;
        font-size: 1.5rem;
        cursor: pointer;

        &:hover {
            color: ${({ theme }) => theme.accent};
        }
    }
`;

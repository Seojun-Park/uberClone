import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
${reset}
*{
    box-sizing: border-box
}
body{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
               Roboto, Oxygen-Sans, Ubuntu, Cantarell,
               "Helvetica Neue", sans-serif;
}
a{
    color: inherit;
    text-decoration: none;
}
input,
button {
    &:focus, &:active{outline:none}
}
`;

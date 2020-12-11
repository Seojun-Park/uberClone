import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
${reset}
@import url('https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;500;600;700&family=Open+Sans:wght@300;400;600;700;800&display=swap');
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

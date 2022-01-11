import React from 'react';
import {createGlobalStyle} from 'styled-components';



export const GlobalStyle = createGlobalStyle`
:root{

    --shape:#000000;
    --text:#ffff;
    --green:#0CA02D;
    
}


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html{
    @media(max-width:1080px){
        font-size:93.75%;
    }
    @media(max-width:720px){
        font-size:87.5%;
    }

}


body{
    background:#f0f2f5;
    -webkit-font-font-smooth: antialiased;
}

button {
    cursor: pointer;
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight:400;
    }

    h1,h2,h3,h4,h5,h6, strong{
        font-weight:600;
    }
`;
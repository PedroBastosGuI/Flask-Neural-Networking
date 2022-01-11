import React from "react";
import { Container, Content } from "./styles";

import logoImag from '../../assets/logo.png';
import { Buttons } from "../Buttons";

export function Header() {
    return(
        <Container>
            <Content>
                <img src={logoImag}/>
                <Buttons 
                    title="Ajuda"
                />
            </Content>
        </Container>
    );
}
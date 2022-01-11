import React from 'react';
import { Cam } from './Components/cam';
import { Header } from './Components/header';
import { GlobalStyle } from './global/style/styles';

function App() {
  return (
    <>
    <Header />
    <Cam/>
    <GlobalStyle/>
    </>

  );
}

export default App;

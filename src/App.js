import React from "react";
import { BrowserRouter, Route, Routes, HashRouter} from "react-router-dom";
import Main from "./route/Main";
import Game from './route/Game';
import NotFound from './route/NotFound';
import Upload from './route/Upload';
import { createTheme, ThemeProvider } from "@mui/material";
import Terms from "./route/Terms";
import { Navigate } from "react-router-dom"

const theme = createTheme({
  typography: {
      fontSize: 20,
      fontFamily: 'Noto Sans KR',
  }
})
function App() {


 return (
  <div>
    <ThemeProvider theme={theme}>
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        
        <Route path='/upload' element={<Upload/>}></Route>
        <Route path='/game' element={<Game/>}></Route>
        

   

        <Route path='/terms' element={<Terms />}></Route>
        
        <Route path="*" element={<Navigate replace to="/" />} /> 
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
    
  </div>  
  
  );
  
  
}

export default App;

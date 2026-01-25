import styled, {ThemeProvider, useTheme} from 'styled-components'
import {AuthContextProvider, GlobalStyles, MyRoutes, useThemeStore} from './index.js'
import {Device} from './styles/breakpoints'
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


function App() {
  const {themeStyle} = useThemeStore();
  

  return (
    <ThemeProvider theme={themeStyle}> 
      <AuthContextProvider>
        <GlobalStyles/>
        <MyRoutes/>
        <ReactQueryDevtools initialIsOpen={true} />
      </AuthContextProvider>

    </ThemeProvider>
    
  )
}
export default App

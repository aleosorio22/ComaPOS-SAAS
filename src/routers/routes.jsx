import {Routes, Route} from 'react-router-dom';
import { Home, Login, ProtectedRoute, Configuraciones, Categorias,  Productos, POS, Layout, PageNot } from '../index';


export function MyRoutes(){

    return(
            <Routes>
                <Route path='/login' element={
                    <ProtectedRoute accesBy="non-authenticated">
                        <Login />
                    </ProtectedRoute>   
                }/>
                
                <Route path="/" element={
                    <ProtectedRoute accesBy="authenticated">
                        <Layout>
                            <Home/>
                        </Layout>
                    </ProtectedRoute>}
                />
                <Route path="/configuracion" element={
                    <ProtectedRoute accesBy="authenticated">
                        <Layout>
                            <Configuraciones/>
                        </Layout>
                    </ProtectedRoute>}
                />

                <Route path="/configuracion/categorias" element={
                    <ProtectedRoute accesBy="authenticated">
                        <Layout>
                            <Categorias/>
                        </Layout>
                    </ProtectedRoute>}
                />

                <Route path="/configuracion/productos" element={
                    <ProtectedRoute accesBy="authenticated">
                        <Layout>
                            <Productos/>
                        </Layout>
                    </ProtectedRoute>}
                />
                <Route path="/pos" element={
                    <ProtectedRoute accesBy="authenticated">
                        <Layout>
                            <POS/>
                        </Layout>
                    </ProtectedRoute>}
                />
                <Route path="*" element={<PageNot/>}/>
               

            </Routes>
        
    )
    
}
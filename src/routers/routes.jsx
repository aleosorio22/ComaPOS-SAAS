import {Routes, Route, Navigate} from 'react-router-dom';
import { Home, Login, ProtectedRoute, Configuraciones, Categorias,  Productos, POS, Layout, PageNot, Empresa, BasicosConfig, MonedaConfig, ClientesProveedores, CajaTemplate} from '../index';


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
                <Route path="/configuracion/empresa" element={
                    <ProtectedRoute accesBy="authenticated">
                        <Layout>
                            <Empresa/>
                        </Layout>
                    </ProtectedRoute>}
                >
                    <Route index element={<Navigate to="empresabasicos"/>}/>
                    <Route index path='empresabasicos' element={<BasicosConfig/>}/>
                    <Route path='monedaconfig' element={<MonedaConfig/>}/>
                </Route>
                <Route path="/configuracion/clientes" element={
                    <ProtectedRoute accesBy="authenticated">
                        <Layout>
                            <ClientesProveedores />
                        </Layout>
                    </ProtectedRoute>}
                />
                <Route path="/configuracion/proveedores" element={
                    <ProtectedRoute accesBy="authenticated">
                        <Layout>
                            <ClientesProveedores/>
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
                <Route path="/caja" element={
                    <ProtectedRoute accesBy="authenticated">
                        <Layout>
                            <CajaTemplate/>
                        </Layout>
                    </ProtectedRoute>}
                />
                <Route path="*" element={<PageNot/>}/>
               

            </Routes>
        
    )
    
}
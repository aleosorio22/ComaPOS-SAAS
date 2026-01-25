import styled from "styled-components";
import {
  ContentAccionesTabla,
  useMarcaStore,
  Paginacion
} from "../../../../index";
import Swal from "sweetalert2";
import { v } from "../../../../styles/variables";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaArrowsAltV, FaChevronUp, FaChevronDown } from "react-icons/fa";
export function TablaMarcas({
  data,
  setOpenRegistro,
  setdataSelect,
  setAccion,
}) {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  const [pagina, setPagina] = useState(1);
  const [columnFilters, setColumnFilters] = useState([]);

  const { eliminarMarcas } = useMarcaStore();
  function eliminar(p) {
    if (p.marca_nomnbre === "General") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Este registro no se permite modificar ya que es valor por defecto.",
        footer: '<a href="">...</a>',
      });
      return;
    }
    Swal.fire({
      title: "¿Estás seguro(a)(e)?",
      text: "Una vez eliminado, ¡no podrá recuperar este registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarMarcas({ marca_id: p.marca_id });
      }
    });
  }
  function editar(data) {
    if (data.marca_nombre === "General") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Este registro no se permite modificar ya que es valor por defecto.",
        footer: '<a href="">...</a>',
      });
      return;
    }
    setOpenRegistro(true);
    setdataSelect(data);
    setAccion("Editar");
  }
  const columns = [
    // {
    //   accessorKey: "categoria_icono",
    //   header: "Icono", 
    //   enableSorting: false,
    //   cell: (info) => (
    //     <div data-title="Color" className="ContentCell">
    //       {
    //         info.getValue()!="-"?(   <ImagenContent imagen={info.getValue()}/>):(<Icono>
    //           {<v.iconoimagenvacia/>}
    //         </Icono>)
    //       }
    
    //     </div>
    //   ),

    //   enableColumnFilter: true,
    //   filterFn: (row, columnId, filterStatuses) => {
    //     if (filterStatuses.length === 0) return true;
    //     const status = row.getValue(columnId);
    //     return filterStatuses.includes(status?.id);
    //   },
    // },
    // {
    //   accessorKey: "categoria_id",
    //   header: "Id",
    //   cell: (info) => <span>{info.getValue()}</span>,
    //   enableColumnFilter: true,
    //   filterFn: (row, columnId, filterStatuses) => {
    //     if (filterStatuses.length === 0) return true;
    //     const status = row.getValue(columnId);
    //     return filterStatuses.includes(status?.id);
    //   },
    // },
    {
      accessorKey: "marca_nombre",
      header: "Nombre",
      cell: (info) => (
        <div data-title="Descripción" className="ContentCell">  
          <span>{info.getValue()}</span>
        </div>
      ),
      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatuses) => {
        if (filterStatuses.length === 0) return true;
        const status = row.getValue(columnId);
        return filterStatuses.includes(status?.id);
      },
    },

    // {
    //   accessorKey: "categoria_color",
    //   header: "Color",
    //   enableSorting: false,
    //   cell: (info) => (
    //     <div data-title="Color" className="ContentCell">
    //       <Colorcontent color={info.getValue()} $alto="25px" $ancho="25px" />
    //     </div>
    //   ),

    //   enableColumnFilter: true,
    //   filterFn: (row, columnId, filterStatuses) => {
    //     if (filterStatuses.length === 0) return true;
    //     const status = row.getValue(columnId);
    //     return filterStatuses.includes(status?.id);
    //   },
    // },
    {
      accessorKey: "acciones",
      header: "",
      enableSorting: false,
      cell: (info) => (
        <div data-title="Acciones" className="ContentCell">
          <ContentAccionesTabla
            funcionEditar={() => editar(info.row.original)}
            funcionEliminar={() => eliminar(info.row.original)}
          />
        </div>
      ),
      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatuses) => {
        if (filterStatuses.length === 0) return true;
        const status = row.getValue(columnId);
        return filterStatuses.includes(status?.id);
      },
    },
  ];
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
  });
  return (
    <>
      <Container>
        <TableWrapper>
          {/* Vista Desktop - Tabla */}
          <DesktopTable className="desktop-view">
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th 
                        key={header.id}
                        onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                        className={header.column.getCanSort() ? "sortable" : ""}
                      >
                        <div className="header-content">
                          <span>{header.column.columnDef.header}</span>
                          {header.column.getCanSort() && (
                            <span className="sort-icon">
                              {header.column.getIsSorted() === "asc" && <FaChevronUp />}
                              {header.column.getIsSorted() === "desc" && <FaChevronDown />}
                              {!header.column.getIsSorted() && <FaArrowsAltV />}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(item => (
                  <tr key={item.id}>
                    {item.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </DesktopTable>

          {/* Vista Mobile - Cards */}
          <MobileCards className="mobile-view">
            {table.getRowModel().rows.map(item => (
              <Card key={item.id}>
                <CardContent>
                  <CardField>
                    <Label>Nombre</Label>
                    <Value>{item.original.marca_nombre}</Value>
                  </CardField>
                </CardContent>
                <CardActions>
                  <ContentAccionesTabla
                    funcionEditar={() => editar(item.original)}
                    funcionEliminar={() => eliminar(item.original)}
                  />
                </CardActions>
              </Card>
            ))}
          </MobileCards>
        </TableWrapper>
        
        <Paginacion
          table={table}
          irinicio={() => table.setPageIndex(0)}
          pagina={table.getState().pagination.pageIndex + 1}
          setPagina={setPagina}
          maximo={table.getPageCount()}
        />
      </Container>
    </>
  );
}
const Container = styled.div`
  position: relative;
  margin: 0;
`;

const TableWrapper = styled.div`
  background: ${({ theme }) => theme.bgtotal};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.color2};
  
  .mobile-view {
    display: block;
    @media (min-width: ${v.bpbart}) {
      display: none;
    }
  }
  
  .desktop-view {
    display: none;
    @media (min-width: ${v.bpbart}) {
      display: block;
    }
  }
`;

const DesktopTable = styled.div`
  overflow-x: auto;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    thead {
      tr {
        background: ${({ theme }) => theme.bg2};
        border-bottom: 1px solid ${({ theme }) => theme.color2};
        
        th {
          padding: 0.75rem 1.5rem;
          text-align: left;
          font-size: 0.75rem;
          font-weight: 600;
          color: ${({ theme }) => theme.text};
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
          
          &.sortable {
            cursor: pointer;
            user-select: none;
            
            &:hover {
              background: ${({ theme }) => theme.bgAlpha};
            }
          }
          
          &:last-child {
            text-align: center;
          }
          
          .header-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            
            .sort-icon {
              display: flex;
              align-items: center;
              color: ${({ theme }) => theme.text};
              opacity: 0.5;
              font-size: 0.7rem;
            }
          }
        }
      }
    }
    
    tbody {
      tr {
        border-bottom: 1px solid ${({ theme }) => theme.color2};
        transition: background-color 0.15s ease;
        
        &:hover {
          background: ${({ theme }) => theme.bgAlpha};
        }
        
        &:last-child {
          border-bottom: none;
        }
        
        td {
          padding: 1rem 1.5rem;
          font-size: 0.875rem;
          color: ${({ theme }) => theme.text};
          
          &:last-child {
            text-align: center;
          }
          
          .ContentCell {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
`;

const MobileCards = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color2};
  transition: background-color 0.15s ease;
  
  &:hover {
    background: ${({ theme }) => theme.bgAlpha};
  }
  
  &:active {
    background: ${({ theme }) => theme.bg2};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const CardField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  letter-spacing: 0.3px;
`;

const Value = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  text-align: right;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.color2};
`;
const Colorcontent = styled.div`
  justify-content: center;
  min-height: ${(props) => props.$alto};
  width: ${(props) => props.$ancho};
  display: flex;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  text-align: center;
`;
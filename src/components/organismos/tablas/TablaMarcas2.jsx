import styled from "styled-components";
import { useState, useMemo } from "react";
import { ContentAccionesTabla, useMarcaStore, Paginacion } from "../../../index";
import Swal from "sweetalert2";
import { v } from "../../../styles/variables";
import { FiChevronUp, FiChevronDown, FiPackage } from "react-icons/fi";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export function TablaMarcas2({
  data,
  setOpenRegistro,
  setdataSelect,
  setAccion,
}) {
  const { eliminarMarcas } = useMarcaStore();
  const [columnFilters, setColumnFilters] = useState([]);

  // Funciones de CRUD
  function eliminar(p) {
    if (p.marca_nombre === "General") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Este registro no se permite modificar ya que es valor por defecto.",
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
      });
      return;
    }
    setOpenRegistro(true);
    setdataSelect(data);
    setAccion("Editar");
  }

  // Definir columnas para TanStack Table
  const columns = [
    {
      accessorKey: "marca_nombre",
      header: "Nombre",
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
    },
    {
      accessorKey: "acciones",
      header: "",
      enableSorting: false,
      cell: (info) => (
        <div className="actions-wrapper">
          <ContentAccionesTabla
            funcionEditar={() => editar(info.row.original)}
            funcionEliminar={() => eliminar(info.row.original)}
          />
        </div>
      ),
    },
  ];

  // Configurar TanStack Table
  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Renderizar estado vacío
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <EmptyStateContainer>
        <FiPackage />
        <h4>No hay marcas disponibles</h4>
        <p>Agrega una nueva marca para comenzar</p>
      </EmptyStateContainer>
    );
  }

  return (
    <Container>
      <TableWrapper>
        {/* Vista Desktop - Tabla */}
        <DesktopView className="desktop-view">
          <StyledTable>
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
                            {header.column.getIsSorted() === "asc" && <FiChevronUp />}
                            {header.column.getIsSorted() === "desc" && <FiChevronDown />}
                            {!header.column.getIsSorted() && <FiChevronUp style={{ opacity: 0.3 }} />}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td 
                      key={cell.id}
                      className={cell.column.id === "acciones" ? "actions-cell" : ""}
                    >
                      {cell.column.id === "acciones" ? (
                        cell.getValue()
                      ) : (
                        cell.getValue()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </DesktopView>

        {/* Vista Mobile - Cards */}
        <MobileView className="mobile-view">
          {table.getRowModel().rows.map((row) => (
            <MobileCard key={row.id}>
              <CardContent>
                <CardField>
                  <Label>Nombre</Label>
                  <Value>{row.original.marca_nombre}</Value>
                </CardField>
              </CardContent>
              <CardActions>
                <ContentAccionesTabla
                  funcionEditar={() => editar(row.original)}
                  funcionEliminar={() => eliminar(row.original)}
                />
              </CardActions>
            </MobileCard>
          ))}
        </MobileView>
      </TableWrapper>

      {/* Paginación con tu componente existente */}
      <PaginacionWrapper>
        <Paginacion table={table} />
      </PaginacionWrapper>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  position: relative;
  margin: 0;
`;

const PaginacionWrapper = styled.div`
  margin-top: 1rem;
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

const DesktopView = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
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
        letter-spacing: 0.05em;

        &.sortable {
          cursor: pointer;
          user-select: none;
          transition: background-color 0.15s ease;

          &:hover {
            background: ${({ theme }) => theme.bgAlpha};
          }
        }

        &.actions-header {
          text-align: right;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          .sort-icon {
            display: flex;
            align-items: center;
            color: ${({ theme }) => theme.text};
            font-size: 0.875rem;
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

        &.actions-cell {
          text-align: right;

          .actions-wrapper {
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
        }
      }
    }
  }
`;

const MobileView = styled.div`
  display: flex;
  flex-direction: column;
`;

const MobileCard = styled.div`
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
  letter-spacing: 0.05em;
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

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  background: ${({ theme }) => theme.bgtotal};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color2};

  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.3;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    max-width: 20rem;
  }
`;

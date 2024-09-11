import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";

export default function PaginationTable({
  header,
  columns,
  data,
  renderAction,
  rowsPerPageOptions = [10, 20, 50, 100, 1000],
  initialRowsPerPage = 10,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        boxShadow: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        p: 2,
        borderRadius: 2,
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: "700",
      }}
    >
      <Box sx={{ textAlign: "left", fontSize: "h5.fontSize" }}>
        <Box>{header}</Box>
      </Box>
      <Table sx={{ width: 1 }}>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align={column.align || "left"}
                sx={column.sx || null}
              >
                {column.label}
              </TableCell>
            ))}
            {renderAction && (
              <TableCell sx={{ width: 1 / 10 }} align="center">
                Action
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} align={column.align || "center"}>
                    {column.type === "image" ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={row[column.field]}
                          sx={{
                            width: 66,
                            height: 48,
                            display: "flex",
                            justifyContent: "center",
                          }}
                          variant="square"
                        />
                      </Box>
                    ) : column.type === "datetime" ? (
                      <>
                        {format(
                          new Date(row[column.field]),
                          "dd MMM, yyyy | hh:mm a"
                        )}
                      </>
                    ) : column.body ? (
                      column.body(row) // Kiểm tra xem cột có trường body và render nội dung tùy chỉnh
                    ) : (
                      row[column.field]
                    )}
                  </TableCell>
                ))}
                {renderAction && (
                  <TableCell size="small" variant="body" align="right">
                    {renderAction(row)}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={data.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={rowsPerPageOptions}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
}

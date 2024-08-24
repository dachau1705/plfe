import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function SimpleTable({ columns, data, renderAction }) {
  return (
    <Box width="100%" overflow="auto">
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} align={column.align || "left"}>
                {column.label}
              </TableCell>
            ))}
            {renderAction && <TableCell align="right">Action</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} align={column.align || "left"}>
                  {row[column.field]}
                </TableCell>
              ))}
              {renderAction && <TableCell align="right">{renderAction(row)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

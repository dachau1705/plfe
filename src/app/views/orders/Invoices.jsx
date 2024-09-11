import { Box, Chip, Icon, IconButton } from "@mui/material";
import { useState } from "react";
import PaginationTable from "../material-kit/tables/PaginationTable";

const Invoices = () => {
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(false);

  const subscribarList = [
    {
      name: "john doe",
      time: "2024-10-08",
      date: "18 january, 2019",
      amount: 1000,
      status: "unpaid",
      company: "ABC Fintech LTD.",
    },
    {
      name: "kessy bryan",
      time: "2024-10-08",
      date: "10 january, 2019",
      amount: 9000,
      status: "paid",
      company: "My Fintech LTD.",
    },
    {
      name: "kessy bryan",
      time: "2024-10-08",
      date: "10 january, 2019",
      amount: 9000,
      status: "paid",
      company: "My Fintech LTD.",
    },
    {
      name: "james cassegne",
      time: "2024-10-08",
      date: "8 january, 2019",
      amount: 5000,
      status: "unpaid",
      company: "Collboy Tech LTD.",
    },
    {
      name: "lucy brown",
      time: "2024-10-08",
      date: "1 january, 2019",
      amount: 89000,
      status: "paid",
      company: "ABC Fintech LTD.",
    },
    {
      name: "Đoàn Đắc Hậu",
      time: "2024-10-08",
      date: "1 january, 2002",
      amount: 89000,
      status: "paid",
      company: "ABC Fintech LTD.",
    },
    {
      name: "Đoàn Việt Trinh",
      time: "2024-10-08",
      date: "1 january, 2019",
      amount: 89000,
      status: "paid",
      company: "ABC Fintech LTD.",
    },
    {
      name: "Phạm Đoàn Thái Nam",
      time: "2024-10-08",
      date: "1 january, 2019",
      amount: 89000,
      status: "paid",
      company: "ABC Fintech LTD.",
    },
    {
      name: "lucy brown",
      time: "2024-10-08",
      date: "1 january, 2019",
      amount: 89000,
      status: "paid",
      company: "ABC Fintech LTD.",
    },
  ];
  const columns2 = [
    { label: "No.", field: "name", align: "left", type: "string" },
    { label: "Date", field: "time", align: "center", type: "datetime" },
    { label: "Description", field: "company", align: "center", type: "string" },
    { label: "Method", field: "amount", align: "center", type: "string" },
    {
      label: "Total",
      field: "amount",
      align: "center",
      type: "number",
      body: (row) => <>{row.amount} $</>,
    },
    {
      label: "Status",
      field: "status",
      align: "center",
      type: "number",
      body: (row) => (
        <Chip
          label={row.status === "paid" ? "Paid" : "Unpaid"}
          color={row.status === "paid" ? "success" : "error"}
          variant="outlined"
        />
      ),
    },
  ];
  const handleEdit = (_id) => {
    setOpen(true);
    setSelected(_id);
  };
  return (
    <div>
      <PaginationTable
        header="Billing"
        columns={columns2}
        data={subscribarList}
        renderAction={(row) => (
          <Box sx={{ textAlign: "center" }}>
            <IconButton onClick={() => handleEdit(row._id)}>
              <Icon color="info">info_outline</Icon>
            </IconButton>
          </Box>
        )}
        rowsPerPageOptions={[5, 10, 25]}
        initialRowsPerPage={5}
      />
    </div>
  );
};

export default Invoices;

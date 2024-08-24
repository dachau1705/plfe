import { Box, Icon, IconButton, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTable from "./PaginationTable";
import SimpleTable from "./SimpleTable";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function AppTable() {
  const subscribarList = [
    {
      name: "john doe",
      date: "18 january, 2019",
      amount: 1000,
      status: "close",
      company: "ABC Fintech LTD."
    },
    {
      name: "kessy bryan",
      date: "10 january, 2019",
      amount: 9000,
      status: "open",
      company: "My Fintech LTD."
    },
    {
      name: "kessy bryan",
      date: "10 january, 2019",
      amount: 9000,
      status: "open",
      company: "My Fintech LTD."
    },
    {
      name: "james cassegne",
      date: "8 january, 2019",
      amount: 5000,
      status: "close",
      company: "Collboy Tech LTD."
    },
    {
      name: "lucy brown",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD."
    },
    {
      name: "Đoàn Đắc Hậu",
      date: "1 january, 2002",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD."
    },
    {
      name: "Đoàn Việt Trinh",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD."
    },
    {
      name: "Phạm Đoàn Thái Nam",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD."
    },
    {
      name: "lucy brown",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD."
    }
  ];
  const data = [
    {
      id: 1,
      name: "Alice Johnson",
      company: "TechCorp",
      startDate: "2023-03-15",
      status: "Active",
      amount: 1500
    },
    {
      id: 2,
      name: "Bob Brown",
      company: "Innovate LLC",
      startDate: "2023-04-10",
      status: "Inactive",
      amount: 2500
    },
    {
      id: 3,
      name: "Charlie Davis",
      company: "WebWorks",
      startDate: "2023-05-20",
      status: "Active",
      amount: 1800
    },
    {
      id: 4,
      name: "Dana White",
      company: "DesignPro",
      startDate: "2023-06-01",
      status: "Pending",
      amount: 2200
    }
  ];

  const columns = [
    { label: "Name", field: "name", align: "left" },
    { label: "Company", field: "company", align: "center" },
    { label: "Start Date", field: "startDate", align: "center" },
    { label: "Status", field: "status", align: "center" },
    { label: "Amount", field: "amount", align: "center" }
  ];
  const columns2 = [
    { label: "Name", field: "name", align: "left" },
    { label: "Company", field: "company", align: "center" },
    { label: "Start Date", field: "date", align: "center" },
    { label: "Status", field: "status", align: "center" },
    { label: "Amount", field: "amount", align: "center" }
  ];

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} />
      </Box>

      <SimpleCard title="Simple Table">
        <SimpleTable
          columns={columns}
          data={data}
          renderAction={(row) => (
            <IconButton onClick={() => console.log(`Action for ${row.name}`)}>
              <Icon color="error">close</Icon>
            </IconButton>
          )}
        />
      </SimpleCard>

      <SimpleCard title="Pagination Table">
        <PaginationTable
          columns={columns2}
          data={subscribarList}
          renderAction={(row) => (
            <IconButton onClick={() => console.log(`Action for ${row.name}`)}>
              <Icon color="error">close</Icon>
            </IconButton>
          )}
          rowsPerPageOptions={[5, 10, 25]}
          initialRowsPerPage={5}
        />
      </SimpleCard>
    </Container>
  );
}

import {
  Box,
  Breadcrumbs,
  Chip,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import { deleteProduct, useListOrder } from "app/api";
import { SimpleCard } from "app/components";
import { usdFormatter } from "constants";
import DeleteDialog from "core/form/DeleteDialog";
import Cookies from "js-cookie";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "../material-kit/buttons/AppButton";
import PaginationTable from "../material-kit/tables/PaginationTable";
import UpdateProduct from "../product/UpdateProduct";

const OrderList = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState();
  const [params, setParams] = useState({ reder: false });
  const userId = Cookies.get("user_id");
  const data = useListOrder(userId) || [];
  const handleEdit = (_id) => {
    setOpen(true);
    setSelected(_id);
  };
  const hanldeInsert = (_id) => {
    setOpen(true);
  };
  const handleDelete = (_id) => {
    setVisible(true);
    setSelected(_id);
  };
  const columns2 = [
    { label: "Order No", field: "_id", align: "left" },
    { label: "Image", field: "image", align: "center", type: "image" },
    {
      label: "Status",
      field: "status",
      align: "center",
      body: (row) => {
        if (row.status === "Pending") {
          return <Chip label="Pending" color="secondary" />;
        }
        if (row.status === "Confirmed") {
          return <Chip label="Confirmed" color="primary" />;
        }
        if (row.status === "Shipped") {
          return <Chip label="Shipped" color="warning" />;
        }
        if (row.status === "Delivered") {
          return <Chip label="Delivered" color="success" />;
        }
        if (row.status === "Canceled") {
          return <Chip label="Canceled" color="danger" />;
        }
      },
    },
    { label: "Payment Method", field: "paymentMethod", align: "center" },
    {
      label: "Date",
      field: "date",
      align: "center",
      body: (row) => <>{moment(row.date).format("HH:mm || DD-MM-YYYY")}</>,
    },
    { label: "Total Price", field: "totalPrice", align: "center", body : (row) => <>{usdFormatter.format(row.totalPrice)}</> },
  ];
  return (
    <Box sx={{ mx: 4 }}>
      <Box sx={{ my: 2, mx: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ lineHeight: 4 }}>
          <Link underline="hover" to={"/"}>
            HOME
          </Link>
          <Link underline="hover" to="/product/default">
            ORDER
          </Link>
          <Typography color="text.primary">LIST ORDER</Typography>
        </Breadcrumbs>
      </Box>
      <SimpleCard title="Order List">
        <UpdateProduct
          open={open}
          setOpen={setOpen}
          _id={selected}
          setParams={setParams}
        />

        <StyledButton onClick={hanldeInsert} variant="outlined">
          Add new <Icon color="info">add</Icon>
        </StyledButton>
        <DeleteDialog
          setParams={setParams}
          open={visible}
          setOpen={setVisible}
          _id={selected}
          api={deleteProduct}
        />
        <PaginationTable
          columns={columns2}
          data={data}
          renderAction={(row) => (
            <Box sx={{ textAlign: "center" }}>
              <IconButton onClick={() => handleDelete(row._id)}>
                <Icon color="error">delete</Icon>
              </IconButton>
              <IconButton onClick={() => handleEdit(row._id)}>
                <Icon color="info">info_outline</Icon>
              </IconButton>
            </Box>
          )}
          rowsPerPageOptions={[10, 20, 50, 100, 1000]}
          initialRowsPerPage={10}
        />
      </SimpleCard>
    </Box>
  );
};

export default OrderList;

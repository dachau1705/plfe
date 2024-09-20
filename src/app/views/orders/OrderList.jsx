import { Box, Breadcrumbs, Icon, IconButton, Typography } from "@mui/material";
import { deleteProduct, useListProduct } from "app/api";
import { SimpleCard } from "app/components";
import DeleteDialog from "core/form/DeleteDialog";
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
  const data = useListProduct({ ...params }) || [];
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
    { label: "Name", field: "name", align: "left" },
    { label: "Image", field: "image", align: "center", type: "image" },
    { label: "Price", field: "price", align: "center" },
    { label: "Purchase Price", field: "priceIn", align: "center" },
    { label: "Price Sale", field: "priceSale", align: "center" },
    { label: "Amount", field: "amount", align: "center" },
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
      <SimpleCard title="Product List">
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

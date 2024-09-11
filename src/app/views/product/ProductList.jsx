import { Box, Icon, IconButton } from "@mui/material";
import { deleteProduct, useListProduct } from "app/api";
import { SimpleCard } from "app/components";
import DeleteDialog from "core/form/DeleteDialog";
import { useState } from "react";
import { StyledButton } from "../material-kit/buttons/AppButton";
import PaginationTable from "../material-kit/tables/PaginationTable";
import UpdateProduct from "./UpdateProduct";

const ProductList = () => {
  const [loading, setLoading] = useState(true);
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
  );
};

export default ProductList;

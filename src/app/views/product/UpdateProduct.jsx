import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { addNewProduct, updateProduct, useProductDetail } from "app/api";
import { FormUpdate } from "core/form/FormUpdate";
import { ItemGrid } from "core/form/ItemGrid";
import ImageUploadComponent from "core/form/UploadFile";
import { useEffect, useState } from "react";
import { removePropObject } from "utils";
export default function UpdateProduct({ open, setOpen, _id, setParams }) {
  const [infos, setInfos] = useState({});
  const detail = useProductDetail(_id);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (detail._id) {
      setInfos({ ...detail });
      if (detail.image) {
        setFile(detail.image);
      }
    }
  }, [detail]);
  console.log(infos);

  const handleClose = () => setOpen(false);
  const handleData = () => {
    let info = {
      ...infos,
    };
    if (file) {
      info.image = file;
    }
    info = { ...removePropObject(info, detail), _id: _id };
    return info;
  };

  return (
    <Box>
      <Dialog
        open={open}
        maxWidth="xl"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <FormUpdate
            isFormData={true}
            checkId={_id}
            title={"product"}
            setParams={setParams}
            refreshObjects={[setInfos]}
            handleData={handleData}
            actions={{ add: addNewProduct, update: updateProduct }}
            route="/product/product-list"
            setVisible={setOpen}
          >
            <Box
              sx={{
                width: "100%",
                "& > .MuiBox-root > .MuiBox-root": {
                  p: 1,
                  borderRadius: 2,
                  fontSize: "0.875rem",
                  fontWeight: "700",
                },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 1,
                  gridTemplateRows: "auto",
                  gridTemplateAreas: `"main sidebar sidebar sidebar"`,
                }}
              >
                <Box sx={{ gridArea: "main" }}>
                  <ImageUploadComponent file={file} setFile={setFile} />
                </Box>
                <Box sx={{ gridArea: "sidebar" }}>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 1,
                      gridTemplateColumns: "repeat(2, 1fr)",
                    }}
                  >
                    <ItemGrid>
                      <TextField
                        fullWidth
                        id="name"
                        type="text"
                        margin="dense"
                        label="Name"
                        value={infos.name}
                        onChange={(e) =>
                          setInfos({ ...infos, name: e.target.value })
                        }
                      />
                    </ItemGrid>
                    <ItemGrid>
                      <TextField
                        fullWidth
                        id="price"
                        type="number"
                        margin="dense"
                        label="Price"
                        value={infos.price}
                        onChange={(e) =>
                          setInfos({ ...infos, price: e.target.value })
                        }
                      />
                    </ItemGrid>
                    <ItemGrid>
                      <TextField
                        fullWidth
                        id="priceIn"
                        type="number"
                        margin="dense"
                        label="Purchase Price"
                        value={infos.priceIn}
                        onChange={(e) =>
                          setInfos({ ...infos, priceIn: e.target.value })
                        }
                      />
                    </ItemGrid>
                    <ItemGrid>
                      <TextField
                        fullWidth
                        id="priceSale"
                        type="number"
                        margin="dense"
                        label="Price Sale"
                        value={infos.priceSale}
                        onChange={(e) =>
                          setInfos({ ...infos, priceSale: e.target.value })
                        }
                      />
                    </ItemGrid>
                    <ItemGrid>
                      <TextField
                        fullWidth
                        id="amount"
                        type="number"
                        margin="dense"
                        label="Amount"
                        value={infos.amount}
                        onChange={(e) =>
                          setInfos({ ...infos, amount: e.target.value })
                        }
                      />
                    </ItemGrid>
                    <ItemGrid>
                      <TextField
                        fullWidth
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={5}
                        margin="dense"
                        label="Description"
                        value={infos.desc}
                        onChange={(e) =>
                          setInfos({ ...infos, desc: e.target.value })
                        }
                      />
                    </ItemGrid>
                  </Box>
                </Box>
              </Box>
            </Box>
          </FormUpdate>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

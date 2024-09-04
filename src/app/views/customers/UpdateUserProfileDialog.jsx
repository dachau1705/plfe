import { Autocomplete, Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {
  addNewProduct,
  updateProduct,
  useListDistrics,
  useListProvinces,
  useListWards,
  useUserDetail,
} from "app/api";
import { FormUpdate } from "core/form/FormUpdate";
import { ItemGrid } from "core/form/ItemGrid";
import ImageUploadComponent from "core/form/UploadFile";
import { useEffect, useState } from "react";
import { removePropObject } from "utils";
import { role } from "../../../constants";

export default function UpdateUserDialog({ open, setOpen, _id, setParams }) {
  const [infos, setInfos] = useState({});
  const detail = useUserDetail(_id);
  const [file, setFile] = useState(null);
  const provinces = useListProvinces();
  const districs = useListDistrics(infos.city);
  const wards = useListWards(infos.state);

  useEffect(() => {
    if (detail._id) {
      setInfos({ ...detail });
      if (detail.image) {
        setFile(detail.image);
      }
    }
  }, [detail]);

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
      <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
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
                          id="email"
                          type="text"
                          margin="dense"
                          label="Email"
                          value={infos.email}
                          onChange={(e) =>
                            setInfos({ ...infos, email: e.target.value })
                          }
                        />
                      </ItemGrid>
                      <ItemGrid>
                        <TextField
                          fullWidth
                          id="firstName"
                          type="text"
                          margin="dense"
                          label="First Name"
                          value={infos.firstName}
                          onChange={(e) =>
                            setInfos({ ...infos, firstName: e.target.value })
                          }
                        />
                      </ItemGrid>
                      <ItemGrid>
                        <TextField
                          fullWidth
                          id="lastName"
                          type="text"
                          margin="dense"
                          label="Last Name"
                          value={infos.lastName}
                          onChange={(e) =>
                            setInfos({ ...infos, lastName: e.target.value })
                          }
                        />
                      </ItemGrid>
                      <ItemGrid>
                        <TextField
                          fullWidth
                          id="phoneNumber"
                          type="text"
                          margin="dense"
                          label="Phone Number"
                          value={infos.phoneNumber}
                          onChange={(e) =>
                            setInfos({ ...infos, phoneNumber: e.target.value })
                          }
                        />
                      </ItemGrid>

                      <ItemGrid>
                        <DatePicker
                          label="Date of Birth"
                          value={infos.dob || null}
                          sx={{ width: 1 }}
                          onChange={(newDate) => {
                            setInfos({ ...infos, dob: newDate });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              variant="outlined"
                            />
                          )}
                        />
                      </ItemGrid>
                      <ItemGrid>
                        <Autocomplete
                          options={role}
                          getOptionLabel={(option) => option}
                          value={infos.role || null}
                          onChange={(event, newValue) => {
                            setInfos({
                              ...infos,
                              role: newValue ? newValue : "",
                            });
                          }}
                          renderInput={(params) => (
                            <ItemGrid>
                              <TextField
                                {...params}
                                label="Role"
                                variant="outlined"
                                fullWidth
                              />
                            </ItemGrid>
                          )}
                        />
                      </ItemGrid>
                      <ItemGrid>
                        <Autocomplete
                          options={provinces}
                          getOptionLabel={(option) => option}
                          value={infos.city || null}
                          onChange={(event, newValue) => {
                            setInfos({
                              ...infos,
                              city: newValue ? newValue : "",
                              state: null, // Reset state when city changes
                              street: null, // Reset street when city changes
                            });
                          }}
                          renderInput={(params) => (
                            <ItemGrid>
                              <TextField
                                {...params}
                                label="Province"
                                variant="outlined"
                                fullWidth
                              />
                            </ItemGrid>
                          )}
                        />
                      </ItemGrid>
                      <ItemGrid>
                        <Autocomplete
                          options={districs}
                          getOptionLabel={(option) => option}
                          value={infos.state || null}
                          onChange={(event, newValue) => {
                            setInfos({
                              ...infos,
                              state: newValue ? newValue : "",
                              street: null, // Reset street when state changes
                            });
                          }}
                          renderInput={(params) => (
                            <ItemGrid>
                              <TextField
                                {...params}
                                label="District"
                                variant="outlined"
                                fullWidth
                              />
                            </ItemGrid>
                          )}
                        />
                      </ItemGrid>
                      <ItemGrid>
                        <Autocomplete
                          options={wards}
                          getOptionLabel={(option) => option}
                          value={infos.street || null}
                          onChange={(event, newValue) => {
                            setInfos({
                              ...infos,
                              street: newValue ? newValue : "",
                            });
                          }}
                          renderInput={(params) => (
                            <ItemGrid>
                              <TextField
                                {...params}
                                label="Ward"
                                variant="outlined"
                                fullWidth
                              />
                            </ItemGrid>
                          )}
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
      </LocalizationProvider>
    </Box>
  );
}

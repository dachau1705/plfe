import { Autocomplete, Box, Checkbox, Icon, TextField } from "@mui/material";
import {
  placeOrder,
  useListDistrics,
  useListProvinces,
  useListWards,
  useUserDetail,
} from "app/api";
import { SimpleCard } from "app/components";
import { usdFormatter } from "constants";
import { FormUpdate } from "core/form/FormUpdate";
import { ItemGrid } from "core/form/ItemGrid";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Item2, Item3, StyledButton } from "../customers/UserDetail";

const Checkout = () => {
  const _id = Cookies.get("user_id");
  const [params, setParams] = useState({});
  const [infos, setInfos] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
  });
  const detail = useUserDetail(_id);
  const [userDeatail, setUserDetail] = useState({});
  const [file, setFile] = useState(null);
  const provinces = useListProvinces();
  const districs = useListDistrics(infos.city);
  const wards = useListWards(infos.state);
  const [cartList, setCartList] = useState([]);
  const carts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const SubmitButton = () => {
    return (
      <StyledButton
        // onClick={handleSendEmail}
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          color: "white",
          m: 1,
          px: 1,
        }}
      >
        <Icon sx={{ my: "auto" }} fontSize="small">
          delete
        </Icon>
        <Box sx={{ mx: 1 }}>Delete Account</Box>
      </StyledButton>
    );
  };

  useEffect(() => {
    if (detail) {
      const user = detail?.user || {};
      const userInfo = detail?.userInfo || {};
      const address = userInfo?.address || {};
      setInfos({
        _id: user?._id,
        email: user?.email,
        role: user?.role,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        phoneNumber: userInfo?.phoneNumber,
        street: address?.street === "Đường" ? null : address?.street,
        city: address?.city === "Tỉnh/Thành Phố" ? null : address?.city,
        state:
          address?.state === "Phường/Huyện/Thị Trấn" ? null : address?.state,
        country: address?.country === "Việt Nam" ? null : address?.country,
        postalCode: address?.postalCode,
        desc: userInfo?.desc,
        dob: userInfo?.dob,
      });
      setUserDetail({
        _id: user?._id,
        email: user?.email,
        role: user?.role,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        phoneNumber: userInfo?.phoneNumber,
        street: address?.street === "Đường" ? null : address?.street,
        city: address?.city === "Tỉnh/Thành Phố" ? null : address?.city,
        state:
          address?.state === "Phường/Huyện/Thị Trấn" ? null : address?.state,
        country: address?.country === "Việt Nam" ? null : address?.country,
        postalCode: address?.postalCode,
        desc: userInfo?.desc,
        dob: userInfo?.dob,
      });
      if (userInfo?.avatar) {
        setFile(userInfo?.avatar);
      }
    }
  }, [detail]);

  const handleClose = () => {
    setInfos(null);
    setFile(null);
  };
  console.log(infos);

  const handleData = () => {
    let info = {
      ...infos,
      items: cartList,
      totalPrice: carts.totalAmount,
    };
    return info;
  };

  useEffect(() => {
    if (carts) {
      setCartList(carts.items);
    }
  }, [carts]);
  const Item = (props) => {
    const { sx, ...other } = props;
    return (
      <Box
        sx={[
          (theme) => ({
            color: "grey.800",
            px: 1,
            py: 1.5,
            my: "auto",
            fontWeight: "medium",
            borderRadius: 2,
            ...theme.applyStyles("dark", {
              bgcolor: "#101010",
              color: "grey.300",
              borderColor: "grey.800",
            }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      />
    );
  };

  return (
    <Box sx={{ my: 5, mx: 4 }}>
      <SimpleCard title="Billing Details">
        <FormUpdate
          // isFormData={true}
          checkId={_id}
          setParams={setParams}
          refreshObjects={[setInfos]}
          handleData={handleData}
          buttonVisible
          actions={{ update: placeOrder }}
          route="/orders/order-list"
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
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 1,
                gridTemplateRows: "auto",
                gridTemplateAreas: `"main main main main sidebar sidebar"`,
              }}
            >
              <Box sx={{ gridArea: "main", mx: 1 }}>
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
                      id="outlined-required"
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="First Name"
                      value={infos.firstName}
                      placeholder={""}
                      onChange={(e) =>
                        setInfos({ ...infos, firstName: e.target.value })
                      }
                    />
                  </ItemGrid>
                  <ItemGrid>
                    <TextField
                      fullWidth
                      id="lastName"
                      margin="dense"
                      label="Last Name"
                      defaultValue={infos.lastName || ""}
                      value={infos.lastName}
                      onChange={(e) =>
                        setInfos({ ...infos, lastName: e.target.value })
                      }
                    />
                  </ItemGrid>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    // gap: 1,
                    gridTemplateColumns: "repeat(1, 1fr)",
                  }}
                >
                  <ItemGrid>
                    <TextField
                      fullWidth
                      id="company"
                      margin="dense"
                      label="Company"
                      defaultValue={infos.company || ""}
                      value={infos.company}
                      onChange={(e) =>
                        setInfos({ ...infos, company: e.target.value })
                      }
                    />
                  </ItemGrid>
                </Box>

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
                      margin="dense"
                      label="Email"
                      defaultValue={infos.email || ""}
                      value={infos.email}
                      onChange={(e) =>
                        setInfos({ ...infos, email: e.target.value })
                      }
                    />
                  </ItemGrid>
                  <ItemGrid>
                    <TextField
                      fullWidth
                      id="phoneNumber"
                      margin="dense"
                      label="Mobile"
                      defaultValue={infos.phoneNumber || ""}
                      value={infos.phoneNumber}
                      onChange={(e) =>
                        setInfos({ ...infos, phoneNumber: e.target.value })
                      }
                    />
                  </ItemGrid>
                  <ItemGrid>
                    <TextField
                      defaultValue={"Việt Nam"}
                      disabled
                      fullWidth
                      id="country"
                      margin="dense"
                      label="Country"
                      value={infos.country}
                      onChange={(e) =>
                        setInfos({ ...infos, country: e.target.value })
                      }
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
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    // gap: 1,
                    gridTemplateColumns: "repeat(1, 1fr)",
                  }}
                >
                  <ItemGrid>
                    <TextField
                      fullWidth
                      id="address"
                      margin="dense"
                      label="Address"
                      defaultValue={infos.address || ""}
                      value={infos.address}
                      onChange={(e) =>
                        setInfos({ ...infos, address: e.target.value })
                      }
                    />
                  </ItemGrid>
                </Box>
                <Box>
                  <Checkbox
                    //   checked={state.checkedA}
                    //   onChange={handleChange("checkedA")}
                    value="checkedA"
                    label="Secondary"
                  />
                  <span>Create an account?</span>
                </Box>
              </Box>
              <Box sx={{ gridArea: "sidebar", mx: 1 }}>
                <Box
                  sx={{
                    display: "grid",
                    gap: 1,
                    gridTemplateColumns: "repeat(2, 1fr)",
                    borderColor: "grey.300",
                  }}
                >
                  <Item sx={{ fontWeight: 500, fontSize: 15 }}>Porduct</Item>
                  <Item3 sx={{ fontWeight: 500, fontSize: 15 }}>
                    Total Price
                  </Item3>
                </Box>
                {cartList.map((c, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "grid",
                        gap: 1,
                        gridTemplateColumns: "repeat(2, 1fr)",
                        borderBottom:
                          index < cartList.length - 1 ? "1px solid" : "",
                        borderColor: "grey.300",
                      }}
                    >
                      <Item2 sx={{ fontWeight: 400, color: "grey" }}>
                        {c.name}
                      </Item2>
                      <Item3
                        sx={{
                          textAlige: "right",
                          fontWeight: 400,
                          color: "grey",
                        }}
                      >
                        {usdFormatter.format(c.price * c.quantity)}
                      </Item3>
                    </Box>
                  );
                })}
                <Box
                  sx={{
                    display: "grid",
                    gap: 1,
                    gridTemplateColumns: "repeat(2, 1fr)",
                    borderColor: "grey.300",
                  }}
                >
                  <Item sx={{ fontWeight: 500, fontSize: 15 }}>Total</Item>
                  <Item3 sx={{ fontWeight: 500, fontSize: 15 }}>
                    {usdFormatter.format(carts.totalAmount)}
                  </Item3>
                </Box>
                <Box>
                  <StyledButton
                    // onClick={handleSendEmail}
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      color: "white",
                      m: 1,
                      px: 1,
                      width: 1,
                    }}
                  >
                    <Box sx={{ mx: 1 }}>Place Order</Box>
                  </StyledButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </FormUpdate>
      </SimpleCard>
    </Box>
  );
};

export default Checkout;

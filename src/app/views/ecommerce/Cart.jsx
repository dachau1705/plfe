import {
    Avatar,
    Box,
    Button,
    Card,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useListCart } from "app/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { usdFormatter } from "../../../constants";

const Cart = () => {
  const userId = Cookies.get("user_id");
  const initialData = useListCart(userId);
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (initialData) {
      setCartData(initialData);
    }
  }, [initialData]);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");

  // Function to calculate total price
  const calculateTotal = (data, discount) => {
    const total = data.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const discountedTotal = total - (total * discount) / 100;
    setTotalAmount(discountedTotal);
  };

  // Update total price when cart data or discount changes
  useEffect(() => {
    calculateTotal(cartData, discount);
  }, [cartData, discount]);

  // Handler to update quantity
  const handleQuantityChange = (e, index) => {
    const newQuantity = e.target.value;
    setCartData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handler to remove an item from the cart
  const handleClear = (index) => {
    setCartData((prevData) => prevData.filter((_, i) => i !== index));
  };

  // Handler to apply discount coupon
  const handleApplyDiscount = () => {
    // Example coupon validation logic
    if (coupon === "DISCOUNT10") {
      setDiscount(10); // Apply a 10% discount
    } else if (coupon === "DISCOUNT20") {
      setDiscount(20); // Apply a 20% discount
    } else {
      setDiscount(0); // Invalid or no discount
      alert("Invalid coupon code");
    }
  };

  return (
    <Box sx={{ mx: 4, my: 4 }}>
      <Card elevation={3} sx={{ px: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>Name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartData.map((d, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={3}>
                    <Box display="flex" alignItems="center" sx={{ mx: 1 }}>
                      <Avatar
                        src={d.image}
                        alt={d.name}
                        variant="rounded"
                        sx={{ width: 80, height: 80 }}
                      />
                      <Box ml={2}>
                        <Typography fontWeight={500} variant="h7">
                          {d.name}
                        </Typography>
                        <Typography variant="body2">
                          {d.productId.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={500} variant="h7">
                      {usdFormatter.format(d.price)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      name="amount"
                      type="number"
                      value={d.quantity}
                      onChange={(e) => handleQuantityChange(e, index)}
                      InputProps={{
                        inputProps: {
                          min: 1,
                          style: { textAlign: "center", width: 60 },
                        },
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={500} variant="h7">
                      {usdFormatter.format(d.total_price)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleClear(index)} size="small">
                      <Icon>clear</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Coupon and Total */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 3,
            mx: 1.5,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              placeholder="Discount Coupon"
              size="small"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              sx={{ width: "auto" }}
            />
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={handleApplyDiscount}
            >
              Apply
            </Button>
            <Button variant="contained" color="primary" size="medium">
              Checkout
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "40%",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(2, 1fr)",
                width: 1,
              }}
            >
              <Typography textAlign={"left"} variant="h7" fontWeight={500}>
                Total
              </Typography>
              <Typography textAlign={"right"} variant="h7" fontWeight={500}>
                {usdFormatter.format(totalAmount)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Cart;

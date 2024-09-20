import { Clear, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  styled,
  ThemeProvider,
} from "@mui/material";
import { Fragment, useState } from "react";

import useSettings from "app/hooks/useSettings";
import { themeShadows } from "./MatxTheme/themeColors";
import { H6, Small } from "./Typography";

import { post } from "api/api";
import { checkout } from "app/api";
import { sideNavWidth, topBarHeight } from "app/utils/constant";
import { usdFormatter } from "constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../../redux/feature";

// STYLED COMPONENTS
const MiniCart = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  width: sideNavWidth,
});

const CartBox = styled(Box)({
  padding: "4px",
  paddingLeft: "16px",
  display: "flex",
  alignItems: "center",
  boxShadow: themeShadows[6],
  height: topBarHeight,
  "& h5": {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "16px",
    fontWeight: "500",
  },
});

const ProductBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "8px 8px",
  transition: "background 300ms ease",
  "&:hover": { background: "rgba(0,0,0,0.01)" },
});

const IMG = styled("img")({ width: 48 });

const ProductDetails = styled(Box)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  "& h6": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    width: 120,
    marginBottom: "4px",
  },
});

const ShoppingCart = ({ container }) => {
  const { settings } = useSettings();
  const [panelOpen, setPanelOpen] = useState(false);
  const [cartList, setCartList] = useState([]); 
  const carts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (carts) {
      setCartList(carts.items);
    }
  }, [carts]);

  const handleDrawerToggle = () => setPanelOpen(!panelOpen);

  const handleCheckoutClick = () => setPanelOpen(false);

  const handleAddQty = (id) => {
    dispatch(updateQuantity({ productId: id, type: 1 }));
  };

  const handleRemoveQty = (id) => {
    dispatch(updateQuantity({ productId: id, type: 2 }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ productId: id }));
  };
  const totalCost = cartList.reduce(
    (prev, curr) => prev + curr.quantity * curr.price,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await post(checkout, { items: cartList });
      if (result.status) {
        navigate("/ecommerce/checkout");
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <Fragment>
      <IconButton onClick={handleDrawerToggle}>
        <Badge color="secondary" badgeContent={cartList.length}>
          <ShoppingCartIcon sx={{ color: "text.primary" }} />
        </Badge>
      </IconButton>

      <ThemeProvider theme={settings.themes[settings.activeTheme]}>
        <Drawer
          anchor="right"
          open={panelOpen}
          variant="temporary"
          container={container}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          <MiniCart>
            <CartBox>
              <ShoppingCartIcon color="primary" />
              <h5>Cart</h5>
            </CartBox>
            <Box flexGrow={1} overflow="auto">
              {cartList.map((product, i) => (
                <ProductBox key={i}>
                  <Box mr="4px" display="flex" flexDirection="column">
                    <IconButton
                      size="small"
                      onClick={() => handleAddQty(product.productId)}
                    >
                      <KeyboardArrowUp />
                    </IconButton>

                    <IconButton
                      onClick={() => handleRemoveQty(product.productId)}
                      disabled={!(product.quantity - 1)}
                      size="small"
                    >
                      <KeyboardArrowDown />
                    </IconButton>
                  </Box>

                  <Box mr={1}>
                    <IMG src={product.image} alt={product.name} />
                  </Box>

                  <ProductDetails>
                    <H6>{product.name}</H6>
                    <Small color="text.secondary">
                      {usdFormatter.format(product.price)} x {product.quantity}
                    </Small>
                  </ProductDetails>

                  <IconButton
                    size="small"
                    onClick={() => handleRemove(product.productId)}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </ProductBox>
              ))}
            </Box>

            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              sx={{ width: "100%", borderRadius: 0 }}
            >
              Checkout ({usdFormatter.format(totalCost)})
            </Button>
          </MiniCart>
        </Drawer>
      </ThemeProvider>
    </Fragment>
  );
};

export default ShoppingCart;

import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { usdFormatter } from "../../../constants";
import { StyledButton } from "../material-kit/buttons/AppButton";

const ProductCard = (props) => {
  const { item, handleAddToCart } = props;
  const [open, setOpen] = useState(false);
  const userId = Cookies.get("user_id");
  const handleClickOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);

  // const handleAddToCart = async (item, e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await post(addToCartApi, { ...item, userId });
  //     if (result.status === true) {
  //       dispatch(
  //         addToCart({
  //           items: [
  //             {
  //               name: item.name,
  //               productId: item._id,
  //               quantity: 1,
  //               price: item.priceSale ? item.priceSale : item.price,
  //               total_price: item.priceSale ? item.priceSale : item.price,
  //               image: item.image,
  //             },
  //           ],
  //         })
  //       );
  //       console.log(1);

  //       dispatch(
  //         setToast({
  //           ...listToast[0],
  //           detail: result.message,
  //         })
  //       );
  //     } else {
  //       dispatch(
  //         setToast({
  //           ...listToast[1],
  //           detail: result.message,
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     dispatch(
  //       setToast({
  //         ...listToast[1],
  //         detail: error,
  //       })
  //     );
  //   }
  // };

  return (
    <>
      <Dialog
        onClose={handleClose}
        maxWidth={"xl"}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Detail
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <img src={item.image} alt={item.name} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom>{item.desc}</Typography>

              <Typography gutterBottom>{item.price}</Typography>

              <Typography gutterBottom>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                cursus magna, vel scelerisque nisl consectetur et. Donec sed
                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ maxWidth: 345, minHeight: 300, ml: 1, mr: 0 }}>
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            height="140"
            image={item.image}
            alt="green iguana"
          />
          <CardContent>
            <Box
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "16px",
                fontFamily: "sans-serif",
              }}
            >
              {item.name}
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                minHeight: 50,
                fontStyle: "italic",
                fontSize: "h7.fontSize",
              }}
            >
              {String(item.desc)?.substring(0, 60)}...
            </Typography>
          </CardContent>
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ display: "inline-block", fontSize: "22px" }}>
              {usdFormatter.format(item.priceSale)}
            </Box>
            <Box
              sx={{
                display: "inline-block",
                ml: 1,
                textDecoration: "line-through",
                color: "#cf0003",
              }}
            >
              {usdFormatter.format(item.price)}
            </Box>
          </Box>
        </CardActionArea>
        <CardActions>
          <Box sx={{ display: "flex", justifyContent: "center", width: 1 }}>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={(e) => handleAddToCart(item, e)}
            >
              <Icon sx={{ my: "auto" }} fontSize="small">
                local_grocery_store
              </Icon>
              <Box sx={{ mx: 1 }}>Add to Cart</Box>
            </StyledButton>
          </Box>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;

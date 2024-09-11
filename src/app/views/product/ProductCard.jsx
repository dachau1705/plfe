import {
  Button,
  CardActionArea,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const ProductCard = (props) => {
  const { item, handleAddToCart } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

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
      <Card sx={{ maxWidth: 345, minHeight: 300 }}>
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            height="140"
            image={item.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minHeight: 50 }}
            >
              {String(item.desc)?.substring(0, 60)}...
            </Typography>
          </CardContent>
          <CardContent>{item.priceSale}</CardContent>
          <CardContent>{item.price}</CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;

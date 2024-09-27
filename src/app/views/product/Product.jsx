import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  Rating,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { get, post } from "api/api";
import { addToCartApi, getAllProduct } from "app/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listToast, usdFormatter } from "../../../constants";
import { addToCart, setToast } from "../../../redux/feature";
import ProductCard from "./ProductCard";

const Product = () => {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("default");
  const [radioValue, setRadioValue] = useState("default");
  const [viewType, setViewType] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const userId = Cookies.get("user_id");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const [render, setRender] = useState(false);

  const categories = [
    { name: "Audio", count: 321 },
    { name: "Fashion", count: 123 },
    { name: "Cellphone", count: 546 },
    { name: "Accessories", count: 76 },
  ];

  const brands = [
    { name: "Microlab", count: 32 },
    { name: "Sony", count: 534 },
    { name: "Beats", count: 23 },
    { name: "Iphone", count: 65 },
    { name: "Comlion", count: 198 },
  ];

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value === "lowest") {
      setData(data.sort((a, b) => b.priceSale - a.priceSale));
    } else if (value === "highest") {
      setData(data.sort((a, b) => a.priceSale - b.priceSale));
    } else setRender((prev) => !prev);
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    console.log(event.target.value);
  };

  const [sliderValue, setSliderValue] = useState([0, 1000000]);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await get(getAllProduct); // Thay thế '/data' bằng endpoint API của bạn
        setData(result);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    }
    fetchData();
  }, [render]);

  useEffect(() => {
    if (viewType === 1) {
      setItemsPerPage(12);
      setCurrentPage(1);
    } else {
      setItemsPerPage(4);
      setCurrentPage(1);
    }
  }, [viewType]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleAddToCart = async (item, e) => {
    e.preventDefault();
    try {
      const result = await post(addToCartApi, { ...item, userId });
      if (result.status === true) {
        dispatch(
          addToCart({
            items: [
              {
                name: item.name,
                productId: item._id,
                quantity: 1,
                price: item.priceSale ? item.priceSale : item.price,
                total_price: item.priceSale ? item.priceSale : item.price,
                image: item.image,
              },
            ],
          })
        );
        console.log(1);

        dispatch(
          setToast({
            ...listToast[0],
            detail: result.message,
          })
        );
      } else {
        dispatch(
          setToast({
            ...listToast[1],
            detail: result.message,
          })
        );
      }
    } catch (error) {
      dispatch(
        setToast({
          ...listToast[1],
          detail: error,
        })
      );
    }
  };

  return (
    <Box sx={{ mx: 10 }}>
      <Box sx={{ my: 2, mx: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ lineHeight: 4 }}>
          <Link underline="hover" to={"/"}>
            HOME
          </Link>
          <Link underline="hover" to="/product/default">
            PRODUCT
          </Link>
          <Typography color="text.primary">ALL</Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ width: 1, ml: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 1,
            gridTemplateRows: "auto",
            gridTemplateAreas: `"sidebar main main main main main"
            "left right right right right right"`,
          }}
        >
          <Box sx={{ gridArea: "sidebar" }}>
            <TextField
              sx={{ bgcolor: "white" }}
              fullWidth
              id="search-input"
              name="query"
              placeholder="Search here..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon fontSize="small">search</Icon>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            sx={{
              gridArea: "main",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <FormControl variant="standard">
              <Select
                sx={{ my: "auto" }}
                value={selectedValue}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                // IconComponent={ArrowDropDownIcon}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="lowest">Lowest Price</MenuItem>
                <MenuItem value="highest">Highest Price</MenuItem>
                {/* Add more MenuItem components as needed */}
              </Select>
            </FormControl>
            <IconButton
              className="button"
              aria-label="View Comfy"
              onClick={() => setViewType(1)}
            >
              <Icon sx={{ my: "auto" }}>view_comfy</Icon>
            </IconButton>
            <IconButton
              className="button"
              aria-label="View List"
              onClick={() => setViewType(2)}
            >
              <Icon>list</Icon>
            </IconButton>
          </Box>
          <Box sx={{ gridArea: "left" }}>
            <Card elevation={5}>
              <Typography
                variant="h7"
                sx={{ p: 2, display: "block", fontWeight: 500 }}
              >
                Price
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="price"
                  name="price"
                  value={radioValue}
                  onChange={handleRadioChange}
                >
                  <FormGroup>
                    <FormControlLabel
                      sx={{ ml: 2, lineHeight: 0.8 }}
                      value="0,10"
                      control={<Radio />}
                      label="<$10"
                    />
                    <FormControlLabel
                      sx={{ ml: 2, lineHeight: 0.8 }}
                      value="10,100"
                      control={<Radio />}
                      label="$10-$100"
                    />
                    <FormControlLabel
                      sx={{ ml: 2, lineHeight: 0.8 }}
                      value="100,500"
                      control={<Radio />}
                      label="$100-$500"
                    />
                    <FormControlLabel
                      sx={{ ml: 2, lineHeight: 0.8 }}
                      value="500"
                      control={<Radio />}
                      label=">$500"
                    />
                    <FormControlLabel
                      sx={{ ml: 2, lineHeight: 0.8 }}
                      value="all"
                      control={<Radio />}
                      label="All"
                    />
                  </FormGroup>
                </RadioGroup>
              </FormControl>
            </Card>
            <Card elevation={5} sx={{ my: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h7"
                  sx={{ p: 2, display: "block", fontWeight: 500 }}
                >
                  Price
                </Typography>
                <Typography sx={{ mr: 1 }}>
                  {usdFormatter.format(sliderValue[0])} -{" "}
                  {usdFormatter.format(sliderValue[1])}
                </Typography>
              </Box>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={sliderValue}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000000}
                />
              </Box>
            </Card>
            <Card elevation={5} sx={{ my: 2 }}>
              <Typography
                variant="h7"
                sx={{ p: 2, display: "block", fontWeight: 500 }}
              >
                Category
              </Typography>
              {categories.map((category) => (
                <Box
                  key={category.name}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mx: 2 }}
                >
                  <FormControlLabel
                    control={<Checkbox name={category.name} />}
                    label={<Typography>{category.name}</Typography>}
                  />
                  <small className="badge">{category.count}</small>
                </Box>
              ))}
            </Card>
            <Card elevation={5} sx={{ my: 2 }}>
              <Typography
                variant="h7"
                sx={{ p: 2, display: "block", fontWeight: 500 }}
              >
                Brands
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>search</Icon>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mx: 2 }}
                />
              </Box>
              {brands.map((brand) => (
                <Box
                  key={brand.name}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mx={2}
                >
                  <FormControlLabel
                    control={<Checkbox name={brand.name} />}
                    label={brand.name}
                  />
                  <small className="badge">{brand.count}</small>
                </Box>
              ))}
            </Card>
          </Box>
          <Box sx={{ gridArea: "right" }}>
            {viewType === 1 ? (
              <Grid container spacing={2}>
                {currentData.map((d, index) => (
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    sx={{ mt: 0.5 }}
                    key={index}
                  >
                    <ProductCard
                      item={d}
                      key={index}
                      handleAddToCart={handleAddToCart}
                    />
                  </Grid>
                ))}
                <Grid container justifyContent="center" sx={{ mt: 4, mb: 2 }}>
                  <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Grid>
              </Grid>
            ) : (
              <>
                {currentData.map((d, index) => {
                  return (
                    <Card elevation={4} sx={{ mb: 2 }}>
                      <Grid container spacing={2} sx={{ my: "auto" }}>
                        {/* Left Section: Product Image and Add to Cart button */}
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          lg={6}
                          padding={2}
                          // sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Box
                            sx={{
                              height: 1,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={d.image}
                              alt={d.name}
                              style={{ width: "95%", height: "300px" }}
                            />
                          </Box>
                        </Grid>

                        {/* Right Section: Product Info */}
                        <Grid item xs={12} sm={6}>
                          <h3>{d.name}</h3>
                          <Box>
                            <Box sx={{ textAlign: "left" }}>
                              <Box
                                sx={{
                                  display: "inline-block",
                                  fontSize: "18px",
                                }}
                              >
                                {usdFormatter.format(d.priceSale)}
                              </Box>
                              <Box
                                sx={{
                                  display: "inline-block",
                                  ml: 1,
                                  textDecoration: "line-through",
                                  fontSize: "14px",
                                  color: "#cf0003",
                                }}
                              >
                                {usdFormatter.format(d.price)}
                              </Box>
                            </Box>
                            <Rating
                              name="read-only"
                              value={4}
                              readOnly
                              size="small"
                              precision={0.5}
                            />
                          </Box>
                          <p>{d.desc}</p>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => handleAddToCart(d, e)}
                            startIcon={<Icon>shopping_cart</Icon>}
                          >
                            Add To Cart
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                  );
                })}
                <Grid container justifyContent="center" sx={{ mt: 4, mb: 2 }}>
                  <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Grid>
              </>
            )}
          </Box>
        </Box>
        {/* <Grid container spacing={2} style={{ padding: "1rem" }}>
          <Grid
            item
            lg={2}
            md={2}
            sm={12}
            xs={12}
            style={{ marginTop: "0.5rem" }}
          >
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}
              ></Box>
              <Box
                sx={{ display: "flex", justifyContent: "start", px: 1, mx: 2 }}
              >
                <Typography id="range-slider" gutterBottom>
                  Temperature range
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "center", px: 1, mx: 2 }}
              >
                <Slider
                  max={100000000}
                  value={filter.price}
                  onChange={(e) =>
                    setFilter({ ...filter, price: e.target.value })
                  }
                  valueLabelDisplay="auto"
                  aria-label="Volume"
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            lg={10}
            md={10}
            sm={12}
            xs={12}
            style={{ marginTop: "0.5rem" }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                {currentData.map((d, index) => (
                  <Grid
                    item
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    sx={{ mt: 0.5 }}
                    key={index}
                  >
                    <ProductCard item={d} key={index} />
                  </Grid>
                ))}
              </Grid>
            </Container>
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Grid>
          </Grid>
        </Grid> */}
      </Box>
    </Box>
  );
};

export default Product;

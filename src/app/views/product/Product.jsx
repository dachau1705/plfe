import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  InputAdornment,
  Pagination,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { get } from "api/api";
import { getAllProduct } from "app/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

// const data = [
//   {
//     id: 1,
//     price: 100,
//     name: "Product 1",
//     src: "https://i.pinimg.com/564x/c2/35/b0/c235b08f99954713a5984ecc52ea82b1.jpg",
//     desc: "Vandalism Alley Animated Stream Overlay Package with futuristic and modern design. Vandalism Alley enhances your live broadcast with a visually stunning overlay. It features vibrant colors, abstract graffiti elements, and sleek geometric patterns that create a mesmerizing backdrop for your content.",
//   },
//   {
//     id: 2,
//     price: 100,
//     name: "Product 2",
//     src: "https://i.pinimg.com/564x/df/7f/56/df7f568e2efe266c8279242d53eef7d8.jpg",
//     desc: "Shop Cute Stream Design by SugarStreamfly. Speedy replies! Has a history of replying to messages quickly. Rave reviews! Average review rating is 4.8 or higher.",
//   },
//   {
//     id: 3,
//     price: 100,
//     name: "Product 3",
//     src: "https://i.pinimg.com/564x/7d/1c/29/7d1c2946c66d02b6e04f8aae0a6082e2.jpg",
//     desc: "Description for Product 3",
//   },
//   {
//     id: 4,
//     name: "Ekko",
//     src: "https://i.pinimg.com/564x/82/04/6d/82046d2736e5ed33cf312995ffb1cc9c.jpg",
//     desc: "Description for Product 4",
//   },
//   {
//     id: 5,
//     name: "Ekko",
//     src: "https://i.pinimg.com/564x/70/1f/30/701f30a176780ec9db925ba985380cf4.jpg",
//     desc: "Description for Product 5",
//   },
//   {
//     id: 6,
//     name: "Yuzhong",
//     src: "https://i.pinimg.com/564x/4f/e7/cd/4fe7cdb16bfc65884f2daa35c737c358.jpg",
//     desc: "Description for Product 6",
//   },
//   {
//     id: 7,
//     name: "Yishushin",
//     src: "https://i.pinimg.com/564x/96/52/93/965293b563f8e617ae9eb70d7043e90f.jpg",
//     desc: "Description for Product 7",
//   },
//   {
//     id: 8,
//     price: 100,
//     name: "Product 8",
//     src: "https://i.pinimg.com/564x/e3/b2/b8/e3b2b8992f488b17d779cd5a0982b5ae.jpg",
//     desc: "Description for Product 8",
//   },
//   {
//     id: 9,
//     price: 100,
//     name: "Product 9",
//     src: "https://i.pinimg.com/564x/74/5b/7f/745b7f0642f806d9dc422b583e450be2.jpg",
//     desc: "Description for Product 9",
//   },
//   {
//     id: 10,
//     price: 100,
//     name: "Product 10",
//     src: "https://i.pinimg.com/564x/8a/fa/ac/8afaac4a8470e5fb2006e688d57baecc.jpg",
//     desc: "Description for Product 10",
//   },
//   {
//     id: 11,
//     price: 100,
//     name: "Product 11",
//     src: "https://i.pinimg.com/564x/5b/fc/55/5bfc55b2bc6ddfe40506d0f0b2bf012a.jpg",
//     desc: "Description for Product 11",
//   },
//   {
//     id: 12,
//     price: 100,
//     name: "Product 12",
//     src: "https://i.pinimg.com/564x/df/8a/76/df8a762b99ed79ac1366d9d82bd43192.jpg",
//     desc: "Description for Product 12",
//   },
//   {
//     id: 13,
//     price: 100,
//     name: "Product 13",
//     src: "https://i.pinimg.com/564x/f8/6b/2f/f86b2f0eda7ec6f75f8c67abde927c31.jpg",
//     desc: "Description for Product 13",
//   },
//   {
//     id: 14,
//     price: 100,
//     name: "Product 14",
//     src: "https://via.placeholder.com/150",
//     desc: "Description for Product 14",
//   },
//   {
//     id: 15,
//     price: 100,
//     name: "Product 15",
//     src: "https://via.placeholder.com/150",
//     desc: "Description for Product 15",
//   },
//   {
//     id: 16,
//     price: 100,
//     name: "Product 16",
//     src: "https://via.placeholder.com/150",
//     desc: "Description for Product 16",
//   },
//   {
//     id: 17,
//     price: 100,
//     name: "Product 17",
//     src: "https://via.placeholder.com/150",
//     desc: "Description for Product 17",
//   },
//   {
//     id: 18,
//     price: 100,
//     name: "Product 18",
//     src: "https://via.placeholder.com/150",
//     desc: "Description for Product 18",
//   },
//   {
//     id: 19,
//     price: 100,
//     name: "Product 19",
//     src: "https://via.placeholder.com/150",
//     desc: "Description for Product 19",
//   },
//   {
//     id: 20,
//     price: 100,
//     name: "Product 20",
//     src: "https://via.placeholder.com/150",
//     desc: "Description for Product 20",
//   },
// ];
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
}));

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await get(getAllProduct); // Thay thế '/data' bằng endpoint API của bạn
        setData(result);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const [filter, setFilter] = useState({});
  return (
    <div sx={{ mx: 10 }}>
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
      <Box sx={{ width: 1, bgcolor: "#E2E2E2", borderRadius: "12px", ml: 2 }}>
        <Grid container spacing={2} sx={{ p: 1 }}>
          <Grid item lg={2} md={2} sm={12} xs={12} sx={{ mt: 0.5 }}>
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}
              >
                <TextField
                  id="input-with-icon-textfield"
                  label="Search ..."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={filter.key_searchs}
                  onChange={(e) =>
                    setFilter({ ...filter, key_searchs: e.target.value })
                  }
                  variant="standard"
                />
              </Box>
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
          <Grid lg={10} md={10} sm={12} xs={12} sx={{ mt: 0.5 }}>
            <Item>
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
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Product;

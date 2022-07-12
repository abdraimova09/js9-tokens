import { Box, Container, Pagination, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { productsContext } from "../../contexts/productsContext";
import Loader from "../Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";

const ProductsList = () => {
  const {
    getProducts,
    products,
    pages,
    loading: productsLoading,
  } = useContext(productsContext);
  const { loading } = useContext(authContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? searchParams.get("page") : 1
  );
  console.log(products);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    setSearchParams({
      page: currentPage,
      title: search,
    });
  }, [currentPage, search]);

  useEffect(() => {
    getProducts();
  }, [searchParams]);
  if (loading || productsLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <Box>
        <TextField value={search} onChange={e => setSearch(e.target.value)} />
      </Box>
      <Box display={"flex"} justifyContent={"center"} flexWrap={"wrap"}>
        {products.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </Box>
      <Pagination
        count={pages}
        page={+currentPage}
        onChange={(e, page) => setCurrentPage(page)}
        color="secondary"
      />
    </Container>
  );
};

export default ProductsList;

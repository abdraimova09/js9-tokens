import { Box, Container, Pagination } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";
import ProductCard from "../ProductCard/ProductCard";

const ProductsList = () => {
  const { getProducts, products, pages } = useContext(productsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? searchParams.get("page") : 1
  );
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    setSearchParams({
      page: currentPage,
    });
  }, [currentPage]);
  useEffect(() => {
    getProducts();
  }, [searchParams]);
  console.log(products, pages);
  return (
    <Container>
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

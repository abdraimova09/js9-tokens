import { Box, Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { productsContext } from "../../contexts/productsContext";
import FavoritesCard from "../FavoritesCard/FavoritesCard";
import ProductCard from "../ProductCard/ProductCard";

const Favorites = () => {
  const { getFavorites, favorites } = useContext(productsContext);
  useEffect(() => {
    getFavorites();
  }, []);
  console.log(favorites);
  return (
    <Container>
      <Box display={"flex"} justifyContent={"center"} flexWrap={"wrap"}>
        {favorites.map(item => (
          <FavoritesCard key={item.id} item={item} />
        ))}
      </Box>
    </Container>
  );
};

export default Favorites;

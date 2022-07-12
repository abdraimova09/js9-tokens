import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { productsContext } from "../../contexts/productsContext";
import Loader from "../Loader/Loader";
import Reviews from "../Reviews/Reviews";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Details = () => {
  const { id } = useParams();
  const { getOneProduct, oneProduct, loading, createReview, toggleLike } =
    useContext(productsContext);
  const { currentUser } = useContext(authContext);
  useEffect(() => {
    getOneProduct(id);
  }, []);
  console.log(oneProduct);

  return loading || !oneProduct ? (
    <Loader />
  ) : (
    <Container>
      <Typography variant="h5">Title: {oneProduct.title}</Typography>
      <Typography variant="h5">Price: {oneProduct.price}</Typography>
      <Typography variant="h5">
        Description: {oneProduct.description}
      </Typography>
      <Typography variant="h5">Author: {oneProduct.author}</Typography>
      <Typography variant="h5">
        Likes:{" "}
        <IconButton onClick={() => toggleLike(id)}>
          <FavoriteIcon color={oneProduct.liked_by_user ? "error" : "black"} />{" "}
        </IconButton>{" "}
        {oneProduct.likes}
      </Typography>
      <img width={"200px"} src={oneProduct.image} alt="" />

      <Reviews reviews={oneProduct.reviews} />
    </Container>
  );
};

export default Details;

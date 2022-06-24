import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";

const AddProduct = () => {
  const { createProduct } = useContext(productsContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  // console.log(image);
  function handleSave() {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", 1);
    formData.append("image", image);
    createProduct(formData);
    navigate("/products");
  }
  return (
    <Container maxWidth="sm">
      <Box display={"flex"} flexDirection={"column"}>
        <Typography variant="h6">Add product</Typography>
        <TextField
          value={title}
          onChange={e => setTitle(e.target.value)}
          label="Title"
          variant="outlined"
        />
        <TextField
          value={description}
          onChange={e => setDescription(e.target.value)}
          label="Description"
          variant="outlined"
        />
        <TextField
          value={price}
          onChange={e => setPrice(e.target.value)}
          label="Price"
          variant="outlined"
        />
        {/* <TextField
          value={category}
          onChange={e => setCategory(e.target.value)}
          label="Category"
          variant="outlined"
        /> */}
        <input type="file" onChange={e => setImage(e.target.files[0])} />
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default AddProduct;

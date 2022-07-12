import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";
import Loader from "../Loader/Loader";

const EditProduct = () => {
  const { id } = useParams();
  const {
    getCategories,
    categories,
    getOneProduct,
    oneProduct,
    updateProduct,
  } = useContext(productsContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  useEffect(() => {
    getCategories();
    getOneProduct(id);
  }, []);
  useEffect(() => {
    if (oneProduct) {
      setTitle(oneProduct.title);
      setDescription(oneProduct.description);
      setPrice(oneProduct.price);
      setCategory(oneProduct.category.id);
    }
  }, [oneProduct]);
  console.log(oneProduct);
  function handleSave() {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", 1);
    if (image) {
      formData.append("image", image);
    }
    updateProduct(formData, id);
    navigate("/products");
  }
  if (!oneProduct) {
    return <Loader />;
  }
  return (
    <Container maxWidth="sm">
      <Box display={"flex"} flexDirection={"column"}>
        <Typography variant="h6">Edit product</Typography>
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

        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={category}
            onChange={e => setCategory(e.target.value)}>
            {categories.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          // accept="image/*"
          style={{ display: "none" }}
          type="file"
          id="button-file"
          onChange={e => setImage(e.target.files[0])}
        />
        <label htmlFor="button-file">
          <IconButton color="primary" component="span">
            Select new
            <PhotoCamera />
          </IconButton>
          {image && <Typography variant="span">{image.name}</Typography>}
        </label>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default EditProduct;

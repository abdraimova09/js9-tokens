import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { productsContext } from "../../contexts/productsContext";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function ProductCard({ item }) {
  const { deleteProduct, toggleLike, toggleFavorites } =
    React.useContext(productsContext);
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 300, margin: "20px" }}>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        height={"50px"}
        maxWidth={"100%"}
        marginBottom={"-10px"}>
        {item.is_author ? (
          <>
            {" "}
            <IconButton onClick={() => deleteProduct(item.id)}>
              <DeleteIcon style={{ color: "black" }} />
            </IconButton>
            <IconButton onClick={() => navigate(`/edit/${item.id}`)}>
              <EditIcon style={{ color: "black" }} />
            </IconButton>
          </>
        ) : null}
      </Box>
      <CardMedia
        component="img"
        style={{ maxWidth: "100%", height: "220px", objectFit: "contain" }}
        image={item.image}
        alt="product"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${item.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {item.category.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {item.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reviews: {item.reviews.length}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          onClick={() => toggleLike(item.id)}
          style={{ color: "black" }}>
          {item.likes}
          <FavoriteIcon color={item.liked_by_user ? "error" : "black"} />
        </IconButton>
        <IconButton onClick={() => toggleFavorites(item.id)}>
          {item.favorite_by_user ? (
            <BookmarkIcon style={{ color: "black" }} />
          ) : (
            <BookmarkBorderIcon style={{ color: "black" }} />
          )}
        </IconButton>
        <IconButton onClick={() => navigate(`/products/${item.id}`)}>
          <UnfoldMoreIcon style={{ color: "black" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

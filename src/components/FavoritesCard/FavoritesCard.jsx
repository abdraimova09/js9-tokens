import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { productsContext } from "../../contexts/productsContext";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
export default function FavoritesCard({ item }) {
  const { toggleFavorites } = React.useContext(productsContext);
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 300, margin: "20px" }}>
      <CardMedia
        component="img"
        s
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
          Category: {item.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {item.author}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={() => toggleFavorites(item.id)}>
          <BookmarkIcon style={{ color: "black" }} />
        </IconButton>
        <IconButton onClick={() => navigate(`/products/${item.id}`)}>
          <UnfoldMoreIcon style={{ color: "black" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

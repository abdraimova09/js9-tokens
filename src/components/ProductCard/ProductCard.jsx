import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { productsContext } from "../../contexts/productsContext";

export default function ProductCard({ item }) {
  const { deleteProduct } = React.useContext(productsContext);
  return (
    <Card sx={{ maxWidth: 345, margin: "20px" }}>
      <CardMedia
        component="img"
        height="140"
        image={item.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {item.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {item.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {item.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Likes: {item.likes}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reviews: {item.reviews}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => deleteProduct(item.id)}>
          Delete
        </Button>
        <Button size="small">Edit</Button>
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
}

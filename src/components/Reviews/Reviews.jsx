import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Box, Button, TextField, Typography } from "@mui/material";
import { productsContext } from "../../contexts/productsContext";
import { useParams } from "react-router-dom";
import { authContext } from "../../contexts/authContext";

export default function Reviews({ reviews }) {
  const { deleteReview, createReview, updateReview } =
    React.useContext(productsContext);
  const { id } = useParams();

  const { currentUser } = React.useContext(authContext);
  const [editReview, setEditReview] = React.useState("");
  const [editId, setEditId] = React.useState("");
  const [review, setReview] = React.useState("");
  function handleSave() {
    const newReview = {
      text: review,
      product: id,
    };
    createReview(newReview);
    setReview("");
  }
  function handleSaveEdit() {
    const editedReview = {
      text: editReview,
      product: id,
    };
    updateReview(editedReview, editId);
  }
  return (
    <>
      {" "}
      <Typography variant="h5">Reviews ({reviews.length})</Typography>
      {editReview ? (
        <Box display={"flex"}>
          <TextField
            value={editReview}
            onChange={e => setEditReview(e.target.value)}
            variant="outlined"
            label="Edit review"
          />
          <Button
            onClick={handleSaveEdit}
            variant={currentUser ? "outlined" : "disabled"}
            disabled={!currentUser}>
            Save
          </Button>
          <Button
            color="error"
            onClick={() => setEditReview("")}
            variant={currentUser ? "outlined" : "disabled"}
            disabled={!currentUser}>
            Close
          </Button>
        </Box>
      ) : (
        <Box display={"flex"}>
          <TextField
            value={review}
            onChange={e => setReview(e.target.value)}
            variant="outlined"
            label="New review"
          />
          <Button
            onClick={handleSave}
            variant={currentUser ? "outlined" : "disabled"}
            disabled={!currentUser}>
            Post
          </Button>
        </Box>
      )}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {reviews.map(item => (
          <Box key={item.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={item.author} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={item.author}
                secondary={
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}>
                    <Typography variant="p">{item.text}</Typography>
                    {item.is_author ? (
                      <Box>
                        <Button
                          onClick={() => deleteReview(item.id, id)}
                          variant="outlined"
                          color="error">
                          Delete
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setEditReview(item.text);
                            setEditId(item.id);
                          }}>
                          Edit
                        </Button>
                      </Box>
                    ) : null}
                  </Box>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Box>
        ))}
      </List>
    </>
  );
}

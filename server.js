const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
mongoose.connect(
  "mongodb://localhost:27017/test",
  { useNewUrlParser: true }
);
const Comment = mongoose.model("Comment", { username: String, text: String });
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("this is my mofo backend");
});

app.post("/addComment", (req, res) => {
  const username = req.body.username;
  const text = req.body.text;

  if (!username) {
    res.status(422);
    res.json({ error: "YOU DONT HAVE USERNAME SET" });
    return;
  }

  if (!text) {
    res.status(422);
    res.json({ error: "YOU DONT HAVE TEXT SET" });
  }
  const comment = new Comment({ username: username, text: text });
  comment.save().then(() => console.log(comment));
  Comment.find({}, (err, comments) => {
    if (err) return err;
    res.json(comments);
  });
});

app.get("/addComment", (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) return err;
    res.json(comments);
  });
});

app.delete("/deleteComment/:id", (req, res) => {
  Comment.findOneAndDelete({ _id: req.params.id }, (err, comments) => {
    if (err) return err;
    Comment.find({}, (err, comments) => {
      if (err) return err;
      res.json(comments);
    });
  });
});

app.listen(5001, () => console.log("listening on port 5001...."));

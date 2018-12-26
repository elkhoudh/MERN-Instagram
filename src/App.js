import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

class App extends Component {
  state = {
    username: "",
    text: "",
    data: []
  };

  componentDidMount = () => {
    this.getData();
  };
  resetForm = () => {
    this.setState({ username: "", text: "" });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getData = () => {
    const proxy = "https://cors-anywhere.herokuapp.com/",
      url = "http://71.65.239.221:5001/addComment";
    fetch(proxy + url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ data }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const proxy = "https://cors-anywhere.herokuapp.com/",
      url = "http://71.65.239.221:5001/addComment";
    fetch(proxy + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(
        () => this.setState({ username: "", text: "" }),
        this.getData(),
        this.resetForm()
      );
  };

  handleDelete = id => {
    const proxy = "https://cors-anywhere.herokuapp.com/",
      url = `http://71.65.239.221:5001/deleteComment/${id}`;
    fetch(proxy + url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(() => this.getData());
  };

  render() {
    const { data } = this.state;
    const { classes } = this.props;

    return (
      <div className="App">
        <NavBar />

        <form onSubmit={this.handleSubmit}>
          <TextField
            required
            id="standard-required"
            label="Username"
            className={classes.textField}
            onChange={this.handleChange}
            margin="normal"
            name="username"
            value={this.state.username}
          />
          <TextField
            required
            id="standard-required"
            label="Comment"
            onChange={this.handleChange}
            className={classes.textField}
            margin="normal"
            name="text"
            value={this.state.text}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleSubmit}
          >
            Add Comment
          </Button>
        </form>

        {!data ? (
          <h1>Loading Data...</h1>
        ) : (
          data.map(comment => (
            <List className={classes.root} key={comment._id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Delete Image || Hamza Elkhoudiri"
                    src="https://vignette.wikia.nocookie.net/robloxcreepypasta/images/8/8c/Delete.png/revision/latest?cb=20180119171940"
                    onClick={() => this.handleDelete(comment._id)}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.text}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {comment.username}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
            // <div key={comment._id} className="comment">
            //   <h1>{comment.username}</h1>
            //   <h2>{comment.text}</h2>
            //   <button onClick={() => this.handleDelete(comment._id)}>X</button>
            // </div>
          ))
        )}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);

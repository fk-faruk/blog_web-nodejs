const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();
const _ = require("lodash");

const text1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const text2 =
  "fucker the cociety Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const text3 =
  "bull shsit my nigga Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //   let faruk = "bl,jl";
  res.render("index", { header: text1, posts: posts });

  // console.log(posts);
});

app.get("/about", (req, res) => {
  res.render("about", { header: text2 });
});

app.get("/contact", (req, res) => {
  res.render("contact", { header2: text3 });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  let messages = {
    newCompose: req.body.compose,
    newMessage: req.body.message,
  };

  posts.push(messages);

  // console.log(posts);
  res.redirect("/");
  // console.log(messages);
  // res.write("thank you , your input is well received");
  // res.send();
});

app.get("/posts/:newUser", (req, res) => {
  let newpara = _.lowerCase(req.params.newUser);

  posts.forEach((post) => {
    let compose = _.lowerCase(post.newCompose);
    // console.log(compose);
    if (newpara === compose) {
      res.render("post", {
        phead: post.newCompose,
        pbody: post.newMessage,
      });
    }
  });
  // let Compose = _.lowerCase(posts.newCompose);
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

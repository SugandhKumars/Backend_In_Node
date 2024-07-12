const express = require("express");
const app = express();
let users = require("./MOCK_DATA.json");
const fs = require("fs");
const { json } = require("express/lib/response");
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Welcome ");
});
// Gettin all the uses in json
app.get("/api/users", (req, res) => {
  res.json(users);
});
// Getting all the users in HTML
app.get("/users", (Req, res) => {
  let html = `<ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  res.send(html);
});
// Getting users by id

// app.get("/api/users/:id", (req, res) => {
//   let id = Number(req.params.id);
//   let user = users.find((use) => use.id === id);
// });

app
  .route("/api/users/:id")
  .get((req, res) => {
    let id = Number(req.params.id);
    let user = users.find((use) => use.id === id);
    res.json(user);
  })
  .delete((req, res) => {
    let id = Number(req.params.id);
    let newUsers = users.filter((user) => user.id !== id);
    users = newUsers;

    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(newUsers));
    res.json({ Status: "Deleted", id: id });
    console.log(newUsers);
  })
  .patch((req, res) => {
    let id = Number(req.params.id);
    let user = users.find((use) => use.id === id);
    if (user) {
      Object.assign(user, req.body);
      console.log(users);
      fs.writeFile(".MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
          res.json({ err: err.message });
        } else {
          res.json({ status: "updated", id: id });
        }
      });
      console.log(user);
    }
  });

// add a new user
app.post("/api/users", (req, res) => {
  let body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, result) => {
    return res.json({ status: "Added", id: users.length });
  });
});

// Delete a user by id

// app.delete("/api/users/:id", (req, res) => {
//   res.send({ status: "pending" });
// });

// Editing a user by id

// app.patch("/app/users/:id", (req, res) => {
//   res.send({ status: "pending" });
// });

app.listen(3000, () => {
  console.log("server Started");
});

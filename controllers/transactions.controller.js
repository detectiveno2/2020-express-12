const shortid = require("shortid");

const db = require("../db");

module.exports.index = (req, res) => {
  res.render("transactions/index", {
    transactions: db.get("transactions").value()
  });
};

module.exports.create = (req, res) => {
  res.render("transactions/create", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
};

module.exports.postCreate = (req, res) => {
  let user = db
    .get("users")
    .find({ id: req.body.userId })
    .value();
  let book = db
    .get("books")
    .find({ id: req.body.bookId })
    .value();
  let transaction = {
    id: shortid.generate(),
    content: `${user.name} got ${book.title}.`,
    isComplete: false
  };
  db.get("transactions")
    .push(transaction)
    .write();
  res.redirect("/transactions");
};

module.exports.complete = (req, res) => {
  db.get("transactions")
    .find({ id: req.params.id })
    .assign({ isComplete: true })
    .write();
  res.redirect("/transactions");
};

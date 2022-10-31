const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data.toString())))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data.toString()))
    .then((data) => data.find((el) => el.id === contactId))
    .then((el) => console.table(el))
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data.toString()))
    .then((data) => data.filter((el) => el.id !== contactId))
    .then((res) => JSON.stringify(res))
    .then((data) => fs.writeFile(contactsPath, data))
    .then((data) =>
      fs
        .readFile(contactsPath)
        .then((data) => console.table(JSON.parse(data.toString())))
    )
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data.toString()))
    .then((data) => [...data, { id: uid(10), name, email, phone }])
    .then((res) => JSON.stringify(res))
    .then((data) => fs.writeFile(contactsPath, data))
    .then((data) =>
      fs
        .readFile(contactsPath)
        .then((data) => console.table(JSON.parse(data.toString())))
    )
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

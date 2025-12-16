const notFound = (req, res) => {
  res.status(404).send("Can't find or get resource");
};

module.exports = notFound;

const Error404 = async (req, res) => {
  await res.status(404).json({ message: "route not available" });
};
module.exports = Error404;

module.exports = {
  show: (req, res) => {
    res.status(200).render("dashboard", {
      title: "Inventario",
      background: "none",
      username: req.session.name,
      currentPage: 0,
    });
  },
};

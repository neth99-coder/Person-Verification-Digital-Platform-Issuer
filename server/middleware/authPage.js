const authPage = (permissons) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (permissons.includes(userRole)) {
      // console.log("Access Granted");
      next();
    } else {
      // console.log("Access Denied");
      return res.status(403).send("Access Denied");
    }
  };
};

module.exports = authPage;

exports.contactUs = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contactus.html"));
};

exports.success = (req, res, next) => {
  res.send("<h1>Form successfuly filled</h1>");
};

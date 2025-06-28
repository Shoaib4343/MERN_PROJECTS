const checkFile = (fieldName = "file") => {
  return (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: `${fieldName} is required` });
    }
    next();
  };
};

module.exports = checkFile;

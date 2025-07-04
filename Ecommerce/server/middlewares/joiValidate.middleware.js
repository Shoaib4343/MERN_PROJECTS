

// validate the scheam
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(401).json({
        error: error.details[0].message,
      });
    }
    
   
    next();
  };
};



module.exports = { validate };

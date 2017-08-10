module.exports = ({ user }, response, next) =>
  user ? next() : response.status(401).send({ message: 'Unauthanticated!' });

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
  });
  return User;
};

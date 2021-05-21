module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      nom: {
        type: Sequelize.STRING(24),
        allowNull: false,
        defaultValue: "",
      },

      prenom: {
        type: Sequelize.STRING(24),
        allowNull: false,
        defaultValue: "",
      },

      email: {
        type: Sequelize.STRING(64),
        allowNull: false,
        defaultValue: "",
      },

      mot_de_passe: {
        type: Sequelize.STRING(24),
        allowNull: false,
        defaultValue: "",
      },

      mot_de_passe_confirmation: {
        type: Sequelize.STRING(24),
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      //Indiquez le nom de la table dans mysql
      tableName: "users",
    }
  );

  return User;
};

module.exports = (sequelize, Sequelize) => {
    const Messagerie = sequelize.define(
        "Messagerie",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            contenu: {
                type: Sequelize.STRING(250),
                allowNull: false,
                defaultValue: "",
            }

        },

        {
            //Indiquez le nom de la table dans mysql
            tableName: "messagerie",
        }
    );

    return Messagerie;
};
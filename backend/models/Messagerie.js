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

            expediteur: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: "",
            },

            destinataire: {
                type: Sequelize.STRING(30),
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
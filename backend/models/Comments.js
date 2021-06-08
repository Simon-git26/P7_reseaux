module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define(
        "Comments",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            comments: {
                type: Sequelize.STRING(250),
                allowNull: false,
                defaultValue: "",
            },
        },

        {
            //Indiquez le nom de la table dans mysql
            tableName: "comments",
        }
    );

    return Comments;
};
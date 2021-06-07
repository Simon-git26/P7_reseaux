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

            userId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
            },

            postId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
            },

            commentaires: {
                type: Sequelize.STRING(250),
                allowNull: false,
                defaultValue: "",
            },
        }
    );

    return Comments;
};
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define(
        "Post",
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

            post: {
                type: Sequelize.STRING(250),
                allowNull: false,
                defaultValue: "",
            },
        }
    );

    return Post;
};
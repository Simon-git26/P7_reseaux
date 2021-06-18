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

            post: {
                type: Sequelize.STRING(250),
                allowNull: false,
                defaultValue: "",
            },

            imageUrl: {
                type: Sequelize.STRING(150),
                allowNull: true,
                defaultValue: ""
            }
        },

        {
            //Indiquez le nom de la table dans mysql
            tableName: "posts",
        }
    );

    return Post;
};
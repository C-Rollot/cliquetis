module.exports = (sequelize, DataTypes) => {
  
  // Define the 'posts' table in Sequelize
    const Post = sequelize.define('Post', {
      pseudo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      histoire: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      allowVideo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "allow_video"
      }
    },{
    tableName: "posts",
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at', 
    updatedAt: 'updated_at'  
  });
  
    return Post;
  };
  
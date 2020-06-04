/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_duplicator_pro_entities', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		type: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		data: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'wp_duplicator_pro_entities',
		timestamps: false
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_revslider_css', {
		id: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			autoIncrement: true
		},
		handle: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		settings: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		hover: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		advanced: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		params: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'wp_revslider_css',
		timestamps: false
	});
};

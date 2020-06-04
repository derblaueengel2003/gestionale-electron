/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_revslider_navigations', {
		id: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(191),
			allowNull: false
		},
		handle: {
			type: DataTypes.STRING(191),
			allowNull: false
		},
		css: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		markup: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		settings: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'wp_revslider_navigations',
		timestamps: false
	});
};

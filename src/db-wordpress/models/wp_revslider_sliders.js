/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_revslider_sliders', {
		id: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			autoIncrement: true
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		alias: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		params: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		settings: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(191),
			allowNull: false,
			defaultValue: ''
		}
	}, {
		tableName: 'wp_revslider_sliders',
		timestamps: false
	});
};

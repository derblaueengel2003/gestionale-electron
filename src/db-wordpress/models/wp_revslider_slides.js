/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_revslider_slides', {
		id: {
			type: DataTypes.INTEGER(9),
			allowNull: false,
			autoIncrement: true
		},
		slider_id: {
			type: DataTypes.INTEGER(9),
			allowNull: false
		},
		slide_order: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		params: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		layers: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		settings: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'wp_revslider_slides',
		timestamps: false
	});
};

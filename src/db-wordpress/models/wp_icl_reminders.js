/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_reminders', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		can_delete: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		show: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		}
	}, {
		tableName: 'wp_icl_reminders',
		timestamps: false
	});
};

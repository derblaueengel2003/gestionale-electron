/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_core_status', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		rid: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		module: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		origin: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		target: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(6),
			allowNull: false
		}
	}, {
		tableName: 'wp_icl_core_status',
		timestamps: false
	});
};

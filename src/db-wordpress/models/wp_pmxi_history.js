/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_pmxi_history', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		import_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		type: {
			type: DataTypes.ENUM('manual','processing','trigger','continue',''),
			allowNull: false,
			defaultValue: ''
		},
		time_run: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		summary: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'wp_pmxi_history',
		timestamps: false
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_pmxi_files', {
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
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		path: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		registered_on: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		}
	}, {
		tableName: 'wp_pmxi_files',
		timestamps: false
	});
};

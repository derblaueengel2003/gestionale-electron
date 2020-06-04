/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_string_positions', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		string_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		kind: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		position_in_page: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'wp_icl_string_positions',
		timestamps: false
	});
};

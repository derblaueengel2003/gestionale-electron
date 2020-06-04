/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_node', {
		nid: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		md5: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		links_fixed: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'wp_icl_node',
		timestamps: false
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_content_status', {
		rid: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		nid: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false
		},
		md5: {
			type: DataTypes.STRING(32),
			allowNull: false
		}
	}, {
		tableName: 'wp_icl_content_status',
		timestamps: false
	});
};

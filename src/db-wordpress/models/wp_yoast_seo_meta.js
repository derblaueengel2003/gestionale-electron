/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_yoast_seo_meta', {
		object_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		internal_link_count: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true
		},
		incoming_link_count: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true
		}
	}, {
		tableName: 'wp_yoast_seo_meta',
		timestamps: false
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_yoast_seo_links', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		url: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		post_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		target_post_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		type: {
			type: DataTypes.STRING(8),
			allowNull: false
		}
	}, {
		tableName: 'wp_yoast_seo_links',
		timestamps: false
	});
};

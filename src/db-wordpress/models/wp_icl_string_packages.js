/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_string_packages', {
		ID: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		kind_slug: {
			type: DataTypes.STRING(160),
			allowNull: false
		},
		kind: {
			type: DataTypes.STRING(160),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(160),
			allowNull: false
		},
		title: {
			type: DataTypes.STRING(160),
			allowNull: false
		},
		edit_link: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		view_link: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		post_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		word_count: {
			type: DataTypes.STRING(2000),
			allowNull: true
		}
	}, {
		tableName: 'wp_icl_string_packages',
		timestamps: false
	});
};

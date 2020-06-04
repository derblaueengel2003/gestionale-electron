/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_string_pages', {
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
		url_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		}
	}, {
		tableName: 'wp_icl_string_pages',
		timestamps: false
	});
};

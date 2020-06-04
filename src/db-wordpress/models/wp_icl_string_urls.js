/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_string_urls', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		language: {
			type: DataTypes.STRING(7),
			allowNull: true
		},
		url: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'wp_icl_string_urls',
		timestamps: false
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_locale_map', {
		code: {
			type: DataTypes.STRING(7),
			allowNull: false
		},
		locale: {
			type: DataTypes.STRING(35),
			allowNull: false
		}
	}, {
		tableName: 'wp_icl_locale_map',
		timestamps: false
	});
};

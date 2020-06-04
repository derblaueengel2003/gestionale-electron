/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_languages_translations', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		language_code: {
			type: DataTypes.STRING(7),
			allowNull: false
		},
		display_language_code: {
			type: DataTypes.STRING(7),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'wp_icl_languages_translations',
		timestamps: false
	});
};

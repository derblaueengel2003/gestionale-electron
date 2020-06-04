/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_languages', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		code: {
			type: DataTypes.STRING(7),
			allowNull: false,
			unique: true
		},
		english_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
			unique: true
		},
		major: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		},
		active: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		default_locale: {
			type: DataTypes.STRING(35),
			allowNull: true
		},
		tag: {
			type: DataTypes.STRING(35),
			allowNull: true
		},
		encode_url: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'wp_icl_languages',
		timestamps: false
	});
};

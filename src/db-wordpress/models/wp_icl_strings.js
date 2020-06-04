/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_strings', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		language: {
			type: DataTypes.STRING(7),
			allowNull: false
		},
		context: {
			type: DataTypes.STRING(160),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(160),
			allowNull: false
		},
		value: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		string_package_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		location: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(40),
			allowNull: false,
			defaultValue: 'LINE'
		},
		title: {
			type: DataTypes.STRING(160),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		gettext_context: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		domain_name_context_md5: {
			type: DataTypes.STRING(32),
			allowNull: false,
			unique: true
		},
		word_count: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true
		},
		translation_priority: {
			type: DataTypes.STRING(160),
			allowNull: false
		}
	}, {
		tableName: 'wp_icl_strings',
		timestamps: false
	});
};

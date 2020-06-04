/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_translations', {
		translation_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		element_type: {
			type: DataTypes.STRING(60),
			allowNull: false,
			defaultValue: 'post_post'
		},
		element_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		trid: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		language_code: {
			type: DataTypes.STRING(7),
			allowNull: false
		},
		source_language_code: {
			type: DataTypes.STRING(7),
			allowNull: true
		}
	}, {
		tableName: 'wp_icl_translations',
		timestamps: false
	});
};

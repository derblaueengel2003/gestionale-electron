/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_string_translations', {
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
		language: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		value: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		mo_string: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		translator_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		translation_service: {
			type: DataTypes.STRING(16),
			allowNull: false,
			defaultValue: ''
		},
		batch_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		translation_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'wp_icl_string_translations',
		timestamps: false
	});
};

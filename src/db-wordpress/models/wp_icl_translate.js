/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_translate', {
		tid: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		job_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		content_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		field_type: {
			type: DataTypes.STRING(160),
			allowNull: false
		},
		field_format: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		field_translate: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		field_data: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		field_data_translated: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		field_finished: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'wp_icl_translate',
		timestamps: false
	});
};

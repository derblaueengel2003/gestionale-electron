/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_string_status', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		rid: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		string_translation_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		md5: {
			type: DataTypes.STRING(32),
			allowNull: false
		}
	}, {
		tableName: 'wp_icl_string_status',
		timestamps: false
	});
};

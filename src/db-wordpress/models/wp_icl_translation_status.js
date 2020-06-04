/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_translation_status', {
		rid: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		translation_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			unique: true
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		translator_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		needs_update: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		md5: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		translation_service: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		batch_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		translation_package: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		links_fixed: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		},
		_prevstate: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		uuid: {
			type: DataTypes.STRING(36),
			allowNull: true
		}
	}, {
		tableName: 'wp_icl_translation_status',
		timestamps: false
	});
};

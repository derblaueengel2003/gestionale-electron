/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_message_status', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		rid: {
			type: DataTypes.BIGINT,
			allowNull: false,
			unique: true
		},
		object_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		from_language: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		to_language: {
			type: DataTypes.STRING(10),
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
		},
		object_type: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(6),
			allowNull: false
		}
	}, {
		tableName: 'wp_icl_message_status',
		timestamps: false
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_mc4wp_log', {
		ID: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		email_address: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		list_id: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		type: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		merge_fields: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		interests: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		status: {
			type: DataTypes.STRING(60),
			allowNull: true
		},
		email_type: {
			type: DataTypes.STRING(4),
			allowNull: true
		},
		ip_signup: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		language: {
			type: DataTypes.STRING(60),
			allowNull: true
		},
		vip: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		related_object_ID: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		url: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		datetime: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		success: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '1'
		}
	}, {
		tableName: 'wp_mc4wp_log',
		timestamps: false
	});
};

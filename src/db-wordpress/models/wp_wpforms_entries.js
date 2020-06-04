/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_wpforms_entries', {
		entry_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		form_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		post_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		status: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		type: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		viewed: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		},
		starred: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		},
		fields: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		meta: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		date_modified: {
			type: DataTypes.DATE,
			allowNull: false
		},
		ip_address: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		user_agent: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		user_uuid: {
			type: DataTypes.STRING(36),
			allowNull: false
		}
	}, {
		tableName: 'wp_wpforms_entries',
		timestamps: false
	});
};

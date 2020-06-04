/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_wpforms_entry_meta', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		entry_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		form_id: {
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
		data: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'wp_wpforms_entry_meta',
		timestamps: false
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_wpforms_entry_fields', {
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
		field_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		value: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'wp_wpforms_entry_fields',
		timestamps: false
	});
};

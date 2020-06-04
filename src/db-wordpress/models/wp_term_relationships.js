/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_term_relationships', {
		object_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0',
			primaryKey: true
		},
		term_taxonomy_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0',
			primaryKey: true
		},
		term_order: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'wp_term_relationships',
		timestamps: false
	});
};

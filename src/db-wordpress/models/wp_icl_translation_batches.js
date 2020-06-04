/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_translation_batches', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		batch_name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		tp_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		ts_url: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		last_update: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'wp_icl_translation_batches',
		timestamps: false
	});
};

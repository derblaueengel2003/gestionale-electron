/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_pmxi_posts', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		post_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		import_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		unique_key: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		product_key: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		iteration: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		specified: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'wp_pmxi_posts',
		timestamps: false
	});
};

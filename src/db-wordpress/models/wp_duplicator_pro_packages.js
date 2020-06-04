/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_duplicator_pro_packages', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(250),
			allowNull: false
		},
		hash: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		owner: {
			type: DataTypes.STRING(60),
			allowNull: false
		},
		package: {
			type: "MEDIUMBLOB",
			allowNull: false
		}
	}, {
		tableName: 'wp_duplicator_pro_packages',
		timestamps: false
	});
};

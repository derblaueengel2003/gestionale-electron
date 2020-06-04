/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_flags', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		lang_code: {
			type: DataTypes.STRING(10),
			allowNull: false,
			unique: true
		},
		flag: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		from_template: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'wp_icl_flags',
		timestamps: false
	});
};

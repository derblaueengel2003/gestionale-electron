/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_pmxi_templates', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		options: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		scheduled: {
			type: DataTypes.STRING(64),
			allowNull: false,
			defaultValue: ''
		},
		name: {
			type: DataTypes.STRING(200),
			allowNull: false,
			defaultValue: ''
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		is_keep_linebreaks: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		is_leave_html: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		fix_characters: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		meta: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'wp_pmxi_templates',
		timestamps: false
	});
};

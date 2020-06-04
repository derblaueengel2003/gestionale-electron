/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_translate_job', {
		job_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		rid: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		translator_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		translated: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: false,
			defaultValue: '0'
		},
		manager_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		revision: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true
		},
		title: {
			type: DataTypes.STRING(160),
			allowNull: true
		},
		deadline_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		completed_date: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'wp_icl_translate_job',
		timestamps: false
	});
};

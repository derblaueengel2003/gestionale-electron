/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_icl_mo_files_domains', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		file_path: {
			type: DataTypes.STRING(250),
			allowNull: false
		},
		file_path_md5: {
			type: DataTypes.STRING(32),
			allowNull: false,
			unique: true
		},
		domain: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: 'not_imported'
		},
		num_of_strings: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		last_modified: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		component_type: {
			type: DataTypes.ENUM('plugin','theme','other'),
			allowNull: false,
			defaultValue: 'other'
		},
		component_id: {
			type: DataTypes.STRING(100),
			allowNull: true
		}
	}, {
		tableName: 'wp_icl_mo_files_domains',
		timestamps: false
	});
};

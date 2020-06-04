/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_pmxi_imports', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		parent_import_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		friendly_name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		type: {
			type: DataTypes.STRING(32),
			allowNull: false,
			defaultValue: ''
		},
		feed_type: {
			type: DataTypes.ENUM('xml','csv','zip','gz',''),
			allowNull: false,
			defaultValue: ''
		},
		path: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		xpath: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		options: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		registered_on: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		root_element: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		processing: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		executing: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		triggered: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		queue_chunk_number: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		first_import: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		count: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		imported: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		created: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		updated: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		skipped: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		deleted: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		},
		canceled: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		canceled_on: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		failed: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		failed_on: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		settings_update_on: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		last_activity: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		},
		iteration: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'wp_pmxi_imports',
		timestamps: false
	});
};

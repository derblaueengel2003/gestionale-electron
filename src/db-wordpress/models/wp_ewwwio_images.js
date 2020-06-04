/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wp_ewwwio_images', {
		id: {
			type: DataTypes.INTEGER(14).UNSIGNED,
			allowNull: false,
			autoIncrement: true
		},
		attachment_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		gallery: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		resize: {
			type: DataTypes.STRING(75),
			allowNull: true
		},
		path: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		converted: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		results: {
			type: DataTypes.STRING(75),
			allowNull: false
		},
		image_size: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true
		},
		orig_size: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true
		},
		backup: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		level: {
			type: DataTypes.INTEGER(5).UNSIGNED,
			allowNull: true
		},
		pending: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		updates: {
			type: DataTypes.INTEGER(5).UNSIGNED,
			allowNull: true
		},
		updated: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: '1970-12-31 23:00:00'
		},
		trace: {
			type: "BLOB",
			allowNull: true
		}
	}, {
		tableName: 'wp_ewwwio_images',
		timestamps: false
	});
};

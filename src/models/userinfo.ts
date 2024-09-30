import {
    AllowNull,
    AutoIncrement,
    BeforeCreate,
    Column,
    CreatedAt,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import { UserInfoAttributes } from "../utility/type";

@Table({
    timestamps: false,
    tableName: "logininfo",
    modelName: "LoginInfoModel",
})
class LoginInfoModel extends Model<UserInfoAttributes> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    })
    id?: string;

    @Column({
        type: DataType.STRING,
    })
    userid!: string;

    @Column({
        type: DataType.STRING,
    })
    txt!: string;
}

export default LoginInfoModel;

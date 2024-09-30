import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  HasMany,
} from "sequelize-typescript";
import { UserAttributes } from "../utility/type";
// import Tour from "./Tour";

@Table({
  timestamps: true,
  tableName: "users",
  modelName: "UserModel",
})

class UserModel extends Model<UserAttributes> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.DATE,
  })
  dob!: Date;

  @Column({
    type: DataType.STRING,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
  })
  gender!: string;

  @Column({
    type: DataType.STRING,
  })
  address!: string;
}
 

export default UserModel;
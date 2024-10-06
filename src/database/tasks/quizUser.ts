import {
    AllowNull,
    Column,
    CreatedAt,
    DataType,
    Model,
    PrimaryKey,
    Sequelize,
    Table,
    Unique,
    UpdatedAt,
} from "sequelize-typescript";
import { quizUserAttributes } from "../../utility/type";

@Table({
    timestamps: true,
    tableName: "quiz_users",
    modelName: "QuizUserModel",
})
class QuizUserModel extends Model<quizUserAttributes> {
    @Column({
        primaryKey: true,
        type: DataType.BIGINT,
        autoIncrement: true,
    })
    id?: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    quiz_user_name!: string;


    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    quiz_user_mobile!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    quiz_user_date_of_birth!: Date;

    @Column({
        type: DataType.ENUM('male', 'female', 'common'),
        allowNull: false,
    })
    quiz_user_gender!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    quiz_user_address!: Text;

    @Column({
        field: 'created_at',
        type: DataType.DATE,
    })
    createdAt!: Date;

    @Column({
        field: 'updated_at',
        type: DataType.DATE,
    })
    updatedAt!: Date;

}

export default QuizUserModel;

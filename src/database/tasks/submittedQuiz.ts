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

@Table({
    timestamps: true,
    tableName: "quiz_submit_evaluation",
    modelName: "QuizSubmitModel",
})
class QuizSubmitModel extends Model {
    @Column({
        primaryKey: true,
        type: DataType.BIGINT,
        autoIncrement: true,
    })
    id?: number;

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
      })
      quiz_id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    question!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    question_id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    quiz_user_mobile!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    answer!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    user_answer!: string;

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

export default QuizSubmitModel;

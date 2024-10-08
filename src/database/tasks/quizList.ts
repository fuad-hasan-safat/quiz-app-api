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
    tableName: "quiz_list",
    modelName: "QuizListModel",
})
class QuizListModel extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        unique: true,
      })
      id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    quiz_user_mobile!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    totat_question!: Number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    obtained_marks!: Number;

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

export default QuizListModel;

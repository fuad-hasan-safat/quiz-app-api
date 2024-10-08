import {
    Table,
    Column,
    Model,
    DataType,
} from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "quiz_question_bank_tbl",
    modelName: "QuizQuestionBank",
})
class QuizQuestionBank extends Model {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: bigint;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    answer!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    attachment_url!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    difficulty!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    option_1!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    option_2!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    option_3!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    option_4!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    quiz_point!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: '0',
    })
    status!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    title!: string;

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

export default QuizQuestionBank;

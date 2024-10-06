import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    Sequelize,
} from "sequelize-typescript";
import { QuizQuestionAttributes } from "../../utility/type";

@Table({
    timestamps: true,
    tableName: "quiz_question_tbl",
    modelName: "QuizQuestion",
})
class QuizQuestion extends Model<QuizQuestionAttributes> {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    })
    id?: bigint;

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    quiz_innings!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    quiz_name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    question_id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    question_title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    question_type?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    question_option_1?: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    question_option_2?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    question_option_3?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    question_option_4?: string;
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    question_answer?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    question_point!: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    question_description?: Text;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    question_attachment_url?: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    question_status!: number;

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

export default QuizQuestion;

export interface UserAttributes {
    id: string;
    name: string;
    phone: string;
    dob: Date;
    password: string;
    address: string;
    gender: string;
  }

  export interface quizUserAttributes{
    name: string;
    mobile: string;
    dateOfBirth: Date;
    gender: string;
    address: Text;
    created_at: Date;
    updated_at: Date;
  }

  export interface QuizQuestionAttributes {
    id?: number; // Auto-incrementing, so this can be optional
    question_id?: string; // Nullable
    question_answer?: string; // Nullable
    question_attachment_url?: string; // Nullable
    question_description?: string; // Nullable
    question_option_1?: string; // Nullable
    question_option_2?: string; // Nullable
    question_option_3?: string; // Nullable
    question_option_4?: string; // Nullable
    question_point?: number; // Nullable
    question_status?: number; // Defaults to 0, so nullable here
    question_title?: string; // Nullable
    question_type?: string; // Nullable
    quiz_innings?: string; // Nullable
    quiz_name?: string; // Nullable
    createdAt?: Date; // Auto-managed by Sequelize
    updatedAt?: Date; // Auto-managed by Sequelize
}


  export interface UserInfoAttributes {
    id?: number;
    userid: string;
    txt: string;
  }

  export interface SubmitAnswerBody {
    answer: {
      questionId: string;
      userAnswer: string;
      questiontype: string;
  }[];
}

  export interface dbConfig{
    db_host: string;
    db_user: string;
    db_pass: string;
    db_name: string;
    db_port: string;
    db_dialect: string;
    port: string;
    pool_min: number;
    pool_max: number;
    pool_idle: number;
    pool_acquire: number;
}





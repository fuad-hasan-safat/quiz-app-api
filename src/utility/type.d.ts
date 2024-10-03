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


  export interface UserInfoAttributes {
    id?: number;
    userid: string;
    txt: string;
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





export interface UserType {
    name: string;
    phone: string;
    gender: string;
    dob: string;
    address: string;
    password: string; // Depending on your use case, you might not want to return this field
}
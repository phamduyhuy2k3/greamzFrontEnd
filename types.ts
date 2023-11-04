export default interface UserPayloadInterface {
  username: string;
  password: string;
}
export default interface UserRegisterForm {
  fullname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
export default interface UserProfile {
  id: Number;
  username: string;
  email: string;
  photo: string;
  fullname: string;
  role: string;
  createdAt: Date;
  provider: string;
}


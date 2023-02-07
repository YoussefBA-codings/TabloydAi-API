type fullNameType = {
  firstName: string;
  lastName: string;
}
export class CreateUserDto {
  id: string;
  userName: string;  
  fullName: fullNameType;    
  email: string;  
  password: string;   
  role: string;   
  createdAt: string; 
  updatedAt: string; 
  deletedAt: string;
}
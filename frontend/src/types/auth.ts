export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  user: User | null
}

export interface User {
  email: string;
  name: string;
}

export interface Account {
  createdAt: string; 
  graduationYear: number | null; 
  highSchool: string | null; 
  id: string; 
  studentName: string; 
  updatedAt: string; 

}

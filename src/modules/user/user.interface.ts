

 export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    is_active?: boolean;
    createdAt: Date;
    updatedAt: Date;
      role?: string;
 }


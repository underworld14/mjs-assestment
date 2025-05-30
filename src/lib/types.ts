export interface User {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
}

export interface Address {
  id: number;
  userId: number;
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface UserWithAddress extends User {
  address?: Address;
}

export interface CreateUserData {
  firstname: string;
  lastname: string;
  birthdate: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

export interface UpdateUserData extends CreateUserData {
  id: number;
}

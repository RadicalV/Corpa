export interface User {
  email: string;
  username: string;
  role: "ADMIN" | "CEO" | "USER";
  id: string;
}

export interface Corporation {
  name: string;
  description: string;
  id: string;
  creatorUserId: string;
}

export interface Branch {
  title: string;
  address: string;
  id: string;
}

export interface Worker {
  name: string;
  surname: string;
  phoneNumber: string;
  position: string;
  id: string;
}

export interface EditUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: { id: string; name: string };
  position: { id: string; name: string };
}

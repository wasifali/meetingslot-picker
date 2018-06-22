export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    groups: string [];
    hasGroup()
    {
        return "admin";
    }
}

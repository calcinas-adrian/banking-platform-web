export interface LoginSuccesfullyResponse {
    id:           number;
    email:        string;
    fullName:     string;
    rol:          Rol;
    status:       string;
    sessionToken: string;
    lastAccess:   Date;
    firstLogin:   boolean;
}

export interface Rol {
    id:          number;
    name:        string;
    description: string;
    active:      boolean;
}

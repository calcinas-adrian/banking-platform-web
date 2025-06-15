export interface GetProfileByIDResponse {
    id:         number;
    name:       string;
    lastName:   string;
    ci:         string;
    mobile:     string;
    address:    string;
    status:     string;
    addDate:    Date;
    addUser:    null;
    changeDate: Date;
    changeUser: null;
    deleted:    boolean;
    active:     boolean;
    fullName:   string;
}

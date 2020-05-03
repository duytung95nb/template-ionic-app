

export class User {
    public Id?: string;
    public UserName?: string;
    public FirstName?: string;
    public LastName?: string;
    public Password?: string;
    public RegisterDate?: Date;
    public RegisterIP?: string;
    public LastAccessDate?: Date;
    public LastAccessIP?: string;
    public DateOfBirth?: Date;
    public Disabled?: boolean;
    public AcceptEmail?: boolean;
    public Gender?: string
    public LeadSourceID?: number;
    public Rating?: number;
    public Email?: string;
    public Roles?: any[];
    public PhoneNumber?: string;
    constructor() {
        this.Id = '';
        this.UserName = '';
        this.FirstName = '';
        this.LastName = '';
        this.RegisterIP = '';
        this.LastAccessIP = '';
        this.Gender = '';
        this.Email = '';
        this.Roles = [];
        this.PhoneNumber = '';
    }
}
/**
 * This is our user object.
 * 
 * @author Tone-Man
 */
export interface UserInterface {
    id: string,
    email: string,
    name: string,
    photoURL: string,
    userLevel: string
    phoneNumber: string,
    title: string,
    pronouns: string,
    department: string,
    location: string
}

export default class User {
    private _id: string;
    private _email: string;
    private _name: string;
    private _photoURL: string;
    private _userLevel: string;
    private _phoneNumber: string;
    private _title: string;
    private _pronouns: string;
    private _department: string;
    private _location: string;

    constructor(id: string, email: string, name: string, photoURL: string, userLevel: string,
        phoneNumber: string, title: string, pronouns: string, department: string, location: string) {
        this._id = id;
        this._email = email;
        this._name = name;
        this._photoURL = photoURL;
        this._userLevel = userLevel;
        this._phoneNumber = phoneNumber;
        this._title = title;
        this._pronouns = pronouns;
        this._department = department;
        this._location = location;
    }

    // Getter methods
    get id(): string {
        return this._id;
    }

    get email(): string {
        return this._email;
    }

    get name(): string {
        return this._name;
    }

    get photoURL(): string {
        return this._photoURL;
    }

    get userLevel(): string {
        return this._userLevel;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    get title(): string {
        return this._title;
    }

    get department(): string {
        return this._department;
    }

    get pronouns(): string {
        return this._pronouns;
    }

    get location(): string {
        return this._location;
    }
    // Setter methods
    set id(id: string) {
        this._id = id;
    }

    set email(email: string) {
        this._email = email;
    }

    set name(name: string) {
        this._name = name;
    }

    set photoURL(photoURL: string) {
        this._photoURL = photoURL;
    }

    set userLevel(userLevel: string) {
        this._userLevel = userLevel;
    }

    set phoneNumber(phoneNumber: string) {
        this._phoneNumber = phoneNumber;
    }

    set title(title: string) {
        this._title = title;
    }

    set department(department: string) {
        this._department = department;
    }

    set pronouns(pronouns: string) {
        this._pronouns = pronouns;
    }

    set location(location: string) {
        this._location = location;
    }

    /**
     * Returns the user in a way that firbase handles
     */
    toFirebaseObject() {
        return {
            email: this._email,
            name: this._name,
            photoURL: this._photoURL,
            userLevel: this._userLevel,
            phoneNumber: this._phoneNumber,
            title: this._title,
            pronouns: this._pronouns,
            department: this._department,
            location: this._location,
        }
    }
}
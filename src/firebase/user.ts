/**
 * This is our user object.
 * 
 * @author Tone-Man
 */
export default class User {
    private _id: string;
    private _email: string;
    private _name: string;
    private _photoURL: string;
    private _userLevel: string;

    constructor(id: string, email: string, name: string, photoURL: string, user_level: string) {
        this._id = id;
        this._email = email;
        this._name = name;
        this._photoURL = photoURL;
        this._userLevel = user_level;
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

    get user_level(): string {
        return this._userLevel;
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

    set user_level(user_level: string) {
        this._userLevel = user_level;
    }
}
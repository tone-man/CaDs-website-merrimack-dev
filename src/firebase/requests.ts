export default class Request {
    private _requestTitle: string;
    private _requestName: string;
    private _email: string;
    private _requestBody: string;
  
    constructor(
      requestTitle: string,
      requestName: string,
      email: string,
      requestBody: string
    ) {
      this._requestTitle = requestTitle;
      this._requestName = requestName;
      this._email = email;
      this._requestBody = requestBody;
    }
  
    // Getters
    get requestTitle(): string {
      return this._requestTitle;
    }
  
    get requestName(): string {
      return this._requestName;
    }
  
    get email(): string {
      return this._email;
    }
  
    get requestBody(): string {
      return this._requestBody;
    }
  
    // Setters
    set requestTitle(value: string) {
      this._requestTitle = value;
    }
  
    set requestName(value: string) {
      this._requestName = value;
    }
  
    set email(value: string) {
      this._email = value;
    }
  
    set requestBody(value: string) {
      this._requestBody = value;
    }
  }
  
  

  
  
export class CustomException extends Error {
    status: number;
    override message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
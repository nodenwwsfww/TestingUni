export class UserFactory {
    static createStandardUser() {
        return { username: 'standard_user', password: 'secret_sauce' };
    }

    static createInvalidUser() {
        return { username: 'invalid_user', password: 'invalid_password' };
    }
}

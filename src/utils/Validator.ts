export class Validator {

    onlyAlpha(value: string) {
        return /^[A-Za-z]*$/.test(value);
    }

    validSimpleString(value: string, minLength: number = 1) {
        if (value.length < minLength || !this.onlyAlpha(value)) {
            return false
        }
        return true
    }

    validEmail(value: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    }

    validPassword(value: string) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
    }



}
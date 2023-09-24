import passwordsData from './passwords';

const commonPasswords = passwordsData.passwords;
const numericRegex = /^[0-9]+$/;

export default function PasswordChecker(password, confirmPassword, setPasswordCheckList) {
    const lengthCheck = () => {
        if (password.length >= 8) {
            return true;
        } else {
            return false;
        }
    }
    const commonCheck = () => {
        if (!lengthCheck()) {
            return false;
        } else if (commonPasswords.includes(password)) {
            return false;
        } else {
            return true;
        }            
    }
    const numbersCheck = () => {
        if (!lengthCheck()) {
            return false;
        } else if (numericRegex.test(password)) {
            return false;
        } else {
            return true;
        }            
    }
    const matchCheck = () => {
        if (!lengthCheck()) {
            return false;
        } else if (password === confirmPassword) {
            return true;
        } else {
            return false;
        }            
    }

    setPasswordCheckList({length: lengthCheck(), common: commonCheck(), numbers: numbersCheck(), match: matchCheck()})

}
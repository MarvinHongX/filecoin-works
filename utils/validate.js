export const validateUserId = (userId) => {
    // Allow only 4 to 20 characters of lowercase letters, numbers, and special characters (_), (-)
    const userIdRegex = /^[a-z0-9_-]{4,20}$/;
    return userIdRegex.test(userId);
}

export const validatePassword = (password) => {
    // Require 8 to 16 characters of letters, numbers, and special characters
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    return passwordRegex.test(password);
}

export const validatePhoneNumber = (phoneNumber) => {
    // Allow only 10 or 11 digits
    const phoneRegex = /^\d{10,11}$/;
    return phoneRegex.test(phoneNumber);
}

export const existUserById = async (userId) => {
    return await existUser(userId, null);
}

export const existUserByPhone = async (phone) => {
    return await existUser(null, phone);
}


export const existUser = async (userId, phone) => {
    try {
        const response = await $fetch('/api/user/exist', {
            method: 'POST',
            body: { userId: userId, phone: phone }
        });
        if (response.exist) {
            return true
        }
    } catch (error) {
        console.error('Error existUser:', error);
        return true;
    }
    return false;
}


export const errorsHelp = (editing, userId, country, phoneNumber, errors) => {
    if (editing.value && userId.value == '') {
        errors.value.help = '이름: 필수 정보입니다.';
        return
    } 
    
    if (editing.value && (phoneNumber.value == '' || country.value.code == '')) {
        errors.value.help = '휴대전화번호: 필수 정보입니다.';
        return
    } 
    
    if (phoneNumber.value !== '' && !validatePhoneNumber(phoneNumber.value)) {
        errors.value.help = '휴대전화번호: 10~11자리 숫자를 입력하세요.';
        return
    }

    errors.value.help = '';
}

export const errorsSignIn = (editing, userId, password, errors) => {
    if (editing.value && (userId.value == '' && password.value == '')) {
        errors.value.signIn = '아이디, 비밀번호: 필수 정보입니다.';
        return
    } 
    if (editing.value && userId.value == '') {
        errors.value.signIn = '이름: 필수 정보입니다.';
        return
    } 
    if (editing.value && password.value == '') {
        errors.value.signIn = '비밀번호: 필수 정보입니다.';
        return
    } 
    errors.value.signIn = '';
}

export const errorsUserId = async (editing, userId, errors) => {
    if (editing.value && userId.value == '') {
        errors.value.userId = '아이디: 필수 정보입니다.';
        return
    } 

    if (userId.value !== '' && !validateUserId(userId.value)) {
        errors.value.userId = '아이디: 4~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
        return
    }

    try {
        const exists = await existUserById(userId.value);
        if (userId.value !== '' && exists) {
            errors.value.userId = '아이디: 사용할 수 없는 아이디입니다.';
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }

    errors.value.userId = '';
}

export const errorsPassword = (editing, password, confirmPassword, errors) => {
    if (editing.value && (password.value == '' || password.value == '')) {
        errors.value.password = '비밀번호: 필수 정보입니다.';
        return
    } 

    if (password.value !== '' && !validatePassword(password.value)) {
        errors.value.password = '비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.';
        return
    }

    if (password.value !== '' && confirmPassword.value !== '' && validatePassword(password.value) && password.value !== confirmPassword.value) {
        errors.value.password = '비밀번호: 비밀번호가 일치하지 않습니다.';
        return
    }

    errors.value.password = '';
}

export const errorsName = (editing, name, errors) => {
    if (editing.value && (name.value == '')) {
        errors.value.name = '이름: 필수 정보입니다.';
        return
    } 

    errors.value.name = '';
}

export const errorsPhone = async (editing, country, phoneNumber, errors) => {
    if (editing.value && (phoneNumber.value == '' || country.value.code == '')) {
        errors.value.phone = '휴대전화번호: 필수 정보입니다.';
        return
    } 
    
    if (phoneNumber.value !== '' && !validatePhoneNumber(phoneNumber.value)) {
        errors.value.phone = '휴대전화번호: 10~11자리 숫자를 입력하세요.';
        return
    }

    try {
        const phone = {
            country: country.value.code,
            number: phoneNumber.value,
        }
        const exists = await existUserByPhone(phone);
        if (phoneNumber.value !== '' && exists) {
            errors.value.phone = '휴대전화번호: 사용할 수 없는 휴대전화번호입니다.';
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }

    errors.value.phone = '';
}
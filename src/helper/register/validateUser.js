const validateUser = (user, userFile) => {
    const errors = {};

    // Helper function to add error messages
    const addError = (field, message) => {
        if (!errors.status) errors.status = false; // Initialize status if not already set
        errors[field] = message;
        errors.status = true; // Set status to true if there's an error
    }

    // Validate name
    if (!user.name) {
        addError('firstname', 'Firstname is required');
    }

    // Validate Lastname
    if (!user.lastname) {
        addError('lastname', 'Lastname is required');
    }

    // Validate Middlename
    if (user.middlename && user.middlename.length > 200) {
        addError('middlename', 'Middlename should not exceed 200 characters');
    }

    // Validate Email
    if (!user.email) {
        addError('email', 'Email is required');
    } else if (!isValidEmail(user.email)) {
        addError('email', 'Invalid email format');
    }

    // Validate Phone Number
    if (!user.phone_number) {
        addError('phone_number', 'Phone number is required');
    } else if (!isValidPhoneNumber(user.phone_number)) {
        addError('phone_number', 'Invalid phone number format');
    }

    // Validate Password
    if (!user.password) {
        addError('password', 'Password is required');
    } else if (user.password.length < 8) {
        addError('password', 'Password must be at least 8 characters long');
    }

    // Validate Confirm Password
    if (user.password !== user.confirmPassword) {
        addError('confirmPassword', 'Passwords do not match');
    }

    // Validate Gender
    if (!user.gender) {
        addError('gender', 'Gender is required');
    }
    
    // Validate DOB
    if (!user.dob) {
        addError('dob', 'Date of birth is required');
    }

    // Validate SOG
    if (!user.sog) {
        addError('sog', 'State of origin is required');
    }

    // Validate Address
    if (!user.address) {
        addError('address', 'Residence address is required');
    }

    // Validate Profile Image (userFile)
    // Uncomment if profile image is being validated
    if (!userFile || userFile === "" )  {
        addError('profile_image', 'Profile image is required');
    }

    // Return the errors object
    return { errors, hasErrors: errors.status };
}

// Email Validation Function
const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

// Phone Number Validation Function
const isValidPhoneNumber = (phone_number) => {
    const regex = /(^0[789][01]\d{8}$)/;
    // const regex = /(^\+234[789][01]\d{8}$)|(^0[789][01]\d{8}$)/;
    return regex.test(phone_number) && phone_number.length === 11;
};

export default validateUser;

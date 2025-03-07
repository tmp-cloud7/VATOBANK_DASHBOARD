const validateUser = (user) => {
    const errors = {};

    // , userFile
    //Helper function to add error messages
    const addError = (field, message) => {
        errors[field] = message;
        errors.status = true;
    }
    
    // Validate name
    if(!user.name) {
        addError('firstname', 'Firstname is required');
    }

    // Validate Lastname
    if(!user.lastname) {
        addError('lastname', 'Lastname is required');
    }

    // Validate Email
    if(!user.email) {
        addError('email', 'Email is required');
    } else if (!isValidEmail(user.email)) {
        addError('email', 'Invalid email format');
    }

    // Validate Phone Number
    if(!user.phone_number) {
        addError('phone_number', 'Phone number is required');
    }

    // Validate Password
    if(!user.password) {
        addError('password', 'Password is required');
    } else if (user.password.length < 8) {
        addError('password', 'Password must be at least 8 characters long');
    }

    // Validate Confirm Password
    if(user.password !== user.confirmPassword) {
        addError('confirmPassword', 'Passwords do not match');
    }    

    // Validate Gender
    if(!user.gender) {
        addError('gender', 'Gender is required');
    }
    
    // Validate DOB
    if(!user.dob) {
        addError('dob', 'Date of birth is required');
    }

    // Validate SOG
    if(!user.sog) {
        addError('sog', 'State of origin is required');
    }

    // Validate Address
    if(!user.address) {
        addError('address', 'Residence address is required');
    }

    // Validate Profile Image (userFile)
    // if (!userFile ) {
    //     addError('profile_image', 'Profile image is required');
    // }


    // Return the errors objects
    return { errors, hasErrors: errors.status};
}
    const isValidEmail = (email) => {
        // const regex = /^[^\$@]+@[^\$@]+\.[^\$@]+$/;
         const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
       

    };
    export default validateUser;
export const validationUserData = (user) => {
    let errors = {};

    if (user.name.trim() == "")
        errors.name = "username is required";
    else if (user.name.trim().length < 3)
        errors.name = "username must be at least 3 characters";


    if (user.email.trim() == "")
        errors.email = "email is required";
    else if (user.email.trim().length < 9)
        errors.email = "email must be at least 9 characters";


    if (user.password.trim() == "")
        errors.password = "password is required";
    else if (user.password.trim().length < 3)
        errors.password = "password must be at least 3 characters";

        return errors;


}
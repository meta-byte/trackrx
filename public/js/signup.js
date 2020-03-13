$(document).ready(function () {
    var signUpForm = $("form.signup");
    var firstNameInput = $("input#first_name");
    var lastNameInput = $("input#last_name");
    var emailInput = $("input#email");
    var passwordInput = $("input#password");


    signUpForm.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            first: firstNameInput.val().trim(),
            last: lastNameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.first || !userData.last || !userData.email || !userData.password) {
            return;
        }
        signUpUser(userData.first, userData.last, userData.email, userData.password);
        firstNameInput.val("");
        lastNameInput.val("");
        emailInput.val("");
        passwordInput.val("");
    });

    function signUpUser(first, last, email, password) {
        $.post("/api/signup", {
            first: first,
            last: last,
            email: email,
            password: password
        })
            .then(function () {
                console.log("new user created.")
                window.location.replace("/dashboard");
            })
            .catch(handleErr);
    }

    function handleErr(err) {
        console.log("There was an error logging in:")
        console.log(err.responseJSON)
    }
})
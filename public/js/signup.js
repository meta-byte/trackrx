$(document).ready(function () {
    var signUpForm = $("form.signup");
    var firstNameInput = $("input#first-input");
    var lastNameInput = $("input#last-input");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");


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
        // If we have an email and password, run the signUpUser function
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
                window.location.replace("/dashboard");
            })
            .catch(handleErr);
    }

    function handleErr(err) {
        console.log("There was an error logging in: " + err)
    }
})
let signupProcessStep = 0

const signupStepFiles = {
    0: "signup/email.html",
    1: "signup/password.html",
    2: "signup/payment.html"
}

const loadStepHTML = () => {
    fetch(signupStepFiles[signupProcessStep])
        .then(response => response.text())
        .then(text => document.getElementById('signup-area').innerHTML = text)
}

const restartProcess = () => {
    signupProcessStep = 0
    loadStepHTML()
}

const nextStep = () => {
    ++signupProcessStep
    loadStepHTML()
}

loadStepHTML()
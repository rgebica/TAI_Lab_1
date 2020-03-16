const navbar = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <a class="nav-link active" href="index.html">Home</a>
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="quiz.html">Quiz</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link" href="contact.html">Contact</a>
            </li>
        </ul>
`;

const navbarWrapper = document.querySelector(".navbar");
navbarWrapper.innerHTML = navbar;
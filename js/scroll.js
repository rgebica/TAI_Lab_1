const scroll = document.querySelector(".scroll");

scroll.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

window.addEventListener("scroll", () => {
    const body = document.body;
    const documentElement = document.documentElement;

    if (body.scrollTop > 200 || documentElement.scrollTop > 200) {
        scroll.style.visibility = "visible";
        scroll.style.opacity = "1";
    } else {
        scroll.style.visibility = "hidden";
        scroll.style.opacity = "0";
    }
});
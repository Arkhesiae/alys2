
export function createRipple(event) {
    const button = event.currentTarget;
    const bRect = button.getBoundingClientRect();
    const circle = document.createElement("div");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = diameter+`px`;
    circle.style.left = event.clientX - (bRect.left + radius)+"px";
    circle.style.top = event.clientY - (bRect.top + radius) + "px";
    circle.classList.add("Gripple");
    const ripple = button.getElementsByClassName("Gripple")[0];
    if (ripple) {
        ripple.remove();
    }
    button.appendChild(circle);
}


//
//
// const buttons = document.getElementsByTagName("button");
// for (const button of buttons) {
//     button.addEventListener("click", createRipple);
// }
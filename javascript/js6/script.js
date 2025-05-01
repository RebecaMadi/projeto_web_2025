const NUM_MAX = 8;
let divs = [];

document.addEventListener("mousemove", function(e) {
    if (divs.length >= NUM_MAX) {
        return; 
    }

    const novaDiv = document.createElement("div");
    document.body.appendChild(novaDiv);
    divs.push(novaDiv);
    novaDiv.style.left = (e.clientX - 40) + 'px';
    novaDiv.style.top = (e.clientY - 40) + 'px';

    setTimeout(function() {
        const divToRemove = divs.shift();
        document.body.removeChild(divToRemove);
    }, 50);
});

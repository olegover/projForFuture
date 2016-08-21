var sliderElem = document.getElementById('slider');
var thumbElem = sliderElem.children[0];

var input = document.querySelector('input.input');

thumbElem.onmousedown = function(e) {
    var thumbCoords = getCoords(thumbElem);
    var shiftX = e.pageX - thumbCoords.left;

    var sliderCoords = getCoords(sliderElem);

    document.onmousemove = function(e) {
        //  вычесть координату родителя, т.к. position: relative
        var newLeft = e.pageX - shiftX - sliderCoords.left;

        // курсор ушёл вне слайдера
        if (newLeft < 0) {
            newLeft = 0;
        }
        var rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        thumbElem.style.left = newLeft + 'px';
        console.log(thumbElem.style.left);
        var sum = newLeft * 77 +' $';
        input.value = sum;
    };

    document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
    };

    return false; // disable selection start (cursor change)
};

thumbElem.ondragstart = function() {
    return false;
};

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
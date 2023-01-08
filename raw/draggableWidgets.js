//Make the DIV element draggagle:

let arr = Array.from(document.getElementsByClassName("widget"));
Array.from(document.getElementsByClassName("widget")).forEach(element => dragElement(element));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "main")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "main").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;

    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        console.log(checkForOverlap(arr))
        if (!(checkForOverlap(arr))) {
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function checkForOverlap(arr) {
        // Check for overlap between any two divs in a list of divs

        for (var div of arr) {

            if (div !== elmnt) {
                if (calculateOverlap(elmnt, div) == true) {
                    return true
                }
            }
        }
        return false

        function calculateOverlap(div1, div2) {

            var div1_rect = div1.getBoundingClientRect()
            var div2_rect = div2.getBoundingClientRect()

            var l1 = [div1_rect.left, div1_rect.top]
            var r1 = [div1_rect.right, div1_rect.bottom]

            var l2 = [div2_rect.left, div2_rect.top]
            var r2 = [div2_rect.right, div2_rect.bottom]

            // if rectangle has area 0, no overlap
            if (l1[0] == r1[0] || l1[1] == r1[1] || r2[0] == l2[0] || l2[1] == r2[1])
                return false;

            // If one rectangle is on left side of other
            if (l1[0] > r2[0] || l2[0] > r1[0]) {
                return false;
            }

            // If one rectangle is above other
            if (r1[1] < l2[1] || r2[1] < l1[1]) {
                return false;
            }

            return true;
        }
    }
}
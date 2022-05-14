const el = document.querySelector(".item");
let isResizing = false;

el.addEventListener("mousedown", mousedown); // кнопка мыши нажата над элементом
// mousedown → mouseup → click
function mousedown(e) {
    window.addEventListener("mousemove", mousemove); // каждое движение генерирует событие
    window.addEventListener("mouseup", mouseup); // кнопка мыши отпущена над элементом

    let prevX = e.clientX; // 2
    let prevY = e.clientY; // 2

    function mousemove(e) {
        if (!isResizing) {
            // pageX и pageY -> относительно документа
            let newX = prevX - e.clientX; // 2-3 = -1    -> относительно окна
            let newY = prevY - e.clientY; // 2-2 = 0	 -> относительно окна

            const rect = el.getBoundingClientRect();
            // @ts-ignore
            el.style.left = rect.left - newX + "px"; // 200 - - 1 = 201
            // @ts-ignore
            el.style.top = rect.top - newY + "px"; //

            prevX = e.clientX;
            prevY = e.clientY;
        }
    }
    function mouseup() {
        // кнопка мыши отпущена над элементом
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
    }
}

const resizes = document.querySelectorAll(".resizer");

let currentResizer;
for (let resizer of resizes) {
    resizer.addEventListener("mousedown", mousedown); // кнопка нажата

    function mousedown(e) {
        currentResizer = e.target; // на что нажали
        console.log("currentResizer", currentResizer);
        isResizing = true;
        let prevX = e.clientX; // 2-3 = -1
        let prevY = e.clientY; // 2-2 = 0

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup); // отжали над элементом

        function mousemove(e) {
            const rect = el.getBoundingClientRect();
            console.log("rect left", rect.left);

            if (currentResizer.classList.contains("se")) {
                // ширина окна - (предыдущая координата - новая)
                el.style.width = rect.width - (prevX - e.clientX) + "px";
                // высота окна - (предыдущая координата - новая)
                el.style.height = rect.height - (prevY - e.clientY) + "px";
            } else if (currentResizer.classList.contains("sw")) {
                el.style.width = rect.width + (prevX - e.clientX) + "px";
                el.style.height = rect.height - (prevY - e.clientY) + "px";
                el.style.left = rect.left - (prevX - e.clientX) + "px";
            } else if (currentResizer.classList.contains("ne")) {
                el.style.width = rect.width - (prevX - e.clientX) + "px";
                el.style.height = rect.height + (prevY - e.clientY) + "px";
                el.style.top = rect.top - (prevY - e.clientY) + "px";
            } else {
                el.style.width = rect.width + (prevX - e.clientX) + "px";
                el.style.height = rect.height + (prevY - e.clientY) + "px";
                el.style.top = rect.top - (prevY - e.clientY) + "px";
                el.style.left = rect.left - (prevX - e.clientX) + "px";
            }

            prevX = e.clientX;
            prevY = e.clientY;
        }

        function mouseup() {
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
            isResizing = false;
        }
    }
}

const th = document.querySelectorAll(".th");
for (const element of th) {
    let borderTouch = document.createElement("div");
    borderTouch.classList.add("borderTouch");
    element.appendChild(borderTouch);
}

let elBordersTouch = document.querySelectorAll(".borderTouch");

let currentBorderTouch = undefined;
for (const element of elBordersTouch) {
    element.addEventListener("mousedown", mousedown);

    function mousedown(e) {
        let thisEl = this;
        currentBorderTouch = thisEl;
        console.log("currentBorderTouch", currentBorderTouch);
        let parentEl = currentBorderTouch.parentElement;
        console.log("parentEl", parentEl);
        let prevWidthParentEl = parentEl.getBoundingClientRect().width;
        console.log("prevWidthParentEl", prevWidthParentEl);
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);
        //let padding = paddingDiff(parentEl)
        function mousemove(e) {
            let currentParentElParamCol = parentEl.getBoundingClientRect();
            if (parentEl.classList.contains("th")) {
                parentEl.style.width =
                    currentParentElParamCol.width -
                    (prevWidthParentEl - e.clientX) +
                    "px";
            }

            prevWidthParentEl = parentEl.getBoundingClientRect().width;
        }

        function mouseup() {
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
            isResizing = false;
        }
    }
}
/* 
function paddingDiff(col) {

	if (getStyleVal(col, 'box-sizing') == 'border-box') {
		return 0;
	}

	let padLeft = getStyleVal(col, 'padding-left');
	let padRight = getStyleVal(col, 'padding-right');
	return (parseInt(padLeft) + parseInt(padRight));

}

function getStyleVal(elm, css) {
	return (window.getComputedStyle(elm, null).getPropertyValue(css))
}	 */

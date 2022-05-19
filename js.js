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
const table1 = document.getElementById("table1");

const th = document.querySelectorAll(".th");

function createDiv(height){
	var div = document.createElement('div');
	div.style.top = "0";
	div.style.right = "0";
	div.style.width = '5px';
	div.style.position = 'absolute';
	div.style.cursor = 'col-resize';
	div.style.userSelect = 'none';
	div.style.height = height+'px';
	div.className = 'columnSelector';
	return div;
}

for (const element of th) {
	let borderTouch = createDiv(table1.offsetHeight)
	element.appendChild(borderTouch);
	element.style.position = "relative"; 
}

let elBordersTouch = document.querySelectorAll(".columnSelector");

let currentBorderTouch = undefined;
for (const element of elBordersTouch) {
    element.addEventListener("mousedown", mousedown);
	let pageX, curCol, nxtCol, curColWidth, nxtColWidth;

    function mousedown(e) {
       let thisEl = this;
	   	curCol = thisEl.parentElement;
		nxtCol = curCol.nextElementSibling;
		pageX = e.pageX;
		curColWidth = curCol.offsetWidth;
		let padding = paddingDiff(curCol);
		// added dif padding how this work 
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);
      
		function paddingDiff(col) {
			if (getStyleVal(col, "box-sizing") == 'border-box') {
				return 0;
			}
			const padLeft = getStyleVal(col, "padding-left")
			const padRight = getStyleVal(col, "padding-right")
			return (parseInt(padLeft) + parseInt(padRight));
		}

		function getStyleVal(elm, css) {
			return (window.getComputedStyle(elm, null).getPropertyValue(css))
		}

        function mousemove(e) {
			if (curCol) {
				let diffX = e.pageX - pageX;
				if (nxtCol) {

					nxtCol.style.width = nxtColWidth - diffX + "px";
					curCol.style.width = curColWidth + diffX + "px";
					curCol.style.backgroundColor = "green";
				}
			}
        }

		function mouseup() {
			curCol.style.backgroundColor = "";
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
            isResizing = false;
        }
    }
}

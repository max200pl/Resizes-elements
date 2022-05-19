const table = document.getElementById("tableId");

function resizeableGrid(table) {
    const row = table.getElementsByTagName("tr")[0],
        cols = row ? row.children : undefined;
    if (!cols) return;

    table.style.overflow = "hidden";

    for (let i = 0; i < cols.length; i++) {
        let div = createDiv(table.offsetHeight);
        cols[i].appendChild(div);
        cols[i].style.position = "relative";
        setListeners(div);
    }

    function createDiv(height) {
        var div = document.createElement("div");
        div.style.top = "0";
        div.style.right = "0";
        div.style.width = "5px";
        div.style.position = "absolute";
        div.style.cursor = "col-resize";
        div.style.userSelect = "none";
        div.style.height = height + "px";
        div.className = "columnSelector";
        return div;
    }

    function setListeners(div) {
        let pageX, curCol, nxtCol, curColWidth, nxtColWidth;

        div.addEventListener("mousedown", function (e) {
            curCol = e.target.parentElement;
            nxtCol = curCol.nextElementSibling;
            pageX = e.pageX;
            curColWidth = curCol.offsetWidth;

            if (nxtCol) {
                nxtColWidth = nxtCol.offsetWidth;
            }
        });

        document.addEventListener("mousemove", function (e) {
            if (curCol) {
                let diffX = e.pageX - pageX;

                if (nxtCol) {
                    nxtCol.style.width = nxtColWidth - diffX + "px";
                    curCol.style.width = curColWidth + diffX + "px";
                }
            }
        });

        document.addEventListener("mouseup", function (e) {
            curCol = undefined;
            nxtCol = undefined;
            pageX = undefined;
            nxtColWidth = undefined;
            curColWidth = undefined;
        });
    }
}
resizeableGrid(table);

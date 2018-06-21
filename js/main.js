var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

autoSetCanvasSize(canvas)

listenToUser(canvas)

/*********************/

var eraserEnabled = false
var eraser = document.getElementById('eraser')
var brush = document.getElementById('brush')
var actions = document.getElementById('actions')

eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions x'
}

brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'

}

function setWidthAndHeight() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.fillStyle = "black"
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function drawLiine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = "black"
    context.moveTo(x1, y1) //起点
    context.lineWidth = 5
    context.lineTo(x2, y2) //终点
    context.stroke()
    context.closePath()

}

function autoSetCanvasSize() {
    setWidthAndHeight()

    window.onresize = function () {
        setWidthAndHeight()
    }
}

function listenToUser(canvas) {


    var using = false
    var lastPaint = {
        x: undefined,
        y: undefined
    }
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPaint = {
                    x: x,
                    y: y
                }
                //drawCircle(x, y, 1)
            }
        }

        canvas.ontouchmove = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPaint = {
                    x: x,
                    y: y
                }
                //drawCircle(x, y, 1)
                drawLiine(lastPaint.x, lastPaint.y, newPaint.x, newPaint.y)
                lastPaint = newPaint
            }

        }

        canvas.ontouchend = function (a) {
            using = false
        }

    } else {
        //非触屏设备
        canvas.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPaint = {
                    x: x,
                    y: y
                }
                //drawCircle(x, y, 1)
            }
        }

        canvas.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPaint = {
                    x: x,
                    y: y
                }
                //drawCircle(x, y, 1)
                drawLiine(lastPaint.x, lastPaint.y, newPaint.x, newPaint.y)
                lastPaint = newPaint
            }

        }

        canvas.onmouseup = function (a) {
            using = false
        }
    }


}
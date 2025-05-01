import Vector from "./vector.js";

const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const context = canvas.getContext("2d");
const origin = [canvas.width / 2, canvas.height / 2];

const vectors = [
    new Vector(origin, [2, 0], 100),
    new Vector(origin, [1,2], 100)
];

let isDraggingHead = false;
let draggedHeadVector = null;
let dragOffsetX, dragOffsetY;

function drawVectors() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    vectors[0].draw(context, "blue", "b");
    vectors[1].draw(context, "orange", "u");

    vectors[1].normalize().draw(context, "magenta", "normalized u");
    vectors[1].negate().draw(context, "purple", "negated u");

    vectors[1].reflection(vectors[0]).draw(context, "green", "reflection of u over b");
    vectors[1].projection(vectors[0]).draw(context, "pink", "proj of u into b");
}

drawVectors();

canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    for (const vector of vectors) {
        if (vector.isPointNearHead(mouseX, mouseY)) {
            isDraggingHead = true;
            draggedHeadVector = vector;
            dragOffsetX = mouseX - vector.headX;
            dragOffsetY = mouseY - vector.headY;
            canvas.style.cursor = 'pointer';
            break;
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDraggingHead) return;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    if (draggedHeadVector) {
        draggedHeadVector.x = (mouseX - dragOffsetX - draggedHeadVector.origin[0]) / draggedHeadVector.scale;
        draggedHeadVector.y = (draggedHeadVector.origin[1] - (mouseY - dragOffsetY)) / draggedHeadVector.scale;
        drawVectors();
    }
});

canvas.addEventListener('mouseup', () => {
    if (!isDraggingHead) return;
    isDraggingHead = false;
    draggedHeadVector = null;
    canvas.style.cursor = 'default';
});

canvas.addEventListener('mouseout', () => {
    if (!isDraggingHead) return;
    isDraggingHead = false;
    draggedHeadVector = null;
    canvas.style.cursor = 'default';
});
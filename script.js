// script.js
document.getElementById('agregar').addEventListener('click', agregarNombre);
document.getElementById('generar').addEventListener('click', generarNombre);

const nombres = [];
const canvas = document.getElementById('ruleta');
const ctx = canvas.getContext('2d');

function agregarNombre() {
    const nombreInput = document.getElementById('nombreInput').value;
    if (nombreInput) {
        nombres.push(nombreInput);
        actualizarListaNombres();
        document.getElementById('nombreInput').value = '';
        dibujarRuleta();
    }
}

function actualizarListaNombres() {
    const listaNombres = document.getElementById('listaNombres');
    listaNombres.innerHTML = '';
    nombres.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre;
        listaNombres.appendChild(li);
    });
}

function dibujarRuleta() {
    const numNames = nombres.length;
    const arcSize = (2 * Math.PI) / numNames;
    const colors = ['#ff9999','#66b3ff','#99ff99','#ffcc99','#c2c2f0','#ffb3e6','#c4e17f','#76d7c4','#ff7f50','#ff9f80'];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numNames; i++) {
        const angle = i * arcSize;
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, angle, angle + arcSize);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#000";
        ctx.font = "bold 16px Arial";
        ctx.fillText(nombres[i], canvas.width / 2 - 10, 10);
        ctx.restore();
    }
}

function generarNombre() {
    if (nombres.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * nombres.length);
        const nombreAleatorio = nombres[indiceAleatorio];
        document.getElementById('nombre').textContent = `Nombre seleccionado: ${nombreAleatorio}`;

        // Simulate the spinning effect
        let startAngle = 0;
        const spinAngle = (indiceAleatorio * (2 * Math.PI) / nombres.length) + (2 * Math.PI * 3); // 3 full spins + the target angle
        const spinTimeTotal = 3000;
        const spinTimeIncrement = 30;

        function rotateRuleta() {
            startAngle += (spinAngle - startAngle) * 0.05;
            if (startAngle >= spinAngle) {
                startAngle = spinAngle;
                clearInterval(spinTimer);
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(startAngle);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
            dibujarRuleta();
            ctx.restore();
        }

        const spinTimer = setInterval(rotateRuleta, spinTimeIncrement);
    } else {
        document.getElementById('nombre').textContent = 'No hay nombres en la lista';
    }
}



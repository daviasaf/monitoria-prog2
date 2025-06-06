const prompt = require("prompt-sync")();
const PI = Math.PI;
const raio = Number(prompt("Escreva o raio: "))
const area = (PI * (raio**2)).toFixed(0)
const volume = ((4*PI*(raio**3))/3).toFixed(0)
console.log(`A área do circulo é: ${area}`)
console.log(`E o volume da esfera é: ${volume}`)
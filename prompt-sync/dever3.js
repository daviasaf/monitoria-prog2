const prompt = require("prompt-sync")();
let auxiliar = 0;
let a = prompt("Escreva o valor da primeira variável: ");
let b = prompt("Escreva o valor da segunda variável: ");
let c = prompt("Escreva o valor da terceira variável: ");
console.log(`A:${a}, B:${b}, C:${c}`)
auxiliar = c
c = b 
b = a
a = auxiliar
console.log(`A:${a}, B:${b}, C:${c}`)
// Obtendo referências aos elementos HTML
const formaGeometricasSelect = document.getElementById('formaGeometricas');
const inputsContainer = document.getElementById('inputsContainer');
const calcularAreaBtn = document.getElementById('calcularArea');
const calcularPerimetroBtn = document.getElementById('calcularPerimetro');
const calcularVolumeBtn = document.getElementById('calcularVolume');
const resultadoElement = document.getElementById('resultado'); // Elemento onde o resultado será exibido

// Objeto para armazenar os campos de entrada necessários para cada forma
const formasConfig = {
    'quadrado': {
        area: ['lado'],
        perimetro: ['lado'],
        volume: [] // Quadrado é 2D
    },
    'retangulo': {
        area: ['base', 'altura'],
        perimetro: ['base', 'altura'],
        volume: [] // Retângulo é 2D
    },
    'paralelogramo': {
        area: ['base', 'altura'],
        perimetro: ['lado1', 'lado2'],
        volume: [] // Paralelogramo é 2D
    },
    'trapezio': {
        area: ['baseMaior', 'baseMenor', 'altura'],
        perimetro: ['lado1', 'lado2', 'baseMaior', 'baseMenor'],
        volume: [] // Trapézio é 2D
    },
    'losango': {
        area: ['diagonalMaior', 'diagonalMenor'],
        perimetro: ['lado'],
        volume: [] // Losango é 2D
    },
    'triangulo': {
        area: ['base', 'altura'],
        perimetro: ['lado1', 'lado2', 'lado3'],
        volume: [] // Triângulo é 2D
    },
    'circulo': {
        area: ['raio'],
        perimetro: ['raio'],
        volume: [] // Círculo é 2D
    }
};

// Função para gerar os campos de input dinamicamente
function gerarInputs(forma) {
    inputsContainer.innerHTML = ''; // Limpa os inputs existentes

    if (!forma || !formasConfig[forma]) {
        return; // Sai se a forma não for válida
    }

    const camposNecessarios = new Set(); // Usar um Set para evitar campos duplicados

    // Coleta todos os campos necessários para área, perímetro e volume da forma selecionada
    if (formasConfig[forma].area) {
        formasConfig[forma].area.forEach(campo => camposNecessarios.add(campo));
    }
    if (formasConfig[forma].perimetro) {
        formasConfig[forma].perimetro.forEach(campo => camposNecessarios.add(campo));
    }
    if (formasConfig[forma].volume) {
        formasConfig[forma].volume.forEach(campo => camposNecessarios.add(campo));
    }

    // Cria e adiciona os inputs ao container
    camposNecessarios.forEach(campo => {
        const divInput = document.createElement('div');
        divInput.classList.add('form-group', 'input-field'); // Adiciona classe para estilização e ocultação

        const label = document.createElement('label');
        label.setAttribute('for', campo);
        label.textContent = formatarNomeCampo(campo) + ':';

        const input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('id', campo);
        input.setAttribute('placeholder', `Digite o valor da ${formatarNomeCampo(campo).toLowerCase()}`);
        input.setAttribute('min', '0'); // Garante que apenas números positivos sejam inseridos
        input.setAttribute('step', 'any'); // Permite números decimais

        divInput.appendChild(label);
        divInput.appendChild(input);
        inputsContainer.appendChild(divInput);
    });

    // Torna todos os campos visíveis após gerá-los
    const allInputs = inputsContainer.querySelectorAll('.input-field');
    allInputs.forEach(inputDiv => {
        inputDiv.classList.add('active');
    });
}

// Função auxiliar para formatar o nome do campo para exibição
function formatarNomeCampo(nome) {
    // Ex: "diagonalMaior" -> "Diagonal Maior"
    return nome.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

// Ouvinte de evento para o select de formas
formaGeometricasSelect.addEventListener('change', (event) => {
    const formaSelecionada = event.target.value;
    resultadoElement.textContent = ''; // Limpa o resultado anterior
    gerarInputs(formaSelecionada); // Gera os inputs para a nova forma
});

// Adicionando ouvintes de evento para os botões de cálculo
calcularAreaBtn.addEventListener('click', () => {
    calcular('area');
});

calcularPerimetroBtn.addEventListener('click', () => {
    calcular('perimetro');
});

calcularVolumeBtn.addEventListener('click', () => {
    calcular('volume');
});

/**
 * Função principal para realizar os cálculos (área, perímetro, volume).
 * @param {string} tipoCalculo - O tipo de cálculo a ser realizado ('area', 'perimetro', 'volume').
 */
function calcular(tipoCalculo) {
    const formaSelecionada = formaGeometricasSelect.value;
    resultadoElement.textContent = ''; // Limpa o resultado anterior

    if (!formaSelecionada) {
        resultadoElement.textContent = 'Por favor, selecione uma forma geométrica.';
        return;
    }

    // Função para obter o valor de um input e validar
    const getInputValue = (id) => {
        const input = document.getElementById(id);
        const value = parseFloat(input.value);
        if (isNaN(value) || value <= 0) {
            resultadoElement.textContent = `Por favor, insira um valor válido e positivo para ${formatarNomeCampo(id)}.`;
            return null; // Retorna null para indicar erro
        }
        return value;
    };

    let resultado;
    let todosCamposValidos = true; // Flag para verificar a validade dos campos

    switch (formaSelecionada) {
        case 'quadrado':
            if (tipoCalculo === 'area') {
                const lado = getInputValue('lado');
                if (lado !== null) resultado = lado * lado;
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'perimetro') {
                const lado = getInputValue('lado');
                if (lado !== null) resultado = 4 * lado;
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'volume') {
                resultadoElement.textContent = 'Quadrado é uma forma 2D. Não é possível calcular volume.';
                return;
            }
            break;

        case 'retangulo':
            if (tipoCalculo === 'area') {
                const base = getInputValue('base');
                const altura = getInputValue('altura');
                if (base !== null && altura !== null) resultado = base * altura;
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'perimetro') {
                const base = getInputValue('base');
                const altura = getInputValue('altura');
                if (base !== null && altura !== null) resultado = 2 * (base + altura);
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'volume') {
                resultadoElement.textContent = 'Retângulo é uma forma 2D. Não é possível calcular volume.';
                return;
            }
            break;

        case 'paralelogramo':
            if (tipoCalculo === 'area') {
                const base = getInputValue('base');
                const altura = getInputValue('altura');
                if (base !== null && altura !== null) resultado = base * altura;
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'perimetro') {
                const lado1 = getInputValue('lado1');
                const lado2 = getInputValue('lado2');
                if (lado1 !== null && lado2 !== null) resultado = 2 * (lado1 + lado2);
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'volume') {
                resultadoElement.textContent = 'Paralelogramo é uma forma 2D. Não é possível calcular volume.';
                return;
            }
            break;

        case 'trapezio':
            if (tipoCalculo === 'area') {
                const baseMaior = getInputValue('baseMaior');
                const baseMenor = getInputValue('baseMenor');
                const altura = getInputValue('altura');
                if (baseMaior !== null && baseMenor !== null && altura !== null) resultado = ((baseMaior + baseMenor) * altura) / 2;
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'perimetro') {
                const lado1 = getInputValue('lado1');
                const lado2 = getInputValue('lado2');
                const baseMaior = getInputValue('baseMaior');
                const baseMenor = getInputValue('baseMenor');
                if (lado1 !== null && lado2 !== null && baseMaior !== null && baseMenor !== null) resultado = lado1 + lado2 + baseMaior + baseMenor;
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'volume') {
                resultadoElement.textContent = 'Trapézio é uma forma 2D. Não é possível calcular volume.';
                return;
            }
            break;

        case 'losango':
            if (tipoCalculo === 'area') {
                const diagonalMaior = getInputValue('diagonalMaior');
                const diagonalMenor = getInputValue('diagonalMenor');
                if (diagonalMaior !== null && diagonalMenor !== null) resultado = (diagonalMaior * diagonalMenor) / 2;
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'perimetro') {
                const lado = getInputValue('lado');
                if (lado !== null) resultado = 4 * lado;
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'volume') {
                resultadoElement.textContent = 'Losango é uma forma 2D. Não é possível calcular volume.';
                return;
            }
            break;

        case 'triangulo':
            if (tipoCalculo === 'area') {
                const base = getInputValue('base');
                const altura = getInputValue('altura');
                if (base !== null && altura !== null) resultado = (base * altura) / 2;
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'perimetro') {
                const lado1 = getInputValue('lado1');
                const lado2 = getInputValue('lado2');
                const lado3 = getInputValue('lado3');
                if (lado1 !== null && lado2 !== null && lado3 !== null) resultado = lado1 + lado2 + lado3;
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'volume') {
                resultadoElement.textContent = 'Triângulo é uma forma 2D. Não é possível calcular volume.';
                return;
            }
            break;

        case 'circulo':
            if (tipoCalculo === 'area') {
                const raio = getInputValue('raio');
                if (raio !== null) resultado = Math.PI * Math.pow(raio, 2);
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'perimetro') {
                const raio = getInputValue('raio');
                if (raio !== null) resultado = 2 * Math.PI * raio;
                else todosCamposValidos = false;
            } else if (tipoCalculo === 'volume') {
                resultadoElement.textContent = 'Círculo é uma forma 2D. Não é possível calcular volume.';
                return;
            }
            break;

        default:
            resultadoElement.textContent = 'Forma geométrica não reconhecida ou ainda não implementada.';
            return;
    }

    if (todosCamposValidos && resultado !== undefined) {
        let textoCalculo = '';
        if (tipoCalculo === 'area') textoCalculo = 'área';
        else if (tipoCalculo === 'perimetro') textoCalculo = 'perímetro';
        else if (tipoCalculo === 'volume') textoCalculo = 'volume';

        resultadoElement.textContent = `O ${textoCalculo} do(a) ${formaSelecionada} é: ${resultado.toFixed(2)}`;
    }
}

// Inicializa os inputs quando a página carrega (se uma forma já estiver selecionada)
document.addEventListener('DOMContentLoaded', () => {
    // Para o caso de refresh da página com uma opção selecionada (raro em apps simples)
    if (formaGeometricasSelect.value) {
        gerarInputs(formaGeometricasSelect.value);
    }
});
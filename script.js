document.addEventListener('DOMContentLoaded', () => {
  const btnCalcular = document.querySelector('.btn-calcular');
  const inputPeso = document.querySelector('.input-peso');
  const inputAltura = document.querySelector('.input-altura');
  const divResultado = document.querySelector('.resultado-imc');

  btnCalcular.addEventListener('click', () => {
    const peso = parseFloat(inputPeso.value);
    const alturaCm = parseFloat(inputAltura.value);

    if (isNaN(peso) || isNaN(alturaCm) || peso <= 0 || alturaCm <= 0) {
      divResultado.style.color = 'rgb(255, 107, 107)';
      divResultado.innerHTML = 'Por favor, introduce valores válidos.';
      return;
    }

    const alturaM = alturaCm / 100;
    const imc = peso / (alturaM * alturaM);
    
    let categoria = '';
    let color = '';

    if (imc < 18.5) {
      categoria = 'Bajo peso. ¡Toca comer más y levantar hierro!';
      color = 'rgb(255, 204, 0)';
    } else if (imc < 25) {
      categoria = 'Peso normal. ¡Sigue manteniendo ese ritmo!';
      color = 'rgb(76, 175, 80)';
    } else if (imc < 30) {
      categoria = 'Sobrepeso. Perfecto para transformarlo en músculo puro.';
      color = 'rgb(255, 152, 0)';
    } else {
      categoria = 'Obesidad. El mejor día para empezar el cambio es hoy.';
      color = 'rgb(255, 87, 34)';
    }

    divResultado.style.color = color;
    divResultado.innerHTML = `Tu IMC es <strong>${imc.toFixed(1)}</strong><br><span style="font-size: 0.9rem; color: rgb(170, 170, 170);">${categoria}</span>`;
  });
});
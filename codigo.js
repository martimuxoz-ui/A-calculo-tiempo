function verificartiempo(campo, limite) {
  const valor = parseInt(campo.value);
  if (valor > limite || valor < 0) {
    alert(`Valor inválido. Debe estar entre 0 y ${limite}.`);
    campo.value = "";
    campo.focus();
  }
}
function limpiarResultado() {
  document.getElementById("resultadoHoras").value = "";
  document.getElementById("resultadoMinutos").value = "";
  document.getElementById("resultadoSegundos").value = "";
}
function calcularTiempo() {
  const hi = parseInt(document.getElementById("hi").value) || 0;
  const mi = parseInt(document.getElementById("mi").value) || 0;
  const si = parseInt(document.getElementById("si").value) || 0;
  const hf = parseInt(document.getElementById("hf").value) || 0;
  const mf = parseInt(document.getElementById("mf").value) || 0;
  const sf = parseInt(document.getElementById("sf").value) || 0;
  const tiempoInicial = hi * 3600 + mi * 60 + si;
  let tiempoFinal = hf * 3600 + mf * 60 + sf;
  if (tiempoInicial > tiempoFinal) {
    limpiarResultado();
    alert("La hora inicial no puede ser mayor que la hora final.");
    return;
  }
  const diferencia = tiempoFinal - tiempoInicial;
  const horas = Math.floor(diferencia / 3600);
  const minutos = Math.floor((diferencia % 3600) / 60);
  const segundos = diferencia % 60;
  document.getElementById("resultadoHoras").value = horas;
  document.getElementById("resultadoMinutos").value = minutos;
  document.getElementById("resultadoSegundos").value = segundos;
  document
    .querySelectorAll("#resultadoHoras, #resultadoMinutos, #resultadoSegundos")
    .forEach((campo) => {
      campo.classList.remove("resultado-animado");
      void campo.offsetWidth;
      campo.classList.add("resultado-animado");
    });
}
const camposTiempo = ["hi", "mi", "si", "hf", "mf", "sf"];
camposTiempo.forEach((id, indice) => {
  document.getElementById(id).addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (indice < camposTiempo.length - 1) {
      document.getElementById(camposTiempo[indice + 1]).focus();
    } else {
      calcularTiempo();
    }
  });
});
function reiniciar() {
  camposTiempo.forEach((id) => {
    document.getElementById(id).value = "";
  });
  limpiarResultado();
  document
    .querySelectorAll("#resultadoHoras, #resultadoMinutos, #resultadoSegundos")
    .forEach((campo) => campo.classList.remove("resultado-animado"));
  document.getElementById("hi").focus();
}
// Definición de variables
var tipoMovimiento = ["Anual", "Mensual", "Semanal"];
var tipoOperacion = ["Gasto", "Ingreso"];

var monedasBasicas = ["Pesos", "Dólares"];
var monedasSecundarias = ["Euros", "Reales"];
var todasMonedas = monedasBasicas.concat(monedasSecundarias);

// Ingreso de datos
class nuevoDato {
    constructor(entrada) {
      this.tipo = getTipo; //define si es ingreso o egreso
      this.monto = getMonto;
      this.moneda = getMoneda; //define si es pesos o dolares (inicialmente)
      if (moneda = 'USD') {
          this.cotizacion = getCotizacion;
      }
      this.repeticion = getRepeticion;
    }
}

// Manejo de monedas
function nuevaMoneda(nombre, cotizacion) {
    this.nombre = nombre;
    this.cotizacion = cotizacion;
}

function calcularEnMonedaExtranjera (monto, moneda) {
    this.monto = monto;
    var cambioMoneda = this.moneda[1];
    var resultado = monto.cambioMoneda;
}

// Manejo del form

function formValues() {
  $( "#btn-form" ).click(function() {
    var camposForm = $( ":input" ).serializeArray();
    console.log(camposForm);
    //guardar datos
    localStorage.setItem("dato", JSON.stringify(camposForm));
    document.getElementById("overlay").style.display = "none";
  });
}

//$( ":checkbox, :radio" ).click( formValues );
//$( "select" ).change( formValues );
formValues();

// Tomar datos

function crearTabla() {
  var datosStorage = localStorage.getItem("dato");
  var listado = JSON.parse(datosStorage);
  console.log(listado);
}
crearTabla();


// Botones principales

$( ".AddBtn" ).click(function(e) {
    document.getElementById("overlay").style.display = "block";
  });

$( ".CloseBtn" ).click(function(e) {
    document.getElementById("overlay").style.display = "none";
  });

$( ".AddEntrada" ).click(function(e) {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("entrada").checked = true;
});
$( ".AddSalida" ).click(function(e) {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("salida").checked = true;
});



$( ".simple-link" ).click(function(e) {
  e.preventDefault();
	e.stopPropagation();
  var href = $(this).attr('href');
  $("#content-area").load(href);
});
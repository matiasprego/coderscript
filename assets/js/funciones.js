allFunctions();
function allFunctions() {

  // Chequeo si tengo guardado en localstore los datosStorage
  if (localStorage.getItem('dato')) {
    var listado = JSON.parse(localStorage.getItem('dato'));
    crearTabla();
  } else {
    var listado = [];
  }

  // Definición de variables
  var tipoMovimiento = ["Anual", "Mensual", "Semanal"];
  var tipoOperacion = ["Gasto", "Ingreso"];

  //var monedasBasicas = ["Pesos", "Dólares"];
  //var monedasSecundarias = ["Euros", "Reales"];
  //var todasMonedas = monedasBasicas.concat(monedasSecundarias);

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

  /*// Manejo de monedas
  function nuevaMoneda(nombre, cotizacion) {
    this.nombre = nombre;
    this.cotizacion = cotizacion;
  }

  function calcularEnMonedaExtranjera(monto, moneda) {
    this.monto = monto;
    var cambioMoneda = this.moneda[1];
    var resultado = monto.cambioMoneda;
  }*/

  // Manejo del form

  function formValues() {
    $("#btn-form").click(function () {
      var camposForm = {};
      $.each($('form#form-entry').serializeArray(), function () {
        camposForm[this.name] = this.value;
      });
      // LO AGREGO AL ARRAY DE OBJETOS DEL LISTADO
      console.log('[camposForm]', camposForm);
      listado.push(camposForm);
      //guardar datos
      localStorage.setItem("dato", JSON.stringify(listado));
      document.getElementById("overlay").style.display = "none";

      // Actualizo tabla
      crearTabla();
      calculo();

    });
  }

  //$( ":checkbox, :radio" ).click( formValues );
  //$( "select" ).change( formValues );
  formValues();



  // Botones principales




  $(".simple-link").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var href = $(this).attr('href');
    $.get(href, function (data, status) {
      $('#content-area').html(data);
    });
  });
}

function nuevoIngreso(e) {
  document.getElementById("overlay").style.display = "block";
}

function nuevaEntrada(e) {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("entrada").checked = true;
}

function nuevaSalida(e) {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("salida").checked = true;
}

function calculo() {
  let totalResta = 0;
  let totalSuma = 0;
  if (localStorage.getItem('totalResta')) {
    totalResta = parseInt(localStorage.getItem('totalResta'));
  }
  if (localStorage.getItem('totalSuma')) {
    totalSuma = parseInt(localStorage.getItem('totalSuma'));
  }
  var gastosMensuales = totalResta / 12;
  var ingresosMensuales = totalSuma / 12;
  var total = ingresosMensuales - gastosMensuales;
  $('#montoGastos').append(gastosMensuales);
  $('#montoIngresos').append(ingresosMensuales);
  $('#montoBalance').append(total);
  $('#saleMes').append(gastosMensuales);
  $('#entraMes').append(ingresosMensuales);
  $('#balanceTotal').append(total);
}

// Tomar datos
function crearTabla() {
  $('tbody').html("");

  var datosStorage = localStorage.getItem("dato");
  var listado = JSON.parse(datosStorage);
  let totalResta = 0;
  let totalSuma = 0;
  if (listado) {
    var htmlTable = '';
    $.each(listado, function (key, row) {
      htmlTable += '<tr>';
      htmlTable += '<td>#</td>';
      htmlTable += '<td>' + row.nombre + '</td>';
      htmlTable += '<td>' + row.tipoDato + '</td>';
      htmlTable += '<td>' + row.repeticion + '</td>';
      //htmlTable += '<td>' + row.moneda + '</td>';
      htmlTable += '<td>USD</td>';
      htmlTable += '<td>' + row.amount + '</td>';
      if (row.repeticion == "Semanal") {
        htmlTable += '<td>' + (row.amount * 52) + '</td>';
        if (row.tipoDato == "entrada") {
          totalSuma += (row.amount * 52);
        } else if (row.tipoDato == "salida") {
          totalResta += (row.amount * 52);
        }
      }
      else if (row.repeticion == "Mensual") {
        htmlTable += '<td>' + (row.amount * 12) + '</td>';
        if (row.tipoDato == "entrada") {
          totalSuma += (row.amount * 12);
        } else if (row.tipoDato == "salida") {
          totalResta += (row.amount * 12);
        }
      }
      else if (row.repeticion == "Diario") {
        htmlTable += '<td>' + (row.amount * 365) + '</td>';
        if (row.tipoDato == "entrada") {
          totalSuma += (row.amount * 365);
        } else if (row.tipoDato == "salida") {
          totalResta += (row.amount * 365);
        }
      }
      else {
        htmlTable += '<td>' + row.amount + '</td>';
        if (row.tipoDato == "entrada") {
          totalSuma += parseInt(row.amount);
        } else if (row.tipoDato == "salida") {
          totalResta += parseInt(row.amount);
        }
      }
      htmlTable += '</tr>';

    });
    localStorage.setItem('totalResta', totalResta);
    localStorage.setItem('totalSuma', totalSuma);

    $('tbody').append(htmlTable);
  }
}

$(document).ready(function () {
  $.get("principal.html", function (data, status) {
    $('#content-area').html(data);
    $(".simple-link").click(function (e) {
      e.preventDefault();
      e.stopPropagation();
      var href = $(this).attr('href');
      $.get(href, function (data, status) {
        $('#content-area').html(data);
        allFunctions();
      });

    });
    calculo();

  });
});


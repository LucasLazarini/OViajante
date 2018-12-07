// ---------------Desenvolvedores-------------- //
//                                              //
//          Emanoel Juvêncio - 400965           //
// 	        Leonardo Castro  - 400956           //
//          Lucas Lazarini	 - 400950           //
//                                              //
// ---------------Desenvolvedores-------------- //

  $('#info').hide();



function getLocation(){
  $('#info').hide();
  $('#loadCar').show();
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
    }else{
    console.log("O seu navegador não suporta Geolocalização.");
    }
  }

function showPosition(position){
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  latitudeOrigem = position.coords.latitude;
  longitudeOrigem = position.coords.longitude;

  cidadeDestino = $('#inpCidadeDestino').val();
  estadoDestino = $('#inpEstadoDestino').val();
  $("#cidadeDestino").text(cidadeDestino);
  $("#estadoDestino").text(estadoDestino);

  $("#titCidadeDestino").text(cidadeDestino);
  $("#titEstadoDestino").text(estadoDestino);


  var info;

  // --- Busca do nome da cidade e estado em que o usuário está localizado
  var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitudeOrigem+","+longitudeOrigem+"&key=AIzaSyBuY3wunKGrHCRczdd7jFoOrABN2ylrEmk";
  console.log(url);
  fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
  .then(response => response.json())
    .then(function(data) {
      //--- Pegando linha com a cidade e estado, dividindo e colocando em variaveis separadas. ---
      info = data.plus_code.compound_code;

      info = info.replace(" ",",");
      info = info.replace(" ","");
      var partes = info.split(',');
      cidadeOrigem = partes[1];
      estadoOrigem = partes[2];

      $("#cidadeOrigem").text(cidadeOrigem);
      $("#estadoOrigem").text(estadoOrigem);
      // --- Unindo cidades que contenham espaços.
      var tamOrigem = cidadeOrigem.length;
      for (var i = 0; i < tamOrigem; i++) {
        cidadeOrigem = cidadeOrigem.replace(" ","+");
      }

      var tamDestino = cidadeDestino.length;
      for (var i = 0; i < tamDestino; i++) {
        cidadeDestino = cidadeDestino.replace(" ","+");
      }
      cidadeOrigemEstado = cidadeOrigem +","+estadoOrigem;
      cidadeDestinoEstado = cidadeDestino+","+estadoDestino;

      console.log("Cidade de Origem:"+ cidadeOrigemEstado);
      console.log("Cidade de Destino:"+ cidadeDestinoEstado);
      BuscaInfoGoogle(cidadeOrigemEstado, cidadeDestinoEstado);
      BuscaIdCidadeDestino(cidadeDestino, estadoDestino);
    })
  .catch(() => alert("Infelizmente houve um problema com o comunicação, tente novamente mais tarde"))




}


function BuscaInfoGoogle(cidadeOrigemEstado, cidadeDestinoEstado) {
  var url = "https://maps.googleapis.com/maps/api/directions/json?origin="+cidadeOrigemEstado+"&destination="+cidadeDestinoEstado+"&key=AIzaSyBuY3wunKGrHCRczdd7jFoOrABN2ylrEmk";
  console.log(url);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
  .then(response => response.json())
  .then(function(data) {
    distancia = data.routes[0].legs[0].distance.text;
    tempoTrajeto = data.routes[0].legs[0].duration.text;
    latitudeDestino = data.routes[0].legs[0].end_location.lat;
    longitudeDestino = data.routes[0].legs[0].end_location.lng;
    console.log(distancia);
    console.log(tempoTrajeto);
    console.log(latitudeDestino);
    console.log(longitudeDestino);

    $("#distancia").text(distancia);
    $("#tempoEstimado").text(tempoTrajeto);


  })
  .catch(() => alert("Infelizmente houve um problema com o comunicação, tente novamente mais tarde"))
}


function BuscaIdCidadeDestino(cidadeDestino, estadoDestino) {
  url = "http://apiadvisor.climatempo.com.br/api/v1/locale/city?name="+cidadeDestino+"&state"+estadoDestino+"&token=a850f495ac92b626801b8c7d18db87e5";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  fetch(proxyurl + url)
  .then(response => response.json())
  .then(function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      if (data[i].state == estadoDestino ) {
        idCidadeDestino = data[i].id;
      }
    }
    console.log(idCidadeDestino);
    BuscaClimaCidadeDestino(idCidadeDestino);
  })
}


function BuscaClimaCidadeDestino(idCidadeDestino) {
  console.log(idCidadeDestino);
  url = "http://apiadvisor.climatempo.com.br/api/v1/weather/locale/"+idCidadeDestino+"/current?token=a850f495ac92b626801b8c7d18db87e5";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  fetch(proxyurl + url)
  .then(response => response.json())
  .then(function(data) {
    umidadeCidadeDestino = data.data.humidity;
    temperaturaCidadeDestino = data.data.temperature;
    climaCidadeDestino = data.data.condition;
    console.log(climaCidadeDestino);
    console.log(temperaturaCidadeDestino);
    console.log(umidadeCidadeDestino);

    $("#condCli").text(climaCidadeDestino);
    $("#temperatura").text(temperaturaCidadeDestino);
    $("#umidade").text(umidadeCidadeDestino);
    $('#loadCar').hide();
    $('#info').show();

  })
}

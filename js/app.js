if (navigator.serviceWorker){
  navigator.serviceWorker.register('sw.js')
  .then(function(){
    console.log("sw registrado");
  })
  .catch(function(err){
    console.log("sw não funciona: "+err);
  });
} else {
  console.log("SW não suportado. Atualize o navegador ou vá embora.")
}

console.log("inicio Script");

let formularioHTML = document.getElementById('formulario');
//var resultados = { texto: 'esto no debe ser asi'};

formularioHTML.addEventListener('submit', function(e){
  e.preventDefault();
  //console.log('me diste un click');
  let datos = new FormData(formularioHTML);
  //console.log(datos);
  //console.log(datos.get('datoBusqueda'));

  obtenerImagenes(datos.get('datoBusqueda'));
  //console.log(imagenes);
})

function obtenerImagenes(cadena){
  let url = `https://pixabay.com/api/?key=13119123-71c035b33f77efe6f842330ec&q=${cadena}&per_page=20`;
  console.log(url);

  const api = new XMLHttpRequest();
  api.open('GET', url, true);
  api.send();

  //const resultados = {};
  api.onreadystatechange = function(){

    if(this.status == 200 && this.readyState == 4){
      //console.log(this.responseText);
      var resultados = JSON.parse(this.responseText);
      console.log(resultados.hits);
      //return resultados.hits;

      let pizarra = document.getElementById('mapa');
      pizarra.innerHTML = '';
      for(let item of resultados.hits){
        pizarra.innerHTML += imprimirImagenes(item);
      }
      
    }

  }
  //console.log(resultados);
  //return api.onreadystatechange;
}

function imprimirImagenes(objeto){
  let lienzo = `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card">
        <img src="${objeto.previewURL}" alt="${objeto.tags}" class="card-img-top" />
        <div class="card-body">
          <p class="card-text"> ${objeto.likes} Me gusta </p>
          <p class="card-text"> ${objeto.views} Visitas </p>

          <a href="${objeto.largeImageURL}" target="_blank"
          class="btn btn-primary btn-block">Ver Imagen</a>

        </div>
      </div>
    </div>
  `;
  return lienzo;
}

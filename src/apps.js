//console.log("inicio Script");

let formularioHTML = document.getElementById('formulario');
let botonAnt = document.getElementById('pagAnterior');
let botonSig = document.getElementById('pagSiguiente');

botonAnt.style.display = "none";
botonSig.style.display = "none";

let parametros = {
  texto: '',
  hoja: 1
  //paginacion: 'display'
};

formularioHTML.addEventListener('submit', function(e){
  e.preventDefault();
  //console.log('me diste un click');
  let datos = new FormData(formularioHTML);
  parametros.hoja = 1;
  //console.log(formularioHTML.children[0].firstElementChild.firstElementChild.value);
  //console.log(datos.get('datoBusqueda'));
  parametros.texto = datos.get('datoBusqueda');
  //console.log(parametros.texto);
  formularioHTML.children[0].firstElementChild.firstElementChild.value = '';

  obtenerImagenes(parametros.texto, parametros.hoja);
  //console.log(imagenes);
})

function obtenerImagenes(cadena, pagina){
  let url = `https://pixabay.com/api/?key=13119123-71c035b33f77efe6f842330ec&q=${cadena}&per_page=20&page=${pagina}`;
  //console.log(url);

  const api = new XMLHttpRequest();
  api.open('GET', url, true);
  api.send();

  //const resultados = {};
  api.onreadystatechange = function(){

    if(this.status == 200 && this.readyState == 4){
      //console.log(this.responseText);
      var resultados = JSON.parse(this.responseText);
      //console.log(resultados.hits);
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
  botonAnt.style.display = "inline-block";
  botonSig.style.display = 'inline-block';
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

function scroll(){
  const elemento = document.querySelector('.jumbotron');
  elemento.scrollIntoView('smooth', 'end');
}

botonAnt.addEventListener('click', function(){
  //console.log(hoja--);
  if(parametros.hoja > 1){
    parametros.hoja--;
    obtenerImagenes(parametros.texto, parametros.hoja);
    scroll();
  }
});

botonSig.addEventListener('click', function(){
  //console.log(hoja++);
  parametros.hoja++
  obtenerImagenes(parametros.texto, parametros.hoja);
  scroll();
});

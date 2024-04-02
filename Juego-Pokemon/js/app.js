//---------------------NODOS Y VARIABLES-----------------------------
//barra de datos
const txtVictorias = document.getElementById('victorias');
const txtRecord = document.getElementById('record');
const msjTotal = document.querySelector('.msj-total');


let contJugador = 0;
let contPc = 0;
let racha = 0;
let record = localStorage.getItem('record');
if (record == null){
    record = 1;
};
txtRecord.innerHTML = `Record: ${record}`;

let nameRecord = localStorage.getItem('nameRecord');
if (nameRecord == null || nameRecord == "") {
    nameRecord = "";
    txtRecord.innerHTML = `Record: ${record}`;
} else {
    txtRecord.innerHTML = `Record: ${record} - ${nameRecord}`;
};

//precargar imagenes
function preload_image(im_url) {
    let img = new Image();
    img.src = im_url;
  }
preload_image("assets/fuego.png");
preload_image("assets/planta.png");
preload_image("assets/roca.png");
preload_image("assets/bicho.png");
preload_image("assets/agua.png");

//zona de batalla

const msjBatalla = document.getElementById('msj-batalla');
const imgAtaqueJugador = document.getElementById('img-ataque-jugador');
const imgAtaquePc = document.getElementById('img-ataque-pc');
const destelloJugador = document.getElementById('destello-jugador');
const destelloPc = document.getElementById('destello-pc');

let imgJugador;
let imgPc;

const imagenes = [
    {name: "Fuego", url: "assets/fuego.png"},
    {name: "Planta", url: "assets/planta.png"},
    {name: "Roca", url: "assets/roca.png"},
    {name: "Bicho", url: "assets/bicho.png"},
    {name: "Agua", url: "assets/agua.png"}
];


//botones seleccion pokemon
const btnFuego = document.getElementById('btn-fuego');
const btnPlanta = document.getElementById('btn-planta');
const btnRoca = document.getElementById('btn-roca');
const btnBicho = document.getElementById('btn-bicho');
const btnAgua = document.getElementById('btn-agua');

let nAleatorio = n => Math.floor(Math.random() * 5);
let opcionJugador;
let opcionPc;


//---------------------FUNCIONES------------------------------------

// Seleccion de pokemon Jugador
btnFuego.addEventListener('click', function(){
    opcionJugador = "Fuego";
    opPc();
});
btnPlanta.addEventListener('click', function(){
    opcionJugador = "Planta";
    opPc();
});
btnRoca.addEventListener('click', function(){
    opcionJugador = "Roca";
    opPc();
})
btnBicho.addEventListener('click', function(){
    opcionJugador = "Bicho";
    opPc();
})
btnAgua.addEventListener('click', function(){
    opcionJugador = "Agua";
    opPc();
})


// Seleccion aleatoria de pokemon PC

function opPc(){
    let aleatorio = nAleatorio();

    if(aleatorio == 0){
        opcionPc = "Fuego";
    }else if(aleatorio == 1){
        opcionPc = "Planta";
    }else if(aleatorio == 2){
        opcionPc = "Roca";
    }else if(aleatorio == 3){
        opcionPc = "Bicho";
    }else if(aleatorio == 4){
        opcionPc = "Agua"
    };
    addImagenes();
};

//Funcion mostrar imagenes de pokemons luchadores

function addImagenes(){
    for(let i=0;i<imagenes.length;i++){
        if(opcionJugador == imagenes[i].name){
            imgJugador = imagenes[i].url;
            imgAtaqueJugador.src = imgJugador;
        };
        
        if(opcionPc == imagenes[i].name){
            imgPc = imagenes[i].url;
            imgAtaquePc.src = imgPc;
        };
        
    };
    
    imgAtaquePc.classList.remove('img-batalla-lose', 'img-batalla-win');
    imgAtaqueJugador.classList.remove('img-batalla-lose', 'img-batalla-win');
    destelloJugador.classList.add('oculto');
    destelloPc.classList.add('oculto');
    msjBatalla.innerHTML = "";
    msjBatalla.classList.remove('animate-movimiento-rebote');



    setTimeout(() => {
        batalla();
    }, 200);
    
    imgAtaqueJugador.classList.add('animate-left');
    imgAtaquePc.classList.add('animate-left');

};

//Funcion mostrar texto resultado, sumar datos y aplicar efectos de imagenes

function batalla(){

    imgAtaqueJugador.classList.remove('animate-left');
    imgAtaquePc.classList.remove('animate-left');

    if(opcionJugador == opcionPc){
        msjBatalla.innerHTML = "EMPATE";
        msjBatalla.classList.add('animate-movimiento-rebote');
        msjTotal.innerHTML = `${contJugador} - ${contPc}`;
        txtVictorias.innerHTML = `Victorias seguidas: ${racha}`
        revisarRecord ();

    }else if(opcionJugador == "Fuego" && (opcionPc == "Planta" || opcionPc == "Bicho")){
    ganador();

    }else if(opcionJugador == "Roca" && (opcionPc == "Fuego" || opcionPc == "Bicho")){
    ganador();

    }else if(opcionJugador == "Planta" && (opcionPc == "Agua" || opcionPc == "Roca")){
    ganador();

    }else if(opcionJugador == "Bicho" && (opcionPc == "Agua" || opcionPc == "Planta")){
    ganador();

    }else if(opcionJugador == "Agua" && (opcionPc == "Fuego" || opcionPc == "Roca")){
    ganador();

    }else{
        contPc = 1+contPc;
        msjBatalla.innerHTML = "DERROTA";
        msjBatalla.classList.add('animate-movimiento-rebote');
        msjTotal.innerHTML = `${contJugador} - ${contPc}`;
        txtVictorias.innerHTML = `Victorias seguidas: ${racha}`
        imgAtaqueJugador.classList.add('img-batalla-lose');
        imgAtaquePc.classList.add('img-batalla-win');
        destelloPc.classList.remove('oculto');
        revisarRecord ();
    };

};

function ganador() {
    contJugador = 1+contJugador;
    racha = 1+racha;
    msjBatalla.innerHTML = "VICTORIA!";
    msjBatalla.classList.add('animate-movimiento-rebote');
    msjTotal.innerHTML = `${contJugador} - ${contPc}`;
    txtVictorias.innerHTML = `Victorias seguidas: ${racha}`
    imgAtaquePc.classList.add('img-batalla-lose');
    imgAtaqueJugador.classList.add('img-batalla-win');
    destelloJugador.classList.remove('oculto');
 }

// Codigo para añadir nuevo Record y mostrar el actual
function revisarRecord (){
    if (racha > record) {
        record = racha;
        localStorage.setItem("record", record);
        abrirModal();
    }
    reinicioRacha();
}

function reinicioRacha(){
    racha = 0;
    txtVictorias.innerHTML = `Victorias seguidas: ${racha}`

}


// Codigo para Modal


let modal = document.getElementById('modal');
let cerrarModalIcon = document.getElementById('closeModal');
let body = document.querySelector('body');
let botonGuardarRecord = document.getElementById('btnRecord');


function abrirModal(){
    modal.classList.remove('oculto');
    body.style.overflow = 'hidden';
    body.style.position = 'static';
    body.style.height = '100%';
}

botonGuardarRecord.addEventListener('click', function(){
    nameRecord = document.getElementById("nombre").value;
    localStorage.setItem("nameRecord", nameRecord);
    txtRecord.innerHTML = `Record: ${record} - ${nameRecord}`;
    cerrarModal()
})

cerrarModalIcon.addEventListener('click', function(){
    nameRecord = "";
    localStorage.setItem("nameRecord", nameRecord);
    txtRecord.innerHTML = `Record: ${record} - ${nameRecord}`;
    cerrarModal()
})

function cerrarModal(){
    modal.classList.add('oculto');
    leyendamodal.classList.add('oculto');
    body.style.overflow = 'visible';
    body.style.position = 'inherit';
    body.style.height = 'auto';

    if (nameRecord == null || nameRecord == "") {
        nameRecord = "";
        txtRecord.innerHTML = `Record: ${record}`;
    } else {
        txtRecord.innerHTML = `Record: ${record} - ${nameRecord}`;
    };
}



// leyenda modal

let leyenda = document.querySelector('.leyenda');
let leyendaModal = document.getElementById('leyendamodal');
let btnCerrar = document.getElementById('btnCerrar');
let cerrarLeyendaIcon = document.getElementById('closeLeyenda');

leyenda.addEventListener('click', function(){
    leyendaModal.classList.remove('oculto');
    body.style.overflow = 'hidden';
    body.style.position = 'static';
    body.style.height = '100%';
})

btnCerrar.addEventListener('click', function(){
    cerrarModal()
})
cerrarLeyendaIcon.addEventListener('click', function(){
    cerrarModal()
})




// para borrar el record del localStorage: localStorage.clear();
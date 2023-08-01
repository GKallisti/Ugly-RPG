//Constructor de personajes y objetos enemigos.
function Personaje(nombre, hp, ataque, inventario, oro) {
    this.nombre = nombre;
    this.hp = hp;
    this.ataque = ataque;
    this.inventario = inventario;
    this.oro = oro
}
const Mago = new Personaje("Mago", 75, 26, ["Vara", "Scroll"], 50)

const Guerrero = new Personaje("Guerrero", 100, 35, ["Espada", "Escudo"], 30)

const Ninja = new Personaje("Ninja", 90, 30, ["Katana", "Bomba de Humo"], 75)

const Goblin = {
    nombre: "Goblin",
    hp: 25,
    ataque: 5,
    oro: 10
}
const Orco = {
    nombre: "Orco",
    hp: 70,
    ataque: 20,
    oro: 100
}
// Zona de variables globales

const seleccionardiv = document.getElementById('Select')
const divlugares = document.getElementById('Mover')
const ataqueS = document.getElementById('ataque')
const taberna = document.getElementById('taberna')
const comprar = document.getElementById('comprar')
const apostardiv = document.getElementById('apostar')
const gitanadiv = document.getElementById('gitana')
const parrafod = document.getElementById('parrafod')


const boton0 = document.getElementById("0")
const boton1 = document.getElementById("1")
const boton2 = document.getElementById("2")
const botona = document.getElementById("a")
const botonb = document.getElementById("b")
const botonc = document.getElementById("c")
const botonG = document.getElementById("Ataque")
const botonH = document.getElementById("Huir")
const botonQ = document.getElementById("Q")
const botonW = document.getElementById("W")
const botonE = document.getElementById("E")
const imagen = document.getElementById("imagen")
const botonPan = document.getElementById("Pan")
const botonCerv = document.getElementById("Cerveza")
const encantarb = document.getElementById("encantar")
const fortunab = document.getElementById("fortuna")
const diez = document.getElementById("diez")
const veinte = document.getElementById("veinte")
const botonreiniciar = document.getElementById("Exit")
const botonregreso = document.getElementById("Regresar")
let parrafo = document.getElementById('parrafo')

let selectedPj
let enemy
let stage = 1


let fortuna
let zodiac = ["aries","taurus","cancer","leo","scorpio","virgo","capricorn","aquarius","libra"]
let signo = zodiac[[Math.floor(Math.random() * zodiac.length)]]
const Url = `https://aztro.sameerkumar.website/?sign=${signo}&day=today`;
    fetch( Url, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(json => {
         fortuna = json;
        console.log(fortuna.description);
    });
//Aca empiezan las funciones auxiliares
function showToast(message) {
    Toastify({
      text: message,
      duration: 4000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
      offset: {
        x: 150, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      className: "info",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
    }).showToast();
  }


function aplicarestilos(element, styles) {
    for (const [property, value] of Object.entries(styles)) {
      element.style[property] = value;
    }
  }


  function mostrar(element) {
    element.classList.remove('hidden');
    element.style.visibility = 'visible';
    element.style.display = 'grid';
  }

  function ocultar(element) {
    element.style.visibility = 'hidden';
  }

function atk(num1, num2) {
    let resultado = num1 - num2
    return resultado
}
function Victoria(){
    parrafod.classList.remove('hidden')
        mostrar(parrafod)
        ocultar(ataqueS)
        ocultar(botonregreso)
        parrafo.style.display = "grid"
        imagen.src = "Imagenes/Victory.png"
        parrafo.innerText = "Felicidades viajero! Has llegado al final de esta aventura..."
              
}
function Derrota(){
    mostrar(parrafod) 
    parrafo.style.display = "grid"
    ocultar(ataqueS)
    ocultar(botonregreso)
    imagen.src = "Imagenes/Defeat.png"
    parrafo.innerText = "Oh! Mejor suerte la proxima..."
          }

function Comprar() {
    stage = -1
    mostrar(comprar);
    aplicarestilos(comprar, {
      visibility: 'visible',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 600px)',
      gridTemplateRows: '80px',
    });
    botonPan.innerText = "Pan"
    botonCerv.innerText = "Cerveza de Raiz"

    botonPan.addEventListener('click', (event) => {
        if (selectedPj.oro > 5) {
            selectedPj.oro = atk(selectedPj.oro, 5)
            selectedPj.hp = selectedPj.hp + 10

            showToast( "Con el estomago lleno recuperas +10 Hp. Ahora tienes " + selectedPj.hp + " de vida y te quedan" + selectedPj.oro + " monedas de oro");
        }
        else {
            showToast( "No tenes suficientes monedas! ");
        }   })
    botonCerv.addEventListener('click', (event) => {
        if (selectedPj > 10) {
            selectedPj.oro = atk(selectedPj.oro, 10)
            selectedPj.ataque = selectedPj.ataque - 5
            showToast(
                "Esa cerveza estaba muy fuerte... Tenes ahora -5 puntos de ataque.");
    }
        else {
            showToast( "No tenes suficientes monedas! ");
        }
    })
}
function apostar() {
    stage = -1
    taberna.style.display = 'none';
    mostrar(apostardiv);
    aplicarestilos(apostardiv, {
      visibility: 'visible',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 600px)',
      gridTemplateRows: '80px',
    });



    diez.addEventListener('click', (event) => {
        if (selectedPj.oro > 10) {
            selectedPj.oro = selectedPj.oro - 10
            selectedPj.oro = selectedPj.oro + Math.ceil(Math.random() * 20)
            showToast("Apostaste 10 Monedas de oro... Ahora tenes " + selectedPj.oro + " monedas de oro." );
        }
        else {
            showToast( "No tenes suficientes monedas para apostar! " );

        }

    })

    veinte.addEventListener('click', (event) => {
        if (selectedPj.oro > 20) {
            selectedPj.oro = selectedPj.oro - 20
            selectedPj.oro = selectedPj.oro + Math.ceil(Math.random() * 50)
            showToast('Apostaste 20 Monedas de oro... Ahora tenes " + selectedPj.oro + " monedas de oro.')
        }
        else {
            showToast("No tienes suficientes monedas!");
        }

    })



}
function Gitana() {
    stage = -1
    taberna.style.display = "none";
    mostrar(gitanadiv);
    aplicarestilos(gitanadiv, {
      visibility: "visible",
      display: "grid",
      gridTemplateColumns: "repeat(2, 600px)",
      gridTemplateRows: "80px"
    });

    encantarb.addEventListener('click', (event) => {
        if(selectedPj.oro >20){
            inventario = selectedPj.inventario
            armapj = selectedPj.inventario[0]
            selectedPj.ataque = selectedPj.ataque + 10
            selectedPj.oro = selectedPj.oro - 20
            armanueva = armapj + " encantada"
            selectedPj.inventario = inventario.splice(0,1,armanueva)
            showToast(
                "Tu arma ha sido encantada! Ahora tienes " +
                  armanueva +
                  " Su daño es de " +
                  selectedPj.ataque
              );
        }
        else {
            showToast("No tienes suficientes monedas!");

        } 

    })
    
    fortunab.addEventListener('click', (event) => {
        if(selectedPj.oro > 10){
        selectedPj.oro = selectedPj.oro - 10
        mostrar(parrafod)
        parrafo.style.visibility = "visible"
        let coso = fortuna.description
        parrafo.innerText = coso
        showToast(
            "Le das 10 monedas de oro a la gitana y escuchas atentamente mientras ella saca sus cartas..."
          );
    }
    else {
        showToast(
            "No tienes suficientes monedas para consultar por tu destino. Ojalá no te cruces enemigos más adelante..."
          );
    }
    })

}
function Taberna() {

    stage = "T"
    imagen.src = "Imagenes/TavernaAll.png"
    ocultar(divlugares)
    mostrar(taberna)
    taberna.classList.remove('hidden')

    botonQ.innerText = "Comprar"
    botonW.innerText = "Apostar"
    botonE.innerText = "Gitana"

    aplicarestilos(taberna, {
        visibility: "visible",
        display: "grid",
        gridTemplateColumns: "repeat(3, 400px)",
        gridTemplateRows: "50 px"
      });

    selectedPj = JSON.parse(localStorage.getItem("selected"))

    botonQ.addEventListener('click', (event) => {
        Comprar(selectedPj)
    })
    botonW.addEventListener('click', (event) => {
        apostar(selectedPj)
    })
    botonE.addEventListener('click', (event) => {
        Gitana(selectedPj)
    })

}
function Ataques() {
    stage = 3
    divlugares.style.visibility = "hidden"
    ataqueS.classList.remove('hidden')
    ataqueS.style.display = "grid"
    ataqueS.style.gridTemplateColumns = " repeat(2, 500px)"
    ataqueS.style.gridTemplateRows = "50 px"

    let Pj = selectedPj
    let en = enemy

    switch (Pj.nombre) {
        case "Mago":
            botonG.addEventListener('mouseover', (event) => {
                if (en.nombre == "Goblin") {
                    imagen.src = "Imagenes/BosqueMHover.png"
                }
                else {
                    imagen.src = "Imagenes/CuevaMHover.png"
                }
            })
            botonH.addEventListener('mouseover', (event) => {
                if (en.nombre == "Goblin") {
                    imagen.src = "Imagenes/HuirMBosque.png"
                }
                else {
                    imagen.src = "Imagenes/HuirMCueva.png"
                }
            })
            botonG.addEventListener('click', (event) => {
                Pj.hp = atk(Pj.hp, en.ataque)
                en.hp = atk(en.hp, Pj.ataque)

                if (Pj.hp > 0 && en.hp > 0) {
                    enombre = en.nombre
                    ehp = en.hp
                    pja = Pj.ataque
                    pjv = Pj.hp
                    ea = en.ataque

                    Toastify("Atacaste al " + enombre + "! Le quedan " + en.hp + " De vida ");

                    Toastify( enombre + " te ha atacado! Te quedan " + pjv + " de vida! ");
                    

                }
                else if (Pj.hp > 0 && en.hp <= 0) {
                    let eoro = en.oro
                    let pjoro = Pj.oro
                    let enombre = en.nombre
                    ataqueS.style.visibility = "hidden"
                    let loot = eoro + pjoro
                    Pj.oro = loot

                    Toastify("Has derrotado al " + enombre + "! Ganaste " + eoro + " monedas de oro! ");
                    Victoria()

                }
                else if (Pj.hp <= 0 && en.hp > 0) {

                    ataqueS.style.visibility = "hidden"
                    Toastify("Fuiste derrotado por " + enombre);
                    Derrota()

                }
            })

            botonH.addEventListener('click', (event) => {
        
                Toastify( "Usas tu Scroll para transportarte a la Taberna...");
                stage = "T"
                imagen.src = "Imagenes/TavernaAll.png"
                ataqueS.style.display = "none"
                taberna.style.visibility = "visible"
                taberna.classList.remove('hidden')
                botonQ.innerText = "Comprar"
                botonW.innerText = "Apostar"
                botonE.innerText = "Gitana"
                taberna.style.display = "grid"
                taberna.style.gridTemplateColumns = " repeat(3, 400px)"
                taberna.style.gridTemplateRows = "50 px"
                Taberna()   
            })
            break;

        case "Guerrero":

            botonG.addEventListener('mouseover', (event) => {
                if (en.nombre == "Goblin") {
                    imagen.src = "Imagenes/BosqueGHover.png"
                }
                else {
                    imagen.src = "Imagenes/CuevaGHover.png"
                }
            })
            botonH.addEventListener('mouseover', (event) => {

                if (en.nombre == "Goblin") {

                    imagen.src = "Imagenes/BosqueGHuir-hover.png"
                }
                else {
                    imagen.src = "Imagenes/CuevaGHover-Huir.png"
                }
            })
            botonG.addEventListener('click', (event) => {

                Pj.hp = atk(Pj.hp, en.ataque)
                en.hp = atk(en.hp, Pj.ataque)

                if (Pj.hp > 0 && en.hp > 0) {
                    enombre = en.nombre
                    ehp = en.hp
                    pja = Pj.ataque
                    pjv = Pj.hp
                    ea = en.ataque
                    Toastify( "Atacaste al " + enombre + "! Le quedan " + en.hp + " De vida ");

                    Toastify( enombre + " te ha atacado! Te quedan " + pjv + " de vida! ");
                }
                else if (Pj.hp > 0 && en.hp <= 0) {
                    let eoro = en.oro
                    let pjoro = Pj.oro
                    let enombre = en.nombre
                    ataqueS.style.visibility = "hidden"
                    let loot = eoro + pjoro
                    Pj.oro = loot

                    Toastify( "Has derrotado al " + enombre + "! Ganaste " + eoro + " monedas de oro! ");

                    Victoria()

                }
                else if (Pj.hp <= 0 && en.hp > 0) {

                    ataqueS.style.visibility = "hidden"
                    Toastify("Fuiste derrotado por " + enombre);
                }
            })
            botonH.addEventListener('click', (event) => {
                if(en.nombre == "Goblin"){
                    imagen.src = "Imagenes/HuirGBosque.png"
                }
                else {imagen.src = "Imagenes/HuirGCueva.png"}
                ataqueS.style.visibility = "hidden"
                Toastify( "Fuiste derrotado por una avalancha de piedras, para que semejante espada si no la ibas a usar?");
               
                Derrota()

            }); break;

        case "Ninja":

            botonG.addEventListener('mouseover', (event) => {
                if (en.nombre == "Goblin") {
                    imagen.src = "Imagenes/BosqueNHover.png"
                }
                else {
                    imagen.src = "Imagenes/CuevaNHover.png"
                }
            })
            botonH.addEventListener('mouseover', (event) => {

                if (en.nombre == "Goblin") {
                    imagen.src = "Imagenes/BosqueNHuir-hover.png"
                }
                else {
                    imagen.src = "Imagenes/CuevaNHover-Huir.png"
                }
            })
            botonG.addEventListener('click', (event) => {

                Pj.hp = atk(Pj.hp, en.ataque)
                en.hp = atk(en.hp, Pj.ataque)

                if (Pj.hp > 0 && en.hp > 0) {
                    enombre = en.nombre
                    ehp = en.hp
                    pja = Pj.ataque
                    pjv = Pj.hp
                    ea = en.ataque

                    Toastify( "Atacaste al " + enombre + "! Le quedan " + en.hp + " De vida ");

                    Toastify( enombre + " te ha atacado! Te quedan " + pjv + " de vida! ");
                }
                else if (Pj.hp > 0 && en.hp <= 0) {
                    let eoro = en.oro
                    let pjoro = Pj.oro
                    let enombre = en.nombre
                    ataqueS.style.visibility = "hidden"
                    let loot = eoro + pjoro
                    pjoro = loot

                    Toastify( "Has derrotado al " + enombre + "! Ganaste " + eoro + " monedas de oro! ");
                    Victoria()

                }
                else if (Pj.hp <= 0 && en.hp >= 0) {

                    ataqueS.style.visibility = "hidden"
                    Toastify( "Fuiste derrotado por " + enombre);
                    Derrota()

                }
            })
            botonH.addEventListener('click', (event) => {
                if(en.nombre == "Goblin"){
                    imagen.src = "Imagenes/HuirNBosque.png"
                } else {imagen.src = "Imagenes/HuirNCueva.png"
                }
                ataqueS.style.visibility = "hidden"
                Toastify( "Usas tu Bomba de humo para evadir el ataque y sigues tu camino a la siguiente ciudad... ");
                Victoria()
            })
    }
}
function Lugares() {
    stage = 2
    imagen.src = "Imagenes/Lugares.png"
    seleccionardiv.style.visibility = "hidden"
    divlugares.classList.remove('hidden')
    divlugares.style.display = "grid"
    divlugares.style.gridTemplateColumns = " repeat(3, 400px)"

    botona.innerText = "Cueva"
    botonb.innerText = "Taberna"
    botonc.innerText = "Bosque"

    selectedPj = JSON.parse(localStorage.getItem("selected"))
    enemy = JSON.parse(localStorage.getItem("enemy"))

    if (selectedPj.nombre == "Mago") {
        botona.addEventListener('mouseover', (event) => {
            imagen.src = "Imagenes/Lugares-Mago0.png"
        })
        botonb.addEventListener('mouseover', (event) => {
            imagen.src = "Imagenes/Lugares-Mago1.png"
        })
        botonc.addEventListener('mouseover', (event) => {
            imagen.src = "Imagenes/Lugares-Mago2.png"

        })
        botona.addEventListener('click', (event) => {
            localStorage.setItem("enemy", JSON.stringify(Orco))
            enemy = JSON.parse(localStorage.getItem("enemy"))
            imagen.src = "Imagenes/CuevaM.png"
            Ataques(selectedPj,enemy)
        })

        botonb.addEventListener('click', (event) => {
            imagen.src = "Imagenes/TavernaAll.png"
            Taberna(selectedPj)
        })

        botonc.addEventListener('click', (event) => {
            imagen.src = "Imagenes/BosqueM.png"
            localStorage.setItem("enemy", JSON.stringify(Goblin))
            enemy = JSON.parse(localStorage.getItem("enemy"))
            Ataques(selectedPj,enemy)
        })
    }
    else if (selectedPj.nombre == "Guerrero") {
        botona.addEventListener('mouseover', (event) => {
            imagen.src = "Imagenes/Lugares-Guerrero0.png"
        })
        botonb.addEventListener('mouseover', (event) => {
            imagen.src = "Imagenes/Lugares-Guerrero1.png"
        })
        botonc.addEventListener('mouseover', (event) => {
            imagen.src = "Imagenes/Lugares-Guerrero2.png"
        })
        botona.addEventListener('click', (event) => {
            imagen.src = "Imagenes/CuevaG.png"
            localStorage.setItem("enemy", JSON.stringify(Orco))
            enemy = JSON.parse(localStorage.getItem("enemy"))
            Ataques(selectedPj,enemy)
        })

        botonb.addEventListener('click', (event) => {
            imagen.src = "Imagenes/TavernaAll.png"
            Taberna(selectedPj)
        })
        botonc.addEventListener('click', (event) => {
            imagen.src = "Imagenes/BosqueG.png"
            localStorage.setItem("enemy", JSON.stringify(Goblin))
            enemy = JSON.parse(localStorage.getItem("enemy"))
            Ataques(selectedPj,enemy)
        })
    }
    else {
        botona.addEventListener('mouseover', (event) => {
            imagen.src = "Imagenes/Lugares-Ninja0.png"
        })
        botonb.addEventListener('mouseover', (event) => {
            imagen.src = "Imagenes/Lugares-Ninja1.png"
        })
        botonc.addEventListener('mouseover', (event) => {
            imagen.src = "Imagenes/Lugares-Ninja2.png"
        })
        botona.addEventListener('click', (event) => {
            imagen.src = "Imagenes/CuevaN.png"
            localStorage.setItem("enemy", JSON.stringify(Orco))
            enemy = JSON.parse(localStorage.getItem("enemy"))
            Ataques(selectedPj,enemy)
        })
        botonb.addEventListener('click', (event) => {
            imagen.src = "Imagenes/TavernaAll.png"
            Taberna(selectedPj)
        })
        botonc.addEventListener('click', (event) => {
            imagen.src = "Imagenes/BosqueN.png"
            localStorage.setItem("enemy", JSON.stringify(Goblin))
            enemy = JSON.parse(localStorage.getItem("enemy"))
            Ataques(selectedPj,enemy)
        })
    }
}
function selecPersonaje() {
    stage = 1
    imagen.src = "Imagenes/Mago.png"
    boton0.innerText = "MAGO"
    boton1.innerText = "GUERRERO"
    boton2.innerText = "NINJA"
    seleccionardiv.style.display = "grid"
    seleccionardiv.style.gridTemplateColumns = " repeat(3, 400px)"
    seleccionardiv.style.gridTemplateRows = "50 px"
    boton0.addEventListener('mouseover', (event) => {
        imagen.src = "Imagenes/Mago.png"
    })
    boton1.addEventListener('mouseover', (event) => {
        imagen.src = "Imagenes/Guerrero.png"
    })
    boton2.addEventListener('mouseover', (event) => {
        imagen.src = "Imagenes/Ninja.png"
    })
    boton0.addEventListener('click', (event) => {
        selectedPj = localStorage.setItem("selected", JSON.stringify(Mago))
        JSON.parse(localStorage.getItem("selected"))
        Lugares(selectedPj)
    })

    boton1.addEventListener('click', (event) => {
        selectedPj = localStorage.setItem("selected", JSON.stringify(Guerrero))
        Lugares(selectedPj)
    })
    boton2.addEventListener('click', (event) => {
        selectedPj = localStorage.setItem("selected", JSON.stringify(Ninja))
        Lugares(selectedPj)
    })
}
//Boton de reinicio
botonreiniciar.addEventListener('click', (event) => {
    localStorage.clear()
    location.reload()
})
//Boton de volver atras
botonregreso.addEventListener('click', (event) => {
    if (stage == 2) {
        stage = 1
        imagen.src = "Imagenes/Mago.png"
        boton0.innerText = "MAGO"
        boton1.innerText = "GUERRERO"
        boton2.innerText = "NINJA"
        seleccionardiv.style.visibility = "visible"
        seleccionardiv.style.display = "grid"
        seleccionardiv.style.gridTemplateColumns = " repeat(3, 400px)"
        seleccionardiv.style.gridTemplateRows = "50 px"
        seleccionardiv.classList.remove('hidden')
        divlugares.style.display = "none"
        divlugares.style.gridTemplateColumns = " repeat(3, 400px)"
        localStorage.clear()
    }
    else if (stage == 3) {

        Toastify({
            text: "Hey! Volver atras aca es lo mismo que huir...",
            duration: 4000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            offset: {
                x: 150, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            className: "info",
            style: { background: "linear-gradient(to right, #00b09b, #96c93d)", }
        }).showToast();
    }
    else if (stage == "T") {
        stage = 2
        imagen.src = "Imagenes/Lugares.png"
        botona.innerText = "Cueva"
        botonb.innerText = "Taberna"
        botonc.innerText = "Bosque"
        seleccionardiv.style.visibility = "hidden"
        divlugares.classList.remove('hidden')
        divlugares.style.visibility = "visible"
        divlugares.style.display = "grid"
        divlugares.style.gridTemplateColumns = " repeat(3, 400px)"
        taberna.style.display = "none"
        localStorage.removeItem("enemy")
    }
   else if (stage < 0) {
    stage = "T"
    imagen.src = "Imagenes/TavernaAll.png"
    parrafo.style.display = "none"
    parrafod.style.display = "none"
    comprar.style.display = "none"
    apostardiv.style.display = "none"
    gitanadiv.style.display = "none"
    taberna.style.visibility = "visible"
    taberna.classList.remove('hidden')
    botonQ.innerText = "Comprar"
    botonW.innerText = "Apostar"
    botonE.innerText = "Gitana"
    taberna.style.display = "grid"
    taberna.style.gridTemplateColumns = " repeat(3, 400px)"
    taberna.style.gridTemplateRows = "50 px"

    selectedPj = JSON.parse(localStorage.getItem("selected"))
   }
})


selecPersonaje()


import { Dice, Cubilete, GameDice, TableOfPoints } from './class.js';
const UIController = () => {
   return {
      desaparecerDados: () => {
         for (let i = 0; i < 5; i++) {
            document.getElementById(`dice-${i}`).style.display = 'none';
            document.getElementById(`check-${i}`).style.display = 'none';
         }
      },
      mostrarDado: (dice,position) => {
         let diceDOM = document.getElementById(`dice-${position}`);
         diceDOM.src = `img/dice-${dice}.png`;
         diceDOM.style.display = `block`;
         document.getElementById(`check-${position}`).style.display = `block`;
      },
      initTable: () => {
         const initTablaPuntajes = (nro) => {
            let tablaPuntajes = '';
            for (let i = 0; i < 6; i++) {
               tablaPuntajes += `<li class="rowtable" id="table${nro}-${i}">0${ i + 1 } ----------------- </li>`
            }
            tablaPuntajes += `<li class="rowtable" id="table${nro}-6">ESCALERA ------- </li>`
            + `<li class="rowtable" id="table${nro}-7">FULL --------------  </li>`
            + `<li class="rowtable" id="table${nro}-8">POQUER --------- </li>`
            + `<li class="rowtable" id="table${nro}-9">GENERALA ------ </li>`
            + `<li class="rowtable" id="table${nro}-10">GENERALAX2 --- </li>`
          
            return tablaPuntajes;
         }
         document.getElementById(`table-points-0`).innerHTML = initTablaPuntajes(0);
         document.getElementById(`table-points-1`).innerHTML = initTablaPuntajes(1);
        
      },
      displayNoneOptions: () => {
         let listOptions =  document.querySelectorAll('.options');
         for (let i = 0; i < listOptions.length; i++) { listOptions[i].style.display = 'none' }
      },
      displayOnOption: (activePlayer,i) => {
         document.getElementById(`p${activePlayer}-options-${i}`).style.display = 'block';
      },
      checkboxCheck: (onOrOff) => {
         for (let i = 0; i < 5; i++) { document.getElementById(`check-${i}`).checked = onOrOff }
      },
      restartPanels: () => {
         document.querySelector('.player-0-panel').classList.remove('active');
         document.querySelector('.player-1-panel').classList.remove('active');
         document.querySelector('.player-0-panel').classList.add('active');
      },
      togglePanels: () => {
         document.querySelector('.player-0-panel').classList.toggle('active');
         document.querySelector('.player-1-panel').classList.toggle('active');
      },
      displayButtons: (onOrOff) => {
         document.querySelector('.btn-roll').style.display = onOrOff;
         document.querySelector('.btn-hold').style.display = onOrOff;
      }
   }
}
const controller = () => {
   let cubi, table, gDices;
   const UICtrl = UIController();
   const init = () => {
      cubi.initCubilete(); gDices.initGameDices(); table.initTable();
       //Inicializar todos los objetos
       UICtrl.initTable(); UICtrl.desaparecerDados(); UICtrl.displayNoneOptions();
       //checkear dados
       UICtrl.checkboxCheck(true); UICtrl.displayButtons('block'); UICtrl.restartPanels();
   }
   const begin = () => {
      const initHTML = () =>{
         const initFlechas = (nro) => {
            let initFlechas = `<div class="player-name" id="name-${nro}">Player ${nro + 1} </div>`;
            for (let i = 0; i < 11; i++) {
               initFlechas += `<button class="options" id="p${nro}-options-${i}"><img class="flecha" src="img/flecha.png" alt=""></button>`
            }
            return initFlechas;
         }
         const initButCheImg = () => {
            let butCheImg = '';
            butCheImg += `<button class="btn-new"><i class="ion-ios-plus-outline"></i>New game</button>`
            + `<button class="btn-roll"><i class="ion-ios-loop"></i>Roll dice</button>`
            + `<button class="btn-hold"><i class="ion-ios-download-outline"></i>Hold</button>`
            + `<button class="btn-end"><i class="ion-ios-download-outline"></i>END</button>`
            for (let i = 0; i < 5; i++) {
               butCheImg += `<input type = "checkbox" id = "check-${i}" value = "on" name = "dados">`
               + `<img src = "img/dice-5.png" alt = "Dice" class="dice" id = "dice-${i}">`
            }
            return butCheImg;
         }
         document.getElementById('player-0-panel').innerHTML = initFlechas(0);
         document.getElementById('player-1-panel').innerHTML = initFlechas(1);
         document.getElementById('button-check-image').innerHTML = initButCheImg();
      }
      cubi = new Cubilete(); gDices = new GameDice(); table = new TableOfPoints();
      initHTML();  init();  setupEventListeners();
   }
   const nextPlayer = () => {
       if (!table.isFinish()) {
         cubi.initCubilete(); gDices.initGameDices();
         UICtrl.displayNoneOptions(); UICtrl.desaparecerDados();
         //checkeando dados
         UICtrl.checkboxCheck(true); UICtrl.togglePanels();
         UICtrl.displayButtons('block'); table.changeActivePlayer();
       }
       else { table.whoWin(); init()}
   }
   const endGame = () => { table.repair(0); table.repair(1); table.whoWin(); init() }
   let setupEventListeners = () => {
      document.querySelector('.btn-end').addEventListener('click', endGame);
      document.querySelector('.btn-hold').addEventListener('click', hold);//Boton Hold
      document.querySelector('.btn-new').addEventListener('click', init);//Boton New Game
      document.querySelector('.btn-roll').addEventListener('click', roll);//Boton Roll
      let options = document.querySelectorAll('.options');
      for (let j = 0; j < 22; j++) {
         options[j].addEventListener('click', () => {
            let t,i;
            if (j < 11) { i = j; t = 0;}
            else {i = j-11; t = 1;
            }
            switch (true) {
               case (i < 6):   table.setElement(i, gDices.getCant(i) * (i+1));break;
               case (i === 6):
                  if (gDices.esEscalera()) {cubi.esServido() ? table.setElement(i,25) :table.setElement(i,20)}
                  else {table.setElement(i,0)}break;
               case (i === 7):
                  if (gDices.esFull()) {cubi.esServido() ? table.setElement(i,35):table.setElement(i,30);}
                  else {table.setElement(i,0)}break;
               case (i === 8):
                  if (gDices.esPoquer()) {cubi.esServido() ? table.setElement(i,45):table.setElement(i,40)}
                  else {table.setElement(i,0);}break;
               case (i === 9):
                  if (gDices.esGenerala()) {table.setElement(i,50)}
                  else {table.setElement(i,0)}break;
               case (i === 10):
                  if (gDices.esGenerala() && table.getElement(9) === 50) {table.setElement(i,60)}
                  else {table.setElement(i,0)} break;
            }
            document.getElementById(`table${t}-${i}`).textContent += ` ${table.getElement(i)}`;
            nextPlayer();
         });
      }
   }

   const hold = () => {
      if(cubi.getTiro() > 0){//si hubo algun tiro
         gDices.convert(cubi);// crear arreglo de contadores
         if (cubi.esServido() && gDices.esGenerala()) {// si es generala servida
            alert(`el ganador es player ${table.getActivePlayer() + 1} por GENERALA SERVIDA`)
            init();
         }
         else {
            UICtrl.displayButtons('none');//saco el boton roll y hold
            for (let i = 0; i < 11; i++) {//muestro botones para elegir jugada
               if (table.estaVacio(i)) { UICtrl.displayOnOption(table.getActivePlayer(),i) }
            }
            table.contarJugada();
         }
      }
   }

   const roll = () => {//boton Roll
      let checkArray = [];
      for (var i = 0; i < cubi.getLength(); i++) {//array of booleans
          checkArray[i] = document.getElementById(`check-${i}`).checked;
      }
      if (checkArray.some((element) => {return element})) {// si hay alguna casilla tildada
         cubi.setServido(true);
         for (let i = 0; i < cubi.getLength(); i++) {
            if (checkArray[i]){
               cubi.rollDice(i); UICtrl.mostrarDado(cubi.getElement(i).getValue() , i);
            }
            else { cubi.setServido(false) }
         }
         cubi.contarTiro(); UICtrl.checkboxCheck(false);
      }
      if (cubi.esUltimoTiro()) { hold()}
   }

   return {iniciar: () => begin()}
}
controller().iniciar();

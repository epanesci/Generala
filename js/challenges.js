
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
            tablaPuntajes += `<li class="rowtable" id="table${nro}-7">FULL --------------  </li>`
            tablaPuntajes += `<li class="rowtable" id="table${nro}-8">POQUER --------- </li>`
            tablaPuntajes += `<li class="rowtable" id="table${nro}-9">GENERALA ------ </li>`
            tablaPuntajes += `<li class="rowtable" id="table${nro}-10">GENERALAX2 --- </li>`
          
            return tablaPuntajes;
         }
         
         
         document.getElementById(`table-points-0`).innerHTML = initTablaPuntajes(0);
         document.getElementById(`table-points-1`).innerHTML = initTablaPuntajes(1);
        
      },
      displayNoneOptions: () => {
         let listOptions =  document.querySelectorAll('.options');
         for (let i = 0; i < listOptions.length; i++) {
            listOptions[i].style.display = 'none';
         }
      },
      displayOnOption: (activePlayer,i) => {
         document.getElementById(`p${activePlayer}-options-${i}`).style.display = 'block';
      },
      checkboxCheck: (onOrOff) => {
         for (let i = 0; i < 5; i++) {
            document.getElementById(`check-${i}`).checked = onOrOff;
         }
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
      },
   }
}
const controller = () => {
   let cubi, table, gDices;
   const UICtrl = UIController();
   class Dice {
      constructor (){
            this.value = 0;
      }
      initDice() {
         this.value = 0;
      }
      tirarDado(){
         this.value = Math.floor(Math.random() * 6) + 1;
      }
      getValue(){
         return this.value;
      }
   }
   class Cubilete {
      constructor (){
         this.dices = [];
         for (let i = 0; i < 5; i++) {
            this.dices.push(new Dice());
         }
         this.initCubilete();
      }
      initCubilete(){
         for (let i = 0; i < this.dices.length; i++) {
            this.dices[i].initDice();
         }
         this.tiro = 0;
         this.servido = true;
      }
      rollDice(i) {
               this.dices[i].tirarDado();
      }
      esServido() {
         return this.servido;
      }
      esUltimoTiro(){
         return this.tiro === 3;
      }
      getElement(i){
         return this.dices[i];
      }
      setServido(bool){
         this.servido = bool;
      }
      contarTiro(){
         this.tiro++;
      }
      getTiro(){
         return this.tiro;
      }
      getLength(){
         return this.dices.length;
      }
   }
   class GameDice {
      constructor() {
         this.cant = [0,0,0,0,0,0];
      }
      initGameDices(){
         for (let i = 0; i < this.cant.length; i++) {
            this.cant[i] = 0;
         }
      }
      esGenerala() {
         return this.hayNro(5)
      }
      esPoquer() {
         return this.hayNro(4)
      }
      esFull() {
         return this.hayNro(3) && this.hayNro(2)
      }
      esEscalera() {
        let condition1 = this.cant[2] === 1 && this.cant[3] === 1 && this.cant[4] === 1 ; //3, 4 y 5 son obligatorios
        return condition1 && !this.hayNro(2); // tiene q faltar solo el 1 o solo el 2 o solo el 6
      }
      hayNro(nro) {//privada
        let hayn = false;
        for (let i = 0; i < this.cant.length; i++) {
           if (this.cant[i] === nro) {hayn = true}
        }
        return hayn;
      }
      getCant(i) {
         return this.cant[i];
      }
      convert(cubilete){
         for (let i = 0; i < cubilete.getLength(); i++) {
            this.cant[cubilete.getElement(i).getValue()-1] ++;
         }
      }
   }
   class TableOfPoints  {
      constructor(){
         this.initTable();
      }
      initTable(){
         this.table = [['','','','','','','','','','',''],['','','','','','','','','','','']]
         this.activePlayer = 0;
         this.cantJugadas = 0;
      }
      contarJugada() {
         this.cantJugadas++;
      }
      isFinish(){
         return this.cantJugadas === 22;
      }
      totalTable(player){
         return this.table[player].reduce((a,b) => {return a+b});
      }
      whoWin () {
         let x1 = this.totalTable(0);
         let x2 = this.totalTable(1);
         if (x1 > x2) {alert(`el ganador es player 1 con puntos: ${x1}`)}
         else if (x1 < x2) {alert(`el ganador es player 2 con puntos: ${x2}`)}
         else {alert(`los jugadores empataron con puntos: ${x1}`)}
      }
      changeActivePlayer(){
         this.activePlayer === 0 ? this.activePlayer = 1 : this.activePlayer = 0;
      }
      getActivePlayer(){
         return this.activePlayer;
      }
      getElement(i){
         return this.table[this.activePlayer][i];
      }
      setElement(i,element){
         this.table[this.activePlayer][i] = element;
      }
      estaVacio(i){
         return this.table[this.activePlayer][i] === '';
      }
   }

   const init = () => {
      cubi.initCubilete();
      gDices.initGameDices();
      table.initTable();
       //Inicializar todos los objetos
       UICtrl.initTable();
       UICtrl.desaparecerDados();
       UICtrl.displayNoneOptions();
       //checkear dados
       UICtrl.checkboxCheck(true);
       UICtrl.displayButtons('block');
       UICtrl.restartPanels();
   }
   const begin = () => {
      cubi = new Cubilete();
      gDices = new GameDice();
      table = new TableOfPoints();
      init();
      setupEventListeners();
      
   }
   const nextPlayer = () => {
       //Next player
       if (!table.isFinish()) {
         cubi.initCubilete();
         gDices.initGameDices();
         UICtrl.displayNoneOptions();
         UICtrl.desaparecerDados();
         //checkeando dados
         UICtrl.checkboxCheck(true);
         UICtrl.togglePanels();
         UICtrl.displayButtons('block');
         table.changeActivePlayer();
       }
       else {
         table.whoWin();
         init();
      }
   }

   let setupEventListeners = () => {
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
            for (let i = 0; i < 11; i++) {
               if (table.estaVacio(i)) {
                  UICtrl.displayOnOption(table.getActivePlayer(),i);//muestro botones para elegir jugada
               }
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
               cubi.rollDice(i);
               UICtrl.mostrarDado(cubi.getElement(i).getValue() , i);
            }
            else {
               cubi.setServido(false);
            }
         }
         cubi.contarTiro();
         UICtrl.checkboxCheck(false);
      }
      if (cubi.esUltimoTiro()) {
         hold();
      }
   }

   return {iniciar: () => begin()}
}
controller().iniciar();

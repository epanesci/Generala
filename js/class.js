export class Dice {
   constructor() { this.value = 0 }
   initDice() { this.value = 0 }
   tirarDado() { this.value = Math.floor(Math.random() * 6) + 1 }
   getValue() { return this.value }
}
export class Cubilete {
   constructor() {
      this.dices = [];
      for (let i = 0; i < 5; i++) { this.dices.push(new Dice()) }
      this.initCubilete();
   }
   initCubilete() {
      for (let i = 0; i < this.dices.length; i++) { this.dices[i].initDice() }
      this.tiro = 0; this.servido = true;
   }
   rollDice(i) { this.dices[i].tirarDado() }
   esServido() { return this.servido }
   esUltimoTiro() { return this.tiro === 3 }
   getElement(i) { return this.dices[i]}
   setServido(bool) { this.servido = bool }
   contarTiro() { this.tiro++ }
   getTiro() { return this.tiro }
   getLength() { return this.dices.length }
}
export class GameDice {
   constructor() {
      this.cant = [0, 0, 0, 0, 0, 0];
   }
   initGameDices() {
      for (let i = 0; i < this.cant.length; i++) { this.cant[i] = 0 }
   }
   esGenerala() { return this.hayNro(5) }
   esPoquer() { return this.hayNro(4) }
   esFull() { return this.hayNro(3) && this.hayNro(2) }
   esEscalera() {
      let condition1 = this.cant[2] === 1 && this.cant[3] === 1 && this.cant[4] === 1; //3, 4 y 5 son obligatorios
      return condition1 && !this.hayNro(2); // tiene q faltar solo el 1 o solo el 2 o solo el 6
   }
   hayNro(nro) {//privada
      let hayn = false;
      for (let i = 0; i < this.cant.length; i++) { if (this.cant[i] === nro) {hayn = true}}
      return hayn;
   }
   getCant(i) { return this.cant[i] }
   convert(cubilete) {//almacena cuanto dados hay de cada valor
      for (let i = 0; i < cubilete.getLength(); i++) {
         this.cant[cubilete.getElement(i).getValue() - 1]++;
      }
   }
}
export class TableOfPoints {
   constructor() { this.initTable() }
   initTable() {
      this.table = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ]]
      this.activePlayer = 0; this.cantJugadas = 0;
   }
   contarJugada() { this.cantJugadas++ }
   isFinish() { return this.cantJugadas === 22 }
   totalTable(player) { return this.table[player].reduce((a, b) => { 
   
      return a + b;
   
   })}
   whoWin() {
      let x1 = this.totalTable(0); let x2 = this.totalTable(1);
      if (x1 > x2) { alert(`el ganador es player 1 con puntos: ${x1}`) }
      else if (x1 < x2) { alert(`el ganador es player 2 con puntos: ${x2}`) }
      else { alert(`los jugadores empataron con puntos: ${x1}`) }
   }
   changeActivePlayer() { (this.activePlayer === 0) ? this.activePlayer = 1 : this.activePlayer = 0 }
   getActivePlayer() { return this.activePlayer }
   getElement(i) { return this.table[this.activePlayer][i] }
   setElement(i, element) { this.table[this.activePlayer][i] = element }
   estaVacio(i) { return this.table[this.activePlayer][i] === 0 }
}
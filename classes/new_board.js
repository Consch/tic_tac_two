class Board {
    constructor(state = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]) {
       this.state = state
    }

    printFormattedBoard() {
        let formattedString = "";
        this.state.forEach((cell, index) => {
            formattedString += cell ? ` ${cell} |` : "   |";
            if((index + 1) % 6 === 0)  {
                formattedString = formattedString.slice(0,-1);
                if(index < 17) formattedString += '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015 \n';
            }
        });
        console.log("%c" + formattedString, "color: #c11dd4;font-size:16px");
    }  

  //Überprüft, ob Feld noch keine Zeichen hat
  isEmpty() {
    return this.state.every(cell => !cell);
    }
    //Überprüft, ob keine Plätze vorhanden sind --> Feld voll ist
    isFull() {
        return this.state.every(cell => cell);
    }
    insert(symbol, position) {
        if(![0,1,2,3,4,5,6,7,8].includes(position)) {
            throw new Error('Cell index does not exist!')
        }
        if(!['x','o'].includes(symbol)) {
            throw new Error('The symbol can only be x or o!')
        }
        if(this.state[position]) {
            return false;
        }
        this.state[position] = symbol;
        return true;
    }
    getAvailableMoves() {
        const moves = [];
        this.state.forEach((cell, index) => {
            if(!cell) moves.push(index);
        });
        return moves;
    }
    isTerminal() {
        //False fals Spielfeld lehr
        if(this.isEmpty()) return false;
        //Nach Horizontalem Gewinn suchen
        if(this.state[0] === this.state[1] && this.state[0] === this.state[2] && this.state[0]) {
            return {"winner": this.state[0], "direction": "Horizontal", "row": 1};
        }
        if(this.state[3] === this.state[4] && this.state[3] === this.state[5] && this.state[3]) {
            return {"winner": this.state[3], "direction": "Horizontal", "row": 2};
        }
        if(this.state[6] === this.state[7] && this.state[6] === this.state[8] && this.state[6]) {
            return {"winner": this.state[6], "direction": "Horizontal", "row": 3};
        }

        //Nach Vertikalem gewinn suchen
        if(this.state[0] === this.state[3] && this.state[0] === this.state[6] && this.state[0]) {
            return {"winner": this.state[0], "direction": "Vertical", "column": 1};
        }
        if(this.state[1] === this.state[4] && this.state[1] === this.state[7] && this.state[1]) {
            return {"winner": this.state[1], "direction": "Vertical", "column": 2};
        }
        if(this.state[2] === this.state[5] && this.state[2] === this.state[8] && this.state[2]) {
            return {"winner": this.state[2], "direction": "Vertical", "column": 3};
        }

        //Nach Diagonalem gewinn suchen
        if(this.state[0] === this.state[4] && this.state[0] === this.state[8] && this.state[0]) {
            return {"winner": this.state[0], "direction": 'D', "diagonal": "main"};
        }
        if(this.state[2] === this.state[4] && this.state[2] === this.state[6] && this.state[2]) {
            return {"winner": this.state[2], "direction": "D", "diagonal": "counter"};
        }

        //Wenn das Feld voll ist, es aber keinen gewinner gibt
        if(this.isFull()) {
            return {"winner": "draw"};
        }

        return false;
    }
}
export default Board;
const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let userPlaying = true;

class Field {
    constructor(field) {
        this._field = field;
        this.y = 0;
        this.x = 0;
    }

    get field() {
        return this._field;
    }

    print() {
        return this.field.map(row =>
            row.join('')
        ).join('\n');
    }

    ask() {
        let move = prompt('Which way? (u = Up, d = down, l = left, r = right)');
        switch(move.toLowerCase()) {
            case 'u':
                console.log('Moving up');
                this.y -= 1;
                break;
            case 'd':
                console.log('Moving down');
                this.y += 1;
                break;
            case 'l':
                console.log('Moving left');
                this.x -= 1;
                break;
            case 'r':
                console.log('Moving right');
                this.x += 1;
                break;
            default:
                break;
        }    
    }

    win() {
        
        if (this.field[this.y] == undefined) {
            console.log('You lose. Do not give up! Please try again!');
            return userPlaying = false;            
        }
        
        switch (this.field[this.y][this.x]) {
            case hole:
                console.log('You lose. Do not give up! Please try again!');
                userPlaying = false;
                break;
            case undefined:
                console.log('You lose. Do not give up! Please try again!');
                userPlaying = false;
                break;
            case hat:
                console.log('WOWWWW...You win! You found the hat!');
                userPlaying = false;
                break;
            case fieldCharacter:
                console.log('Please keep looking for the hat...');
                this.field[this.y][this.x] = pathCharacter;
                break;
            case pathCharacter:
                console.log('Ohhh...you are stepping on *');
                break;
        }    
    }

    static generateField(height, width, percentage) {

        
        const fieldOrHole = (percentage) => {
            if (percentage >= 0 && percentage <= 100) {
              const ranNum = Math.random() * 100;
              if (ranNum < percentage) {
                return hole;
              } else {
                return fieldCharacter;
              }
            } else {
              console.log('Could you please enter a number between 0 - 100? Thank you!');
            }
        }

        
        const plainArea = () => {
            function userMoveW() {
                let moveW = [];
                for (let i=0; i < width; i++) {
                    moveW.push(fieldOrHole(percentage));
                }
                return moveW;
            }
            let plainArea = [];
            for (let i=0; i < height; i++) {
                plainArea.push(userMoveW());
            }
            return plainArea;
        }

        const gameReadyField = plainArea();

        
        do {
            gameReadyField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
        }   while (gameReadyField[0][0] == hat);
        
        
        gameReadyField[0][0] = pathCharacter;

        return gameReadyField;
    }

}

let width = prompt('WIDTH: ')
let height = prompt('HEIGHT: ')
let percentage = prompt('PERCENTAGE OF HOLE: ')
const myField = new Field(Field.generateField(width, height, percentage));

function game() {
    while(userPlaying) {
        console.log(myField.print());
        myField.ask();
        myField.win();
    }
    console.log('Game Over');
}

game();
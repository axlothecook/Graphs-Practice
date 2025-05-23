class Node {
    constructor(current, next = null, previous = null) {
        this.current = current;
        this.next = next;
        this.previous = previous;
    };
};

class LinkedList {
    constructor(head = null, tail = null){
        this.head = head;
        this.tail = tail;
    }

    push(value) {
        const node = new Node(value);

        if(!this.head) {
            this.head = node;
        } else if(!this.tail) {
            this.tail = node;
            this.head.next = this.tail;
            this.tail.previous = this.head;
        } else if(this.tail) {
            var formerTail = this.tail;
            formerTail.previous = this.tail.previous;
            this.tail = node;
            this.tail.previous = formerTail;
            formerTail.next = this.tail;
        };
    };
};


const Board = (function(){
    let queue = [];
    let previousCoordArr = [];
    let visitedCoordArr = [];
    let flag = false;
    // let prev = [];

    const levelOrderIteration = {
        xx : 0, yy: 0,
        arrOfMoves: [
            {
                x: [-1, -1],
                y: [2, -2]
            },
            {
                x: [1, 1],
                y: [2, -2]
            },
            {
                x: [-2, -2],
                y: [1, -1]
            },
            {
                x: [2, 2],
                y: [1, -1]
            }
        ],

        parser(startingCoord, goalCoords){
            queue.push(startingCoord);
            if(queue.length === 0 || flag) return previousCoordArr;
            visitedCoordArr.push(startingCoord);
            let linkedList = new LinkedList(startingCoord);

            console.log('startingCoord:');
            console.log(startingCoord);

            this.arrOfMoves.forEach(obj => {
                for(let i = 0; i < 2; i++) {
                    this.xx = queue[0][0] + obj.x[i];
                    this.yy = queue[0][1] + obj.y[i];
                    if(this.xx < 0 || this.yy < 0) {
                        continue;
                    } else if(this.xx >= 8 || this.yy >= 8) {
                        continue;
                    } else {
                        console.log([this.xx, this.yy]);
                        // for when we've reached the desired coordinate
                        if(this.xx === goalCoords[0] && this.yy === goalCoords[1]) {
                            flag = true;
                            console.log('flag: ' + flag);
                        };
                        // checks if node was visited or not
                        let marker = false;
                        visitedCoordArr.forEach(coord => {
                            if(coord[0] === this.xx && coord[1] === this.yy) marker = true;
                        });

                        // adds unvisited node to queue
                        if(!marker) {
                            if(!flag) queue.push([this.xx, this.yy]);
                            // linkedList.push([this.xx, this.yy]);
                        };
                    };
                };
            });

            previousCoordArr.push(linkedList);
            queue = queue.slice(1);
            return this.parser(queue[0], goalCoords);
            // prev.push(this.parser(queue[0], goalCoords));
            // console.log('prev:');
            // console.log(prev);
        },

        // findShortestPath(start, end, prevArr) {

        // }
    };

    const knightMoves = (startingCoord, goalCoords) => {
        let prevCoordsArray = levelOrderIteration.parser(startingCoord, goalCoords);
        // let arr = levelOrderIteration.findShortestPath(startingCoord, goalCoords, prevCoordsArray);

        console.log(`array of steps taken from [${startingCoord}] to [${goalCoords}]:`);
        console.log(prevCoordsArray);
        console.log('storing arr:');
        console.log(previousCoordArr);
        // arr.forEach(coord => {
        //     if (coord === arr[arr.length - 1]) {
        //         console.log(`[${coord}] `);
        //     } else console.log(`[${coord}] -> `);
        // });
    };

    return {
        knightMoves,
        // displayBoardPremium
    }

})();

// Board.knightMoves([0, 0], [3, 3]);
// Board.knightMoves([0, 0], [1, 2]);
Board.knightMoves([3, 3], [0, 0]);
// Board.knightMoves([0, 0], [7, 7]);
// Board.knightMoves([3, 3], [4, 3]);
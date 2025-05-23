class Node {
    constructor(value, left = null, right = null, top = null, bottom = null){
        this.value = value;
        this.left = left
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.visited = null;
    };
};

class LinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
    }
}

const Board = (function(){
    var queue = [];
    var globalArr = [];
    var visualized = {};
    
    const createBoard = () => {
        for(let i = 0; i <= 7; i++) {
            let iList = new LinkedList();
            let tempArr = [];
            for(let j = 0; j <= 7; j++) {
                const node = new Node([i, j]);
                push(node, iList);
                // if(j === 0) {
                //     prepend(node, iList);
                // } else append(node, iList);
                tempArr.push(`[${node.value}]`);
            };
            globalArr.push(iList);
            visualized[`${i}`] = tempArr;
        };
        connectAllNodes();
    };

    // append node at the end of the list
    const push = (node, list) => {
        if(!list.head) {
            list.head = node;
        } else if(list.tail) {
            var formerTail = list.tail;
            formerTail.left = list.tail.left;
            list.tail = node;
            list.tail.left = formerTail;
            formerTail.right = list.tail;
        } else {
            list.tail = node;
            list.head.right = list.tail;
            list.tail.left = list.head;
        };
    };

    const connectAllNodes = () => {
        for(let i = 0; i < 8; i++) {
            if(i === 0) {
                // console.log('first list');
                // console.log(globalArr[i].head.value);
                var current0 = globalArr[i].head;
                var current1 = globalArr[1].head;
                var counter = 0;
                while(counter !== 8){
                    current0.bottom = current1;
                    current0 = current0.right;
                    current1 = current1.right;
                    counter++;
                };            
            } else if(i === 7) {
                // console.log('last list');
                // console.log(globalArr[i].head.value);
                var current0 = globalArr[i].head;
                var current1 = globalArr[6].head;
                var counter = 0;
                while(counter !== 8){
                    current0.top = current1;
                    current0 = current0.right;
                    current1 = current1.right;
                    counter++;
                };
            } else {
                // for 2 - 6 lists
                // console.log('list in between:');
                // console.log(globalArr[i].head.value);
                var current = globalArr[i].head;
                var getBottom = globalArr[i - 1].head;
                var getTop = globalArr[i + 1].head;
                var counter = 0;
                while(counter !== 8){
                    current.top = getTop;
                    current.bottom = getBottom;
                    current = current.right;
                    getTop = getTop.right;
                    getBottom = getBottom.right;
                    counter++;
                };
            };
        };
    };

    const search = (coord) => {
        let tempNode;
        globalArr.forEach(list => {
            var search = list.head;
            while(search && (search.value[0] !== coord[0] || search.value[1] !== coord[1])) {
                search = search.right;
            };
            if(search && search.value[0] === coord[0] && search.value[1] === coord[1]) tempNode = search;
        });

        if(!tempNode) return null;
        console.log('found the node:');
        console.log(tempNode);
        console.log(tempNode.value);
        return tempNode;
    };

    const displayBoard = () => {
        console.log('board:');
        console.log(globalArr);
        console.log(visualized);
        // console.log('hellow:');
        // console.log(globalArr[0].head.right)
    }

    // const displayBoardPremium = (node = globalArr[0].head, prefix = "", isBottom = true, isRight = true, isLeft = true) => {
    //     // if (!node) return;
    //     if (node === null) return;
    //     // if (node.top !== null) {}
    //     // if (node.left !== null) {}
    //     // if (node.right !== null) {}
    //     // if (node.bottom !== null) {}
    //     if (node.top !== null) {
    //         displayBoardPremium(node.top, `${prefix}${isBottom ? "│   " : "    "}`, false, false, false);
    //     } else {
    //         console.log(`${node.value}`);
    //     };

    //     // console.log('right:');
    //     // console.log(node.right.value);
    //     // console.log(`${prefix}${isBottom ? " | " : " "} \n${node.bottom.value}`);
    //     // console.log(`${prefix}${isRight ? "── " : " "}${node.right}`);
    //     // console.log(node.right.value)
    //     // console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.left.value}`);

    //     if (node.right !== null) {
    //         console.log(`${prefix}${isRight ? "── " : " "}${node.right.value}`);
    //         displayBoardPremium(node.right, `${prefix}${isLeft ? " " : "    "}`, true);
    //     };

    //     // console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    //     // if (node.left !== null) {
    //     //     prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    //     // };
    // }

    const checkCoord = (coord) => {
        if(coord[0] >= 0 && coord[1] >= 0) return true;
        if(coord[0] <= 7 && coord[1] <= 7) return true;
        return false;
    };

    const levelOrderIteration = {
        queue: [],
        printArr: [],

        // checker(value){
        //     let tempTop = search([this.queue[0].value[0] - 2, this.queue[0].value[1]]);
        //     let tempRight = search([this.queue[0].value[0], this.queue[0].value[1] + 2]);
        //     let tempLeft = search([this.queue[0].value[0], this.queue[0].value[1] - 2]);
        //     let tempBottom = search([this.queue[0].value[0] + 2, this.queue[0].value[1]]);
        //     if()

        // },

        parser(coord){
            this.queue.push(coord);
            coord.visited = true;
            if(this.queue.length === 0 || (this.queue[0][0] === 3 && this.queue[0][1] === 3)) {
                this.displayLevelOrder(this.printArr);
                return queue = [null];
            };
            if(!coord) return null;

            if(this.queue[0].top) {
                let tempTop = search([this.queue[0].value[0] - 2, this.queue[0].value[1]]);
                console.log('top:');
                console.log(tempTop);
                if (tempTop) {
                    // x + 2 exists
                    if (this.queue[0].right) {
                        let tempRight = search([this.queue[0].value[0], this.queue[0].value[1] + 2]);
                        if(tempRight) {
                            // both top + 2 and right + 2 exist
                            this.parser([this.queue[0].value[0] - 1, this.queue[0].value[1] + 2]); // x - 1, y + 2;
                        };
                        this.noter(this.queue[0].value);
                        this.queue = this.queue.slice(1);

                        this.parser([this.queue[0].value[0] - 2, this.queue[0].value[1] + 1]); // x - 2, y + 1

                        this.noter(this.queue[0].value);
                        this.queue = this.queue.slice(1);
                    };
                    //no right, only top
                    if (this.queue[0].left) {
                        let tempLeft = search([this.queue[0].value[0], this.queue[0].value[1] - 2]);
                        if(tempLeft) {
                            // both top + 2 and left + 2 exist
                            this.parser([this.queue[0].value[0] - 1, this.queue[0].value[1] + 2]); // x - 1, y + 2;
                        };
                        this.noter(this.queue[0].value);
                        this.queue = this.queue.slice(1);

                        this.parser([this.queue[0].value[0] - 2, this.queue[0].value[1] + 1]); // x - 2, y + 1

                        this.noter(this.queue[0].value);
                        this.queue = this.queue.slice(1);
                    };
                };
            }; 
            // x is row, y is column
            // [x - 1, y + 2]
            // [x - 1, y - 2]
            // [x + 1, y + 2]
            // [x + 1, y - 2]

            // [x - 2, y + 1]
            // [x - 2, y - 1]
            // [x + 2, y + 1]
            // [x + 2, y - 1]

            // dx = [-1, -2, +1, +2]
            // dy = [+2, +1, +2, +1] 
            let arr = [
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
            ];
            // OR
            // const xAxisCoord = [-1, -1, 1, 1, -2, -2, 2, 2];
            // const yAxisCoord = [2, -2, 2, -2, 1, -1, 1, -1];

            if(this.queue[0].bottom) {
                let tempBottom = search([this.queue[0].value[0] + 2, this.queue[0].value[1]]);
                console.log('bottom:');
                console.log(tempBottom);
                if (tempBottom) {
                    // x + 2 exists
                    if (this.queue[0].right) {
                        let tempRight = search([this.queue[0].value[0], this.queue[0].value[1] + 2]);
                        if(tempRight) {
                            // both bottom + 2 and right + 2 exist
                            this.parser([this.queue[0].value[0] + 1, this.queue[0].value[1] + 2]); // x + 1, y + 2;
                        };
                        this.noter(this.queue[0].value);
                        this.queue = this.queue.slice(1);

                        this.parser([this.queue[0].value[0] + 2, this.queue[0].value[1] + 1]); // x + 2, y + 1

                        this.noter(this.queue[0].value);
                        this.queue = this.queue.slice(1);
                    };
                    //no right, only top
                    if (this.queue[0].left) {
                        let tempLeft = search([this.queue[0].value[0] - 2, this.queue[0].value[1]]);
                        if(tempLeft) {
                            // both bottom + 2 and left + 2 exist
                            this.parser([this.queue[0].value[0] + 1, this.queue[0].value[1] - 2]); // x + 1, y - 2;
                        };
                        this.noter(this.queue[0].value);
                        this.queue = this.queue.slice(1);
                        
                        this.parser([this.queue[0].value[0] + 2, this.queue[0].value[1] - 1]); // x + 2, y - 1
                    };
                };
            };

            this.noter(this.queue[0].value);
            this.queue = this.queue.slice(1);
        },

        noter(value) {
            this.printArr.push(value);
        },

        displayLevelOrder(arr) {
            console.log('level order done with iteration:');
            console.log(arr);
        }
    };

    const knightMoves = (startingCoord, goalCoords) => {
        if(!checkCoord(startingCoord) || !checkCoord(goalCoords)) throw new Error('Coordinates below 0 not allowed');
        let temp = search(startingCoord);
        if(!temp) {
            throw new Error('Search failed');
        } else levelOrderIteration.parser(temp);
        let x, y;
        x += 1;
        x += 2;
        x -= 1;
        x -= 2;

        y += 1;
        y += 2;
        y -= 1;
        y -= 2;

     

        
    };

    return {
        createBoard,
        search,
        knightMoves,
        displayBoard,
        levelOrderIteration
        // displayBoardPremium
    }

})();

Board.createBoard();
Board.displayBoard();
// Board.displayBoardPremium();
// Board.search([0, 0]);
// Board.search([1, 1]);
// Board.search([2, 3]);

Board.knightMoves([3, 0], [3, 3]);
// console.log(Board.knightMoves([0, 0], [3, 3]));
// Board.knightMoves([0, 0], [1, 2]);
// Board.knightMoves([3, 3], [0, 0]);
// Board.knightMoves([0, 0], [7, 7]);


//------------------------------
parser(startingCoord, goalCoords){
            let queue = [startingCoord];
            let previousCoordArr = [startingCoord];
            let visitedCoordArr = [startingCoord];
            let flag = false;
            let object = {
                parent,
                children: []
            };

            console.log('first queue');
            console.log(queue);

            while(queue.length !== 0 && !flag) {
                // console.log('in');
                this.arrOfMoves.forEach(obj => {
                    for(let i = 0; i < 2; i++) {
                        // console.log('in2');
                        this.xx = queue[0][0] + obj.x[i];
                        this.yy = queue[0][1] + obj.y[i];
                        if(this.xx < 0 || this.yy < 0) {
                            continue;
                        } else if(this.xx >= 8 || this.yy >= 8) {
                            continue;
                        } else {
                            if(this.xx === goalCoords[0] && this.yy === goalCoords[1]) {
                                flag = true;
                                previousCoordArr.push([this.xx, this.yy]);
                            };
                            let marker = false;
                            visitedCoordArr.forEach(coord => {
                                if(coord[0] === this.xx && coord[1] === this.yy) marker = true;
                            });
                            if(!marker && !flag) {
                                queue.push([this.xx, this.yy]);
                                if(queue[0] !== previousCoordArr[previousCoordArr.length - 1]) previousCoordArr.push(queue[0]);
                            };
                        };
                    };
                });
                queue = queue.slice(1);
            };
            console.log('previous queue:');
            console.log(previousCoordArr);
            return previousCoordArr;
        },

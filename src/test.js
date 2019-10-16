
    const canvas = document.getElementById("canvas-id");
    const ctx = canvas.getContext("2d");

    const GAME_SCREEN = [1080, 720];
    const ENTITY_COUNT = 4;
    const ENTITY_SENSE_RADIUS = 35;
    const SENSOR_TRIGGERS = [
        "UPPER_COLUMN",
        "LOWER_COLUMN",
        "TOP",
        "BOTTOM",
    ];

    const wallBuffer = 75;
    const wallWidth = 20;

    const bricks = [];
    let entities = [];
    let roundEntities = [];

    const getFinishBoxDistance = (entity) => {
        return Math.sqrt(Math.pow((finishBox.center.x - entity.x), 2) + Math.pow((finishBox.center.y - entity.y), 2));
    };
    
    const updateEntityBehavior = (entity) => {
        if (entity.isDead || entity.goalReached) return 0;

        const getEntityElevationMagnitude = (entity) => {
            switch (entity.triggerType) {
                case "UPPER_COLUMN":
                    return entity.genes[0];
                case "LOWER_COLUMN":
                    return entity.genes[1];
                case "TOP":
                    return entity.genes[2];
                case "BOTTOM":
                    return entity.genes[3];
                default:
                    return entity.genes[4];
            };
        };
        return getEntityElevationMagnitude(entity);
    };


    const createHoldingBox = (height, width, x, y, color = "rgba(0, 0, 255, 0.5)") => {
        const center = {
            x: (x + (width / 2)), 
            y: (y + (height / 2))
        };
        return  {
            height: height,
            width: width,
            x: x,
            y: y,
            strokeStyle: color,
            center: center,
        };
    };

    const createEntity = (startX ,startY, speed = 3) => {
        const createGenes = (dnaLength = 5, maxValues = 200) => {
            newGenes = []
            for (let i = 0; i < dnaLength; i++) {
                newGenes[i] = getRandomInt(-maxValues, maxValues);
            };
            return newGenes;
        };

        const newEntity =  {
            radius: 10,
            x: startX,
            y: startY,
            dx: speed,
            dy: -speed,
            color: "#000000",
            isDead: false,
            goalReached: false,
            stats: { timeAlive: 0.0, finishBoxDist: 0 },
            triggerType: undefined,
            genes: createGenes(5, 200)
        };
        newEntity.stats.finishBoxDist = getFinishBoxDistance(newEntity);
        return newEntity;
    };

    const setupEntities = (amount = 1, startBox) => {
        let ix = 0;
        const randomBoxPos = (startBox) => {
            const padding = 5;
            return [getRandomInt(startBox.x + padding, startBox.width - padding),
             getRandomInt(startBox.y + padding, startBox.height - padding)]
        } 
        for (let i = 0; i < amount; i++) {
            let xyPos = randomBoxPos(startBox);
            entities[i] = createEntity(xyPos[0] ,xyPos[1], getRandomInt(2,5)); 
        };
        roundEntities = entities;
    };


    const createColumn = (x, width) => {
        let height = getRandomInt(50, GAME_SCREEN[1] * 0.8);

        const newColumn = {
            x: x,
            y: 0,
            height: height,
            width: width,
            triggerType: "",
        };
        if (Math.random() >= 0.5) {
            newColumn.y = 0;
            newColumn.triggerType = SENSOR_TRIGGERS[0];
        } else {
            newColumn.y = GAME_SCREEN[1] - height;
            newColumn.triggerType = SENSOR_TRIGGERS[1];            
        };
        return newColumn;
    };

    const setupColumns = (startPosX = 125) => {
        const randomColumnBuffer = () => {
            return getRandomInt(40, 80)
        }
        const wallStartPos = (length) => {
            if (Math.random() >= 0.5) { return 0 }
            return GAME_SCREEN[1] - length
        }    

        let currentPosX = startPosX;
        let ix = 0;

        while (currentPosX < GAME_SCREEN[0] * 0.85) {
            // let length = getRandomInt(50, GAME_SCREEN[1] * 0.8);
            // bricks[ix] = { 
            //     height: length,
            //     x: currentPosX,
            //     y: wallStartPos(length)
            // }
            bricks[ix] = createColumn(currentPosX, wallWidth);

            ix += 1;
            currentPosX += wallWidth + randomColumnBuffer();
        }
    }
            
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const generateSingleWall = (wallBuffer) => {
        const wallStartPos = (length) => {
            if (Math.random() >= 0.5){ return 0}
            return GAME_SCREEN[1] - length
        }        
        const length = getRandomInt(50, GAME_SCREEN[1] * 0.8);
        ctx.beginPath();
        ctx.rect(wallBuffer, wallStartPos(length), wallWidth, length);
        ctx.fillStyle = "#FFFFF";
        ctx.fill();
        ctx.closePath();
    }

    const generateBrokenWall = (wallBuffer) => {
        const gap = getRandomInt(55, 95);
        const topLength = getRandomInt(50, GAME_SCREEN[1]*0.6);
        ctx.beginPath();
        ctx.rect(wallBuffer, 0, wallWidth, topLength);
        ctx.rect(wallBuffer, topLength + gap, wallWidth, GAME_SCREEN[1] - (topLength + gap));
        ctx.fillStyle = "#FFFFF";
        ctx.fill();
        ctx.closePath();
    }

    const generateColumns = (startPos = 125) => {
         const randomColumnBuffer = () => {
            return getRandomInt(40, 80)
        }
        const generateRandomColumn = (currentColumnPos) => {
            if (Math.random() >= 0.5) { 
                generateSingleWall(currentColumnPos) 
            }else { generateBrokenWall(currentColumnPos)}
        }

        let currentColumnPos = startPos;
        while(currentColumnPos < GAME_SCREEN[0]*0.85){
            generateRandomColumn(currentColumnPos);
            currentColumnPos += randomColumnBuffer();
        }
    }

    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 5;
    let dy = -5;
    const ballRadius = 10;

    const boxY = (canvas.height / 2) / 2;

    const startBox = {
        height: canvas.height / 2,
        width: 60,
        x: 0,
        y: boxY,
        strokeStyle: "rgba(0, 0, 255, 0.5)",
    };
    const finishBox = createHoldingBox(
        canvas.height / 2,
        60,
        (canvas.width - 60),
        (canvas.height / 2) / 2,
        "rgba(0, 0, 255, 0.5)",
    );


    const drawBox = (box) => {
        ctx.beginPath();
        ctx.rect(box.x, box.y, box.width, box.height);
        ctx.strokeStyle = box.strokeStyle;
        ctx.stroke();
        ctx.closePath();
    };
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    };
    const drawColumns = () => {
        for (let i = 0; i < bricks.length; i++) {
            const brick = bricks[i];
            ctx.beginPath();
            // ctx.rect(brick.widthBuffer, brick.verticalStart, wallWidth, brick.length);
            ctx.rect(brick.x, brick.y, wallWidth, brick.height);
            ctx.fillStyle = "#FFFFF";
            ctx.fill();
            ctx.closePath();
        };
    };
    const drawEntities = () => {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            ctx.beginPath();
            ctx.arc(entity.x, entity.y, entity.radius, 0, Math.PI * 2);
            ctx.fillStyle = entity.color;
            ctx.fill();
            ctx.closePath();

            //SENSORS
            const offset = entity.radius/2
            ctx.beginPath();
            ctx.rect(entity.x, entity.y - offset, 1, -ENTITY_SENSE_RADIUS ); //TOP
            ctx.rect(entity.x, entity.y + offset, 1, ENTITY_SENSE_RADIUS ); //BOTTOM
            ctx.rect(entity.x + offset, entity.y, ENTITY_SENSE_RADIUS, 1 ); //RIGHT
            ctx.rect(entity.x - offset, entity.y, -ENTITY_SENSE_RADIUS, 1 ); //LEFT
            ctx.fillStyle = "#ff0000";
            ctx.fill();
            ctx.closePath();

            //ENERGY SHIELD
            ctx.beginPath();
            ctx.arc(entity.x, entity.y, ENTITY_SENSE_RADIUS, 0, Math.PI * 2);
            ctx.strokeStyle = "#0095DD";
            ctx.stroke();
            ctx.closePath();

        };
    };
    const moveEntities = () => {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];

            if (!entity.goalReached && !entity.isDead) {
                entity.x += entity.dx;
                entity.y += entity.dy;
                // let elevation = 0;
                // elevation = updateEntityBehavior(entity);
                // entity.x += entity.dx;
                // entity.y += elevation * 0.1;
            } 
        };
    };

    function columnCollisionDetection() {
        for (let i = 0; i < bricks.length; i++) {
            const brick = bricks[i];

            //testing only
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, wallWidth, brick.height);
            ctx.fillStyle = "#ff0000";
            ctx.fill();
            ctx.closePath();
            //

            //Entities
            for (let i = 0; i < entities.length; i++) {
                const entity = entities[i];
                if (!entity.goalReached && !entity.isDead){
                    if (entity.x > brick.x - entity.radius && entity.x - entity.radius < brick.x + wallWidth && entity.y > brick.y && entity.y < brick.y + brick.height) {
                        entity.dx = -entity.dx;
                    }
                    if (entity.x > brick.x && entity.x < brick.x + wallWidth && (entity.y > brick.y - entity.radius && entity.y - entity.radius < brick.y + brick.height)) {
                        entity.dy = -entity.dy;
                    }

                    const sensorOnX = (x, sensorType="") => {
                        if (x > brick.x && x < brick.x + wallWidth && entity.y > brick.y && entity.y < brick.y + brick.height) {
                            console.log(`Sensor X Hit: ${sensorType}`);
                            // debugger
                            return true;
                        }else { return false; }
                    };
                    const sensorOnY = (y, sensorType="") => {
                        if (entity.x > brick.x && entity.x < brick.x + wallWidth && 
                            (y > brick.y && y < brick.y + brick.height)) {
                            console.log(`Sensor Y Hit: ${sensorType}`);
                            // debugger
                            return true;
                        }else { return false; }
                    };

                    if (sensorOnX(entity.x + ENTITY_SENSE_RADIUS, "RIGHT")){ 
                        entity.triggerType = brick.triggerType;
                    }else if (sensorOnX(entity.x + -ENTITY_SENSE_RADIUS, "LEFT")){
                        entity.triggerType = brick.triggerType;
                    }else if (sensorOnY(entity.y + -ENTITY_SENSE_RADIUS, "TOP")){
                        entity.triggerType = brick.triggerType;
                    }else if (sensorOnY(entity.y + ENTITY_SENSE_RADIUS, "BOTTOM")){
                        entity.triggerType = brick.triggerType;
                    };
                };
            };

            //BALL
            if (x > brick.x - ballRadius && x - ballRadius < brick.x + wallWidth && y > brick.y && y < brick.y + brick.height) {
                dx = -dx;
            }
            if (x > brick.x && x < brick.x + wallWidth && (y > brick.y - ballRadius && y - ballRadius < brick.y + brick.height) ) {
                dy = -dy;
            }

        }
    }

    const canvasCollisionDetection = () => {
        //Entities
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            if (!entity.goalReached && !entity.isDead) {

                if (entity.x + entity.dx > canvas.width - entity.radius || entity.x + entity.dx < entity.radius) {
                    entity.dx = -entity.dx;
                };
                if (entity.y + entity.dy > canvas.height - entity.radius || entity.y + entity.dy < entity.radius) {
                    entity.dy = -entity.dy;
                };
            };
        };
        //BALL
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
            dy = -dy;
        }        
    };

    const finishBoxCollision = () => {
        //Entities ONLY
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];

            entity.stats.finishBoxDist = getFinishBoxDistance(entity);

            if (entity.x > finishBox.x && entity.x < finishBox.x + finishBox.width && entity.y > finishBox.y && entity.y < finishBox.y + finishBox.height) {
                entity.goalReached = true;
            }

        };
        // entities = entities.filter((el) => {
        //     return !el.goalReached;
        // })
    };

    const draw = () =>{
        // debugger
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawColumns();
        drawBox(startBox);
        drawBox(finishBox);
        drawEntities(1);
        drawBall();
        columnCollisionDetection();
        canvasCollisionDetection();
        finishBoxCollision();

        x += dx;
        y += dy;
        moveEntities();
    }

    const runGame = () => {
        setInterval(draw, 10);
    }

    setupColumns()
    setupEntities(ENTITY_COUNT,startBox);
    runGame();
"use strict";
exports.__esModule = true;
var Direction;
(function (Direction) {
    Direction[Direction["Left"] = -1] = "Left";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Up"] = -1] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
})(Direction = exports.Direction || (exports.Direction = {}));
exports.compareValues = function (valA, valB) {
    if (valA > valB) {
        return 1;
    }
    else if (valA < valB) {
        return -1;
    }
    else {
        return 0;
    }
};
exports.updateElementValue = function (elementId, newVal, callBack) {
    if (callBack === void 0) { callBack = null; }
    document.getElementById(elementId).innerHTML = newVal;
    if (callBack) {
        callBack(newVal);
    }
};
exports.sampleArray = function (array) {
    if (!array)
        return null;
    return array[exports.getRandomInt(0, array.length - 1)];
};
exports.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};
exports.getRandomBoxPos = function (box, padding) {
    if (padding === void 0) { padding = 6; }
    return [exports.getRandomInt(box.PosX() + padding, box.GetWidth() - padding),
        exports.getRandomInt(box.PosY() + padding, box.GetHeight() - padding)];
};
//Requires a GameObject or Vector2
exports.getDistance = function (objectA, objectB) {
    if (!objectA || !objectB)
        return null;
    return Math.sqrt(Math.pow(objectA.PosX() - objectB.PosX(), 2) +
        Math.pow(objectA.PosY() - objectB.PosY(), 2));
};
exports.isInRange = function (value, min, max) {
    return (value >= min && value <= max);
};
exports.isAInXOfB = function (objectA, objectB) {
    // return objectA.PosX() + objectA.GetWidth() > objectB.PosX()
    //       || objectA.PosX() < objectB.PosX() + objectB.GetWidth();  
    var centerPos = objectA.GetCenterPos();
    var r = exports.isInRange(centerPos.PosX(), objectB.PosX(), objectB.PosX() + objectB.GetWidth());
    // debugger
    return r;
};
exports.isAInYOfB = function (objectA, objectB) {
    // return objectA.PosY() + objectA.GetHeight() > objectB.PosY() 
    //       || objectA.PosY() < objectB.PosY() + objectB.GetHeight(); 
    var centerPos = objectA.GetCenterPos();
    var r = exports.isInRange(centerPos.PosY(), objectB.PosY(), objectB.PosY() + objectB.GetHeight());
    // debugger
    return r;
};
exports.isAAboveB = function (objectA, objectB) {
    return objectA.PosY() < objectB.PosY()
        && objectA.PosY() + objectA.GetHeight() < objectB.PosY() + objectB.GetHeight();
};
exports.isTopCollision = function (objectA, objectB) {
    return objectA.PosY() + objectA.GetHeight() + objectA.DirY() > objectB.PosY();
};
exports.isBottomCollision = function (objectA, objectB) {
    // return objectA.PosY() - Math.abs(objectA.DirY()) < objectB.PosY() + objectB.GetHeight();
    return objectA.PosY() - objectA.GetHeight() < objectB.PosY() + objectB.GetHeight();
};
exports.isALeftOfB = function (objectA, objectB) {
    return objectA.PosX() < objectB.PosX()
        && objectA.PosX() + objectA.GetWidth() < objectB.PosX() + objectB.GetWidth();
};
exports.isRightCollision = function (objectA, objectB) {
    return objectA.PosX() + objectA.GetWidth() + objectA.DirX() > objectB.PosX();
};
exports.isLeftCollision = function (objectA, objectB) {
    return objectA.PosX() - objectA.GetWidth() < objectB.PosX() + objectB.GetWidth();
};
exports.isCollidingOnX = function (objectA, objectB) {
    if (objectA.HasTag("entity")) {
        // debugger
    }
    if (!exports.isAInYOfB(objectA, objectB))
        return false;
    if (exports.isALeftOfB(objectA, objectB)) {
        var col = exports.isRightCollision(objectA, objectB);
        // debugger;
        return col;
    }
    else {
        var col = exports.isLeftCollision(objectA, objectB);
        // debugger;
        return col;
    }
};
exports.isCollidingOnY = function (objectA, objectB) {
    if (objectA.HasTag("entity")) {
        // debugger
    }
    if (!exports.isAInXOfB(objectA, objectB))
        return false;
    if (exports.isAAboveB(objectA, objectB)) {
        var col = exports.isTopCollision(objectA, objectB);
        // debugger
        return col;
    }
    else {
        var col = exports.isBottomCollision(objectA, objectB);
        // debugger
        return col;
    }
};
exports.hasOverlapTop = function (objectA, objectB) {
    if (!exports.isAInXOfB(objectA, objectB))
        return false;
    return (objectA.PosY() <= objectB.PosY() + objectB.GetHeight()
        && objectA.PosY() + objectA.GetHeight() > objectB.PosY());
};
exports.hasOverlapBottom = function (objectA, objectB) {
    if (!exports.isAInXOfB(objectA, objectB))
        return false;
    return (objectA.PosY() + objectA.GetHeight() >= objectB.PosY()
        && objectA.PosY() < objectB.PosY() + objectB.GetHeight());
};
exports.hasOverlapRight = function (objectA, objectB) {
    if (!exports.isAInYOfB(objectA, objectB))
        return false;
    return (objectA.PosX() + objectA.GetWidth() >= objectB.PosX()
        && objectA.PosX() < objectB.PosX() + objectB.GetWidth());
};
exports.hasOverlapLeft = function (objectA, objectB) {
    if (!exports.isAInYOfB(objectA, objectB))
        return false;
    return (objectA.PosX() <= objectB.PosX() + objectB.GetWidth()
        && objectA.PosX() + objectA.GetWidth() > objectB.PosX());
};
exports.hasCollision = function (objA, objB) {
    // debugger
    if (objA.HasShape("circle")) {
        if (objB.HasShape("circle")) {
            return (exports.getDistance(objA, objB) < objA.radius + objB.radius) ?
                true : false;
        }
        else {
            return (exports.getDistance(objA, objB) < objA.radius + objB.width
                || exports.getDistance(objA, objB) < objA.radius + objB.height) ?
                true : false;
        }
    }
    else {
        if (objB.HasShape("circle")) {
            return (exports.getDistance(objA, objB) < objB.radius + objA.width
                || exports.getDistance(objA, objB) < objB.radius + objA.height) ?
                true : false;
        }
        else {
            return (objA.x < objB.x + objB.width
                && objA.x + objA.width > objB.x
                && objA.y < objB.y + objB.height
                && objA.y + objA.height > objB.y) ?
                true : false;
        }
    }
};
// window.hasCollision = hasCollision;
exports.getCenterLineX = function (obj) {
    var pA = {
        x: obj.PosX(),
        y: obj.PosY() + obj.GetHeight() / 2
    };
    var pB = {
        x: obj.PosX() + obj.GetWidth(),
        y: obj.PosY() + obj.GetHeight() / 2
    };
    return { pA: pA, pB: pB }; //line
};
exports.getCenterLineY = function (obj) {
    var pA = {
        x: obj.PosX() + obj.GetWidth() / 2,
        y: obj.PosY()
    };
    var pB = {
        x: obj.PosX() + obj.GetWidth() / 2,
        y: obj.PosY() + obj.GetHeight()
    };
    return { pA: pA, pB: pB }; //line
};
exports.getLineSide = function (point, line) {
    var pA = line.pA;
    var pB = line.pB;
    var d = (point.x - pA.x) * (pB.y - pA.y) -
        (point.y - pA.y) * (pB.x - pA.x);
    return d;
};
exports.getObjectASideBOnX = function (objectA, objectB) {
    var sideX = exports.getLineSide(objectA.pos, exports.getCenterLineY(objectB));
    // debugger
    return sideX;
};
exports.getObjectASideBOnY = function (objectA, objectB) {
    var sideY = exports.getLineSide(objectA.pos, exports.getCenterLineX(objectB));
    // debugger
    return sideY;
};
exports.addElement = function (atElId, elType, content, insertBefore) {
    if (insertBefore === void 0) { insertBefore = true; }
    // create a new div element 
    var newDiv = document.createElement(elType);
    // and give it some content 
    var newContent = document.createTextNode(content);
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    // add the newly created element and its content into the DOM 
    var currentDiv = document.getElementById(atElId);
    if (insertBefore) {
        document.body.insertBefore(newDiv, currentDiv);
        return;
    }
    document.body.appendChild(newDiv);
};

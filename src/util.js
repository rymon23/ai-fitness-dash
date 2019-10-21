
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomBoxPos = (box, padding = 6) => {
  return [getRandomInt(box.PosX() + padding, box.GetWidth() - padding),
  getRandomInt(box.PosY() + padding, box.GetHeight() - padding)];
}

//Requires a GameObject or Vector2
export const getDistance = (objectA, objectB) => {
  if (!objectA || !objectB) return null;

  return Math.sqrt(
    Math.pow(objectA.PosX() - objectB.PosX(), 2) + 
    Math.pow(objectA.PosY() - objectB.PosY(), 2)
  );
};

export const isInRange = (value, min, max) => {
  return (value >= min && value <= max);
};

// Returns true if two rectangles (l1, r1) and (l2, r2) overlap 
// export const doOverlap = (objectA, objectB) => { 

//     // If one rectangle is on left side of other 
//     if (objectA.PosX() < objectB.PosX() + objectB.GetWidth() 
//       || objectB.PosX() < objectA.PosX() l2.x > r1.x) 
//         return false; 
  
//     // If one rectangle is above other 
//     if (l1.y < r2.y || l2.y < r1.y) 
//         return false; 
  
//     return true; 
// } 

// export const isOverlapping = (other) => {
//     if (this.topRight.getY() < other.bottomLeft.getY() 
//       || this.bottomLeft.getY() > other.topRight.getY()) {
//         return false;
//     }
//     if (this.topRight.getX() < other.bottomLeft.getX() 
//       || this.bottomLeft.getX() > other.topRight.getX()) {
//         return false;
//     }
//     return true;
// }

export const isAInXOfB = (objectA, objectB) =>{
  // return objectA.PosX() + objectA.GetWidth() > objectB.PosX()
  //       || objectA.PosX() < objectB.PosX() + objectB.GetWidth();  
  const centerPos = objectA.GetCenterPos();
  const r = isInRange(centerPos.PosX(), objectB.PosX(), objectB.PosX() + objectB.GetWidth())
  // debugger
  return r;
}
export const isAInYOfB = (objectA, objectB) =>{
  // return objectA.PosY() + objectA.GetHeight() > objectB.PosY() 
  //       || objectA.PosY() < objectB.PosY() + objectB.GetHeight(); 
  const centerPos = objectA.GetCenterPos();
  const r = isInRange(centerPos.PosY(), objectB.PosY(), objectB.PosY() + objectB.GetHeight())
  // debugger
  return r;
}

export const isAAboveB = (objectA, objectB) =>{
  return objectA.PosY() < objectB.PosY() 
      && objectA.PosY() + objectA.GetHeight() < objectB.PosY() + objectB.GetHeight();   
}
export const isTopCollision = (objectA, objectB) =>{
    return objectA.PosY() + objectA.GetHeight() + objectA.DirY() > objectB.PosY();  
} 
export const isBottomCollision = (objectA, objectB) =>{
    // return objectA.PosY() - Math.abs(objectA.DirY()) < objectB.PosY() + objectB.GetHeight();
    return objectA.PosY() - objectA.GetHeight() < objectB.PosY() + objectB.GetHeight();  
} 

export const isALeftOfB = (objectA, objectB) =>{
  return objectA.PosX() < objectB.PosX() 
      && objectA.PosX() + objectA.GetWidth() < objectB.PosX() + objectB.GetWidth(); 
}
export const isRightCollision = (objectA, objectB) =>{
    return objectA.PosX() + objectA.GetWidth() + objectA.DirX() > objectB.PosX();  
}       
export const isLeftCollision = (objectA, objectB) =>{
    return objectA.PosX() - objectA.GetWidth() < objectB.PosX() + objectB.GetWidth();  
}       

export const isCollidingOnX = (objectA, objectB) => {
  if (objectA.HasTag("entity")){
    // debugger
  }

  if (!isAInYOfB(objectA, objectB)) return false;

  if (isALeftOfB(objectA, objectB)) {
    const col = isRightCollision(objectA, objectB);
    // debugger;
    return col;
  } else {
    const col = isLeftCollision(objectA, objectB);
    // debugger;
    return col;
  }
}
export const isCollidingOnY = (objectA, objectB) => {
  if (objectA.HasTag("entity")) {
    // debugger
  }
  if (!isAInXOfB(objectA, objectB)) return false;

  if (isAAboveB(objectA, objectB)){
    const col = isTopCollision(objectA, objectB);
    // debugger
    return col;
  }else {
    const col = isBottomCollision(objectA, objectB);
    // debugger
    return col;
  }
}

export const hasOverlapTop = (objectA, objectB) => {
  if (!isAInXOfB(objectA, objectB)) return false;

  return (objectA.PosY() <= objectB.PosY() + objectB.GetHeight()
    && objectA.PosY() + objectA.GetHeight() > objectB.PosY());
}
export const hasOverlapBottom = (objectA, objectB) => {
  if (!isAInXOfB(objectA, objectB)) return false;

  return (objectA.PosY() + objectA.GetHeight() >= objectB.PosY() 
    && objectA.PosY() < objectB.PosY() + objectB.GetHeight());
}
export const hasOverlapRight = (objectA, objectB) => {
  if (!isAInYOfB(objectA, objectB)) return false;

  return (objectA.PosX() + objectA.GetWidth() >= objectB.PosX() 
    && objectA.PosX() < objectB.PosX() + objectB.GetWidth());
}
export const hasOverlapLeft = (objectA, objectB) => {
  if (!isAInYOfB(objectA, objectB)) return false;

  return (objectA.PosX() <= objectB.PosX() + objectB.GetWidth()
    && objectA.PosX() + objectA.GetWidth() > objectB.PosX());
}




export const hasCollision = (objA, objB) => {
  debugger
  if (objA.HasShape("circle")) {
    if (objB.HasShape("circle")) {
      return (getDistance(objA,objB) < objA.radius + objB.radius) ? 
        true : false
    } else {
      return (getDistance(objA,objB) < objA.radius + objB.width
        || getDistance(objA,objB) < objA.radius + objB.height) ?
        true : false;
    }

  } else {
    if (objB.HasShape("circle")) {
      return (getDistance(objA,objB) < objB.radius + objA.width
        || getDistance(objA,objB) < objB.radius + objA.height) ?
        true : false;

    } else {
      return (objA.x < objB.x + objB.width
        && objA.x + objA.width > objB.x
        && objA.y < objB.y + objB.height
        && objA.y + objA.height > objB.y) ?
        true : false;
    }
  }
}
window.hasCollision = hasCollision;

// export const getCollisionData = (objA, objB) => {
//   if (!hasCollision(objA, objB)) return null;
//   const side = 
//   return {
    
//   }


// }


export const getCenterLineX = (obj) => {
  const pA = {
    x: obj.PosX(),
    y: obj.PosY() + obj.GetHeight() / 2
  };
  const pB = {
    x: obj.PosX() + obj.GetWidth(),
    y: obj.PosY() + obj.GetHeight() / 2
  };
  return { pA, pB }; //line
}

export const getCenterLineY = (obj) => {
  const pA = {
    x: obj.PosX() + obj.GetWidth() / 2,
    y: obj.PosY()
  };
  const pB = {
    x: obj.PosX() + obj.GetWidth() / 2,
    y: obj.PosY() + obj.GetHeight()
  };
  return { pA, pB }; //line
}

export const getLineSide = (point, line) => {
  const pA = line.pA;
  const pB = line.pB;
  const d = (point.x - pA.x) * (pB.y - pA.y) -
    (point.y - pA.y) * (pB.x - pA.x);
  return d;
}

export const getObjectASideBOnX = (objectA, objectB) => {
  const sideX = getLineSide(objectA.pos, getCenterLineY(objectB));
  debugger
  return sideX;
}

export const getObjectASideBOnY = (objectA, objectB) => {
  const sideY = getLineSide(objectA.pos, getCenterLineX(objectB));
  debugger
  return sideY;
}

// export const listFitnessRanks = (array) => {
//   const sideY = getLineSide(objectA.pos, getCenterLineX(objectB));
//   debugger
//   return sideY;
// }

export const addElement = (atElId, elType, content, insertBefore = true) => {
  // create a new div element 
  const newDiv = document.createElement(elType);
  // and give it some content 
  const newContent = document.createTextNode(content);
  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM 
  const currentDiv = document.getElementById(atElId);
  if (insertBefore){
    document.body.insertBefore(newDiv, currentDiv);
    return 
  }
  document.body.appendChild(newDiv);
}
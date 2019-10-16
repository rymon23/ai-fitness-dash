
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

//Requires objects to have a x and y key
export const getDistance = (objA, objB) => {
  if (!objA || !objB) return null;

  return Math.sqrt(
    Math.pow(objA.x - objB.x, 2) + Math.pow(objA.y - objB.y, 2)
  );
};

export const isInRange = (value, min, max) => {
  return (value >= min && value <= max) 
};
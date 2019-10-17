
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


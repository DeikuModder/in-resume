import { objectsAreEqual } from "./objectsAreEquals";

export function updateArray(objToPush, oldArray, newArray) {
  if (
    Object.keys(objToPush).length > 0 &&
    Object.values(objToPush).every(
      (value) => value !== undefined || value !== "" || value !== null
    )
  ) {
    oldArray.some((obj) => objectsAreEqual(obj, objToPush))
      ? console.log("No duplicates")
      : newArray.push(objToPush);
  }
}

export default function logAllProperties(obj) {
     if (obj == null) return; // recursive approach
     console.log(Object.getOwnPropertyNames(obj));
     logAllProperties(Object.getPrototypeOf(obj));
}

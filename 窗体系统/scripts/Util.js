export function runIfDefined(theFunction, ...args) {
    if (theFunction) {
        return theFunction(...args);
    }
}
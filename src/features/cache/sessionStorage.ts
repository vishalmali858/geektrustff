export const loadState = () => {
    try {
        let serializedState = sessionStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        serializedState = JSON.parse(serializedState);
        return { cache: serializedState };
    } catch (error) {
        return undefined;
    }
};

export const resetState = () => {
    try {
        sessionStorage.removeItem('state');
    } catch (error) {
        return undefined;
    }
};

export const saveState = (state: any) => {
    const { cache } = state;
    const { planets, vehicles, destinationObject } = cache;
    try {
        const saveStateToStorage = {
            planets: planets,
            vehicles: vehicles,
            destinationObject: destinationObject,
            // resultObject: resultObject,
            // timerCounter: timerCounter
        }
        const serializedState = JSON.stringify(saveStateToStorage);
        sessionStorage.setItem('state', serializedState);
    } catch (error) {
        console.error(error);
    }
}
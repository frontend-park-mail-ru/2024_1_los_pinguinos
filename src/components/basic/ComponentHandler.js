/**
 * Context generator for components (temporary solution, and it's awful)
 * @class
 */
class ComponentHandler {
    /**
     * Creates instance of class ComponentHandler.
     */
    constructor() {
        this.generatorId = 0;
    }
    /**
     * Generates a unique id for an object context within app's lifecycle
     * @function
     * @param {string} ComponentType - type of object context
     */
    generateId(componentType) {
        return componentType + this.generatorId++;
    }
    /**
     * Generates component object context
     * @function
     * @param {string} ComponentType - type of object context
     * @param {string[]} componentClassList - array of css selectors
     * @param {Object} ComponentData - object data
     */
    generateComponentContext(componentType, componentClassList, componentData) {
        const component = {};
        component['id'] = this.generateId(componentType);
        component['classes'] = componentClassList;
        for (const key in componentData) {
            component[key] = componentData[key];
        }

        return component;
    }
}

export default new ComponentHandler();


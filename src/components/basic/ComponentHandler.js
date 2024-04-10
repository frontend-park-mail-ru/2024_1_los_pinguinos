class ComponentHandler {
    constructor() {
        this.generatorId = 0;
    }
    generateId(componentType) {
        return componentType + this.generatorId++;
    }

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
const componentHandler = new ComponentHandler();
export default componentHandler;


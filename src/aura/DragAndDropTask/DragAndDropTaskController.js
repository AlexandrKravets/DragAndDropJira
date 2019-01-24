({
    doInit: function (component, event, helper) {
        helper.addStatusValueToKey(component);
        helper.getCustomTaskStatus(component, event);
        helper.getCustomTask(component, event);
    },

    allowDrop: function (component, event, helper) {
        helper.allowDrop(component, event);
    },

    drop: function (component, event, helper) {
        helper.drop(component, event, helper);
    },

    dragStart: function (component, event, helper) {
        helper.dragStart(component, event, helper);
    },

    closeModel: function (component, event, helper) {
        helper.closeModel(component, event, helper);
    },

    changeStatus: function (component, event, helper) {
        helper.changeStatus(component, event, helper);
    },

})
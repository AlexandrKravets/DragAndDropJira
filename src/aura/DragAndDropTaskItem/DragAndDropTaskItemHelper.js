({

    doInit: function (component, event) {
        var key = component.get("v.taskStatus");
        var map = component.get("v.customTasks");

        if (map[key] != null) {
            component.set("v.taskStatusList", map[key]);
        }
    },

    onDragStart: function (component, event) {
        component.set("v.isOpen", true);
        var dragStarted = component.getEvent("dragStarted");
        dragStarted.setParams({
            'currentStatus': component.get('v.taskStatus'),
            'taskId': event.target.id
        });
        dragStarted.fire();
    },


    onView: function (component, event, helper) {
        var navigateEvent = $A.get("e.force:navigateToSObject");
        navigateEvent.setParams({
            "recordId": event.target.id
        });
        window.open('/' + navigateEvent.getParam('recordId'));
    },

    refresh: function (component, event) {
        console.log('refresh');
        $A.get('e.force:refreshView').fire();
    },
})
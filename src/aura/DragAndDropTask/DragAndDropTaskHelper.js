({
    addStatusValueToKey: function (component) {
        var map = {};
        map["ToDo"] = ["InProgress", "Done"];
        map["InProgress"] = ["ToDo", "CodeReview"];
        map["CodeReview"] = ["InProgress", "Deployed"];
        map["Deployed"] = ["InTesting"];
        map["InTesting"] = ["ToDo", "InProgress", "Done"];
        map["Done"] = ["ToDo"];

        component.set("v.matchStatuses", map);
    },

    getCustomTasksStatuses: function (component, event) {

        var action = component.get("c.getCustomTasksStatuses");
        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === "SUCCESS") {
                var availableStatus = response.getReturnValue()
                component.set('v.availableStatusValues', availableStatus);

            }
        });

        $A.enqueueAction(action);
    },

    getCustomTasks: function (component, event) {

        var action = component.get("c.getCustomTasks");

        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === "SUCCESS") {
                var availableRecords = response.getReturnValue()
                component.set('v.customTasks', availableRecords);
                component.set('v.isLoaded', true);
            }

        });

        $A.enqueueAction(action);
    },

    allowDrop: function (component, event) {
        event.preventDefault();
    },

    dragStart: function (component, event, helper) {
        component.set("v.currentStatus", event.getParam("currentStatus"));
        component.set("v.taskId", event.getParam("taskId"));

        var matchStatuses = component.get('v.matchStatuses');

        matchStatuses[component.get("v.currentStatus")].forEach(function (matchStatus) {
            $A.util.addClass(document.getElementById(matchStatus), 'matchStatus');
        });

    },

    drop: function (component, event, helper) {
        component.set("v.Status", event.target.id);
        var matchStatuses = component.get('v.matchStatuses');

        if (matchStatuses[component.get("v.currentStatus")].includes(event.target.id)) {
            console.log('match');
            component.set("v.isOpenTaskDetail", true);
        }
        else {
            this.resetHighlightsClass(component);
            return;
        }

    },

    closeModel: function (component, event, helper) {
        this.resetHighlightsClass(component);
        component.set("v.isOpenTaskDetail", false);
    },

    changeStatus: function (component, event, helper) {
        var action = component.get("c.updateTaskStatus");
        action.setParams({
            'recordId': component.get('v.taskId'),
            'status': component.get('v.Status')
        });

        action.setCallback(this, function (response) {

            if (response) {
                this.doRefreshView(component, helper);
            }
        });

        $A.enqueueAction(action);
        component.set("v.isOpenTaskDetail", false);
    },

    doRefreshView: function (component, helper) {
        $A.get('e.force:refreshView').fire();
    },

    resetHighlightsClass: function (component) {
        var availableStatusValues = component.get('v.availableStatusValues');
        availableStatusValues.forEach(function (status) {
            $A.util.removeClass(document.getElementById(status), 'matchStatus');
        });
    },


})
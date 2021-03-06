/**
 * Created by okravets on 03.12.2018.
 */

public class DragAndDropController {
    @AuraEnabled
    public static List<String> getCustomTasksStatuses() {

        List<Schema.PickListEntry> typeObjects = CustomTask__c.Status__c.getDescribe().getPicklistValues();
        List<String> typeValues = new List<String>();
        for (Schema.PickListEntry pickListValue : typeObjects) {
            typeValues.add(pickListValue.getValue());
        }
        return typeValues;

    }

    @AuraEnabled
    public static Map<String, List<CustomTask__c>> getCustomTasks() {
        List<CustomTask__c> taskList = [SELECT Id, Name, Status__c, Comment__c, LastModifiedDate FROM CustomTask__c LIMIT 50];

        Map<String, List<CustomTask__c>> taskMap = new Map<String, List<CustomTask__c>>();
        for (CustomTask__c task : taskList) {
            if (taskMap.get(task.Status__c) == null) {
                taskMap.put(task.Status__c, new List<CustomTask__c>{task});
            } else {
                taskMap.get(task.Status__c).add(task);
            }
        }
        return taskMap;
    }


    @AuraEnabled
    public static void updateTaskStatus(String record) {

        CustomTaskDto fields = (CustomTaskDto) JSON.deserialize(record, CustomTaskDto.class);
        CustomTask__c recordToUpdate = [SELECT Id, Status__c, Comment__c FROM CustomTask__c WHERE Id = :fields.recordId LIMIT 1];
        if (recordToUpdate != null) {
            recordToUpdate.Status__c = fields.status;
            recordToUpdate.Comment__c = fields.comment;
            update recordToUpdate;
        }
    }
}
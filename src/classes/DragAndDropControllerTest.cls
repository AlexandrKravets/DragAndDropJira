/**
* Test class for DragAndDrop controller.
*/

@IsTest
public class DragAndDropControllerTest {
    public static CustomTask__c testRecord;

    @TestSetup
    static void createTestData() {
        testRecord = new CustomTask__c();
        testRecord.Name = 'Test Task';
        testRecord.Status__c = 'ToDo';
        testRecord.Comment__C = 'Test comment';
        insert testRecord;
    }

    @isTest
    static void getCustomTasksStatusesTest() {
        Test.startTest();
            List<String> statusList = DragAndDropController.getCustomTasksStatuses();
        Test.stopTest();
        System.assert(!statusList.isEmpty(), 'Expected  component list should not be empty');
    }


    @isTest
    static void getCustomTasksTest() {
        Test.startTest();
            Map<String, List<CustomTask__c>> expectedPicklists = DragAndDropController.getCustomTasks();
        Test.stopTest();

        for (String key : expectedPicklists.keySet()) {
            List<CustomTask__c> picklist = expectedPicklists.get(key);

            System.assert(!picklist.isEmpty(), 'Expected ' + key + ' component list should not be empty');
        }
    }

    @isTest
    static void updateTaskStatusTest() {
        CustomTask__c actualRecord = [SELECT Id, Name, Status__c, Comment__c FROM CustomTask__c LIMIT 1];

        String TEST_CONFIG_METADATA = '{"recordId":"'+actualRecord.Id+'","status":"InProgress","comment":"Enter you comment"}';
        Test.startTest();
            DragAndDropController.updateTaskStatus(TEST_CONFIG_METADATA);
        Test.stopTest();
        CustomTask__c expectedRecord = [SELECT Status__c FROM CustomTask__c LIMIT 1];
        System.assertEquals('InProgress', expectedRecord.Status__c, 'Expected  component list should not be empty');

    }
}
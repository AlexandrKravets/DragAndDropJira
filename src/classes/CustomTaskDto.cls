
public with sharing class CustomTaskDto {
    @AuraEnabled public String recordId;
    @AuraEnabled public String status;
    @AuraEnabled public String comment;
}
public with sharing class AccountLevelViewerApexController {
   
    @AuraEnabled
    public static List<Account> getAccountsPerLevel(String nivel){
        try {
            List<Account> accounts = [SELECT Id, Name, Phone, Nivel__c, LastModifiedBy.Name, StateSelected__c FROM Account WHERE Nivel__c = :nivel ORDER BY Name];
            return accounts;
            
        } catch (Exception e) {
            throw new AuraHandledException('Hubo un error al obtener las cuentas: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static void updateLevel(List<Id> cuentasIds){
    try {
        System.debug('updateLevel llamado con los siguientes IDs: ' + cuentasIds);

        List<Account> accountsToUpdate = [SELECT Id, Nivel__c FROM Account WHERE Id IN :cuentasIds];
        
        System.debug('Cuentas recuperadas para actualización: ' + accountsToUpdate);

        for(Account cuenta: accountsToUpdate) {
            if(cuenta.Nivel__c == 'Nivel 1') {
                cuenta.Nivel__c = 'Nivel 2';
            
            } else if(cuenta.Nivel__c == 'Nivel 2') {
                cuenta.Nivel__c = 'Nivel 1';
            }
        }

        // Debug para mostrar las cuentas con los nuevos niveles antes de actualizar
        System.debug('Cuentas con niveles modificados (antes de la actualización): ' + accountsToUpdate);

        update accountsToUpdate;
       
    } catch (Exception e) {
        System.debug('Error capturado durante la actualización de niveles: ' + e.getMessage());
        throw new AuraHandledException('Hubo un error al actualizar el nivel de las cuentas:' + e.getMessage());
    }
}
   
//Actualiza la casilla de selección (campo StateSelected__c)
    @AuraEnabled
    public static void updateAccountSelection(Id accountId, Boolean StateSelected){
        try {
             Account accToUpdate = [SELECT Id, StateSelected__c FROM Account WHERE Id = :accountId LIMIT 1]; 

            accToUpdate.StateSelected__c = StateSelected;
            
            update accToUpdate;
            
        } catch (Exception e) {
            throw new AuraHandledException('Hubo un error al actualizar el nivel las casillas de selección:' + e.getMessage());
        }
    }
}



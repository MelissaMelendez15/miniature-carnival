({
   doInit : function(component, event, helper) {
      helper.reloadAccountLists(component);
    },

    reloadAccountLists : function(component, event, helper) {
         helper.reloadAccountLists(component);
    },

    //Actualizar el Estado del Selected
    updateSelection :  function(component, event, helper) {
        var selected = event.getSource().get("v.checked");
        var currentId = event.getSource().get("v.value");

        //Llama al método Apex para actualizar el campo StateSelected__c
        var updateAction = component.get("c.updateAccountSelection");
        updateAction.setParams({
            "accountId": currentId,
            "StateSelected": selected
        });
        
        updateAction.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('Campo StateSelected__c actualizado con éxito');
            } else {
                console.error('Error al actualizar el campo StateSelected__c');

                //Informamos al usuario del error
                var toastEvent = $A.get("e.force:showToast");
                if(toastEvent) {
                    toastEvent.setParams({
                    "title": "Error",
                    "message": "Hubo un problema al actualizar la selección. Por favor, inténtalo de nuevo.",
                    "type": "error"
                });
                toastEvent.fire();
                } else {
                    alert('Hubo un problema al actualizar la selección. Por favor, inténtalo de nuevo.');
                }
            }
        });
        $A.enqueueAction(updateAction);
    },

    updateAccountLevel : function(component, event, helper) {
        
        // Obtener las cuentas de ambos niveles
        var cuentasNivel1 = component.get("v.cuentasNivel1");
        var cuentasNivel2 = component.get("v.cuentasNivel2");

        // IDs de cuentas seleccionadas para actualizar
         var selectedAccountIds = [];

        // Recopila los IDs de cuentas seleccionadas de Nivel 1
        for (var i = 0; i < cuentasNivel1.length; i++) {
            if (cuentasNivel1[i].StateSelected__c) {
                selectedAccountIds.push(cuentasNivel1[i].Id);
            }
        }
        
        // Recopila los IDs de cuentas seleccionadas de Nivel 2
        for (var i = 0; i < cuentasNivel2.length; i++) {
            if (cuentasNivel2[i].StateSelected__c) {
                selectedAccountIds.push(cuentasNivel2[i].Id);
            }
        }

        //Llama al método de Apex para actualizar
        var action = component.get("c.updateLevel");
        action.setParams({
            cuentasIds: selectedAccountIds
        });
    
        var self = helper;
       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
               self.reloadAccountLists(component);
            
            } else {
                console.error('Error al actualizar niveles de cuenta:', response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})
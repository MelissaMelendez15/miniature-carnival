({
    reloadAccountLists : function(component) {
   
   //Consultando cuentas de Nivel 1
   var actionNivel1 = component.get("c.getAccountsPerLevel");
   actionNivel1.setParams({
       "nivel": "Nivel 1"
   });
   actionNivel1.setCallback(this, function(response){
       var state = response.getState();
       if (state === "SUCCESS") {
           component.set("v.cuentasNivel1", response.getReturnValue());
           console.log('Datos devueltos para Nivel 1:', response.getReturnValue());
       }
   });
   $A.enqueueAction(actionNivel1);

    //Consultando cuentas de Nivel 2
    var actionNivel2 = component.get("c.getAccountsPerLevel");
    actionNivel2 .setParams({
        "nivel": "Nivel 2"
    });
    actionNivel2 .setCallback(this, function(response){
        var state = response.getState();
        if (state === "SUCCESS") {
            component.set("v.cuentasNivel2", response.getReturnValue());
            console.log('Datos devueltos para Nivel 2:', response.getReturnValue());
        }
    });
    $A.enqueueAction(actionNivel2);

  }
})


local ESX = exports['es_extended']:getSharedObject()

AddEventHandler('onResourceStart', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
        return
    end
    
    print('^2[qt_HUD]^7 qt_HUD démarré avec succès!')
end)
function CalculateDistance(point1, point2)
    local dx = point2.x - point1.x
    local dy = point2.y - point1.y
    local dz = point2.z - point1.z
    return math.sqrt(dx*dx + dy*dy + dz*dz)
end

Citizen.CreateThread(function()
    while ESX.GetPlayerData().job == nil do
        Citizen.Wait(10)
    end
    
    PlayerData = ESX.GetPlayerData()
    isLoggedIn = true
    SendNUIMessage({
        action = 'initialize',
        config = Config
    })
end)

Citizen.CreateThread(function()
    local minimap = RequestScaleformMovie("minimap")
    SetRadarBigmapEnabled(true, false)
    Wait(0)
    SetRadarBigmapEnabled(false, false)
    DisplayRadar(true)
    
    while true do
        Wait(500)
        BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
        ScaleformMovieMethodAddParamInt(3)
        EndScaleformMovieMethod()
    end
end)

function GetStreetName()
    local playerPed = PlayerPedId()
    local coords = GetEntityCoords(playerPed)
    
    local streetHash, crossingHash = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
    local streetName = GetStreetNameFromHashKey(streetHash)
    local crossingName = GetStreetNameFromHashKey(crossingHash)
    
    if crossingName ~= "" then
        return streetName .. " / " .. crossingName
    else
        return streetName
    end
end

Citizen.CreateThread(function()
    while true do
        if isLoggedIn and not isPaused and not hudHidden then
            local playerPed = PlayerPedId()
            local health = GetEntityHealth(playerPed) - 100
            local armor = GetPedArmour(playerPed)
            local stamina = 100 - GetPlayerSprintStaminaRemaining(PlayerId())
            local oxygen = GetPlayerUnderwaterTimeRemaining(PlayerId()) * 10
            
            if health < 0 then health = 0 end
            
            local hudData = {
                action = 'updateHUD',
                health = health,
                armor = armor,
                stamina = stamina,
                oxygen = oxygen,
                isBleeding = false,
                isCuffed = IsPedCuffed(playerPed),
                streetName = GetStreetName()
            }
            
            TriggerEvent('esx_status:getStatus', 'hunger', function(status)
                hudData.hunger = status.getPercent()
            end)
            
            TriggerEvent('esx_status:getStatus', 'thirst', function(status)
                hudData.thirst = status.getPercent()
            end)
            
            SendNUIMessage(hudData)
        end
        
        Citizen.Wait(Config.UpdateInterval)
    end
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
    PlayerData = xPlayer
    isLoggedIn = true
    SetRadarBigmapEnabled(false, false)
    DisplayRadar(true)
    
    SendNUIMessage({
        action = 'initialize',
        config = Config
    })
end)

RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(job)
    PlayerData.job = job
end)

RegisterCommand('togglehud', function()
    hudHidden = not hudHidden
    
    SendNUIMessage({
        action = 'toggleHUD',
        show = not hudHidden
    })
    
    TriggerEvent('chat:addMessage', {
        color = {255, 0, 0},
        multiline = true,
        args = {'[qt_HUD]', hudHidden and 'HUD caché' or 'HUD affiché'}
    })
end, false)

Citizen.CreateThread(function()
    while true do
        if IsPauseMenuActive() then
            if not isPaused then
                isPaused = true
                SendNUIMessage({
                    action = 'toggleHUD',
                    show = false
                })
            end
        else
            if isPaused then
                isPaused = false
                SendNUIMessage({
                    action = 'toggleHUD',
                    show = not hudHidden
                })
            end
        end
        
        Citizen.Wait(500)
    end
end)

RegisterNUICallback('closeSettings', function(data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('updateConfig', function(data, cb)
    for key, value in pairs(data.config) do
        if Config[key] ~= nil then
            Config[key] = value
        end
    end
    
    cb({
        status = 'success',
        message = 'Configuration mise à jour avec succès'
    })
    
    SendNUIMessage({
        action = 'initialize',
        config = Config
    })
end)

Citizen.CreateThread(function()
    local lastActivity = GetGameTimer()
    local isHidden = false
    
    while true do
        if Config.AutoHide and isLoggedIn and not isPaused and not hudHidden then
            if IsControlPressed(0, 32) or IsControlPressed(0, 33) or IsControlPressed(0, 34) or IsControlPressed(0, 35) or
               IsControlPressed(0, 71) or IsControlPressed(0, 72) or IsControlPressed(0, 142) or IsControlPressed(0, 21) then
                lastActivity = GetGameTimer()
                
                if isHidden then
                    isHidden = false
                    SendNUIMessage({
                        action = 'setOpacity',
                        opacity = Config.DefaultOpacity
                    })
                end
            elseif GetGameTimer() - lastActivity > Config.AutoHideDelay then
                if not isHidden then
                    isHidden = true
                    SendNUIMessage({
                        action = 'setOpacity',
                        opacity = Config.MinimizedOpacity
                    })
                end
            end
        end
        
        Citizen.Wait(1000)
    end
end)

RegisterCommand('fixmap', function()
    SetRadarBigmapEnabled(false, false)
    DisplayRadar(true)
    TriggerEvent('chat:addMessage', {
        color = {0, 255, 0},
        multiline = true,
        args = {'[qt_HUD]', 'Minimap réinitialisée'}
    })
end, false)
const config = {
    UpdateInterval: 500,
    EnableHealthBar: true,
    EnableArmorBar: true,
    EnableHungerBar: true,
    EnableThirstBar: true,
    EnableStaminaBar: true,
    EnableOxygenBar: true,
    EnableWeaponDisplay: true,
    EnableStreetName: true,
    AnimationDuration: 500,
    EnablePulseEffect: true,
    PulseThreshold: 20,
    AutoHide: true,
    AutoHideDelay: 5000,
    DefaultOpacity: 0.8,
    MinimizedOpacity: 0.3,
    Colors: {
        Health: { r: 46, g: 204, b: 113 },
        Armor: { r: 52, g: 152, b: 219 },
        Hunger: { r: 230, g: 126, b: 34 },
        Thirst: { r: 41, g: 128, b: 185 },
        Stamina: { r: 155, g: 89, b: 182 },
        Oxygen: { r: 26, g: 188, b: 156 }
    }
};

const hudState = {
    health: 100,
    armor: 100,
    hunger: 100,
    thirst: 100,
    stamina: 100,
    oxygen: 100,
    isVisible: true,
    streetName: "Nom de la rue"
};

function colorToString(color) {
    if (!color || typeof color.r === 'undefined') {
        return 'rgb(255, 255, 255)';
    }
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.addEventListener('DOMContentLoaded', function() {
    const elements = {
        hudContainer: document.getElementById('hud-container'),
        circularHud: document.getElementById('circular-hud'),
        settingsMenu: document.getElementById('settings-menu'),
        streetInfo: document.getElementById('street-info'),
        streetName: document.getElementById('street-name'),
        
        healthIndicator: document.getElementById('health-indicator'),
        armorIndicator: document.getElementById('armor-indicator'),
        hungerIndicator: document.getElementById('hunger-indicator'),
        thirstIndicator: document.getElementById('thirst-indicator'),
        staminaIndicator: document.getElementById('stamina-indicator'),
        oxygenIndicator: document.getElementById('oxygen-indicator'),
        
        healthFill: document.getElementById('health-fill'),
        armorFill: document.getElementById('armor-fill'),
        hungerFill: document.getElementById('hunger-fill'),
        thirstFill: document.getElementById('thirst-fill'),
        staminaFill: document.getElementById('stamina-fill'),
        oxygenFill: document.getElementById('oxygen-fill'),
        
        closeSettings: document.getElementById('close-settings'),
        saveSettings: document.getElementById('save-settings'),
        resetSettings: document.getElementById('reset-settings'),
        
        animationDuration: document.getElementById('animationDuration'),
        animationDurationValue: document.getElementById('animationDurationValue'),
        defaultOpacity: document.getElementById('defaultOpacity'),
        defaultOpacityValue: document.getElementById('defaultOpacityValue'),
        
        enableHealth: document.getElementById('enableHealth'),
        enableArmor: document.getElementById('enableArmor'),
        enableHunger: document.getElementById('enableHunger'),
        enableThirst: document.getElementById('enableThirst'),
        enableStamina: document.getElementById('enableStamina'),
        enableOxygen: document.getElementById('enableOxygen'),
        enableStreetName: document.getElementById('enableStreetName'),
        enablePulse: document.getElementById('enablePulse'),
        autoHide: document.getElementById('autoHide')
    };

    function setCircleProperties() {
        if (!elements.healthFill) {
            console.error('Les éléments SVG n\'ont pas été trouvés');
            return;
        }

        const indicators = [
            { element: elements.healthFill, color: colorToString(config.Colors.Health) },
            { element: elements.armorFill, color: colorToString(config.Colors.Armor) },
            { element: elements.hungerFill, color: colorToString(config.Colors.Hunger) },
            { element: elements.thirstFill, color: colorToString(config.Colors.Thirst) },
            { element: elements.staminaFill, color: colorToString(config.Colors.Stamina) },
            { element: elements.oxygenFill, color: colorToString(config.Colors.Oxygen) }
        ];
        
        indicators.forEach(indicator => {
            if (indicator.element) {
                indicator.element.setAttribute('stroke', indicator.color);
                
                const radius = indicator.element.getAttribute('r');
                const circumference = 2 * Math.PI * radius;
                
                indicator.element.style.strokeDasharray = `${circumference} ${circumference}`;
                indicator.element.style.strokeDashoffset = '0';
            }
        });
    }

    function updateCircularIndicator(fillElement, value, isEnabled, color) {
        if (!fillElement || !isEnabled) return;
        
        const clampedValue = Math.max(0, Math.min(100, value));
        
        const radius = fillElement.getAttribute('r');
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (clampedValue / 100) * circumference;
        fillElement.style.strokeDashoffset = offset;
        
        if (clampedValue <= 20) {
            fillElement.setAttribute('stroke', 'rgb(231, 76, 60)');
        } else if (clampedValue <= 50) {
            fillElement.setAttribute('stroke', 'rgb(241, 196, 15)');
        } else {
            fillElement.setAttribute('stroke', colorToString(color));
        }
    }

    function updateHUD() {
        updateCircularIndicator(elements.healthFill, hudState.health, config.EnableHealthBar, config.Colors.Health);
        updateCircularIndicator(elements.armorFill, hudState.armor, config.EnableArmorBar, config.Colors.Armor);
        updateCircularIndicator(elements.hungerFill, hudState.hunger, config.EnableHungerBar, config.Colors.Hunger);
        updateCircularIndicator(elements.thirstFill, hudState.thirst, config.EnableThirstBar, config.Colors.Thirst);
        updateCircularIndicator(elements.staminaFill, hudState.stamina, config.EnableStaminaBar, config.Colors.Stamina);
        updateCircularIndicator(elements.oxygenFill, hudState.oxygen, config.EnableOxygenBar, config.Colors.Oxygen);
        
        if (elements.streetInfo) {
            elements.streetInfo.style.display = config.EnableStreetName ? 'flex' : 'none';
            if (elements.streetName && config.EnableStreetName) {
                elements.streetName.textContent = hudState.streetName;
            }
        }
        
        if (elements.healthIndicator) elements.healthIndicator.style.display = config.EnableHealthBar ? 'block' : 'none';
        if (elements.armorIndicator) elements.armorIndicator.style.display = config.EnableArmorBar ? 'block' : 'none';
        if (elements.hungerIndicator) elements.hungerIndicator.style.display = config.EnableHungerBar ? 'block' : 'none';
        if (elements.thirstIndicator) elements.thirstIndicator.style.display = config.EnableThirstBar ? 'block' : 'none';
        if (elements.staminaIndicator) elements.staminaIndicator.style.display = config.EnableStaminaBar ? 'block' : 'none';
        if (elements.oxygenIndicator) elements.oxygenIndicator.style.display = config.EnableOxygenBar ? 'block' : 'none';
        
        applyPulseEffect();
    }

    function applyPulseEffect() {
        if (!config.EnablePulseEffect) return;
        
        const checkPulse = (value, element) => {
            if (element && value <= config.PulseThreshold) {
                element.classList.add('pulse');
            } else if (element) {
                element.classList.remove('pulse');
            }
        };
        
        checkPulse(hudState.health, elements.healthIndicator);
        checkPulse(hudState.armor, elements.armorIndicator);
        checkPulse(hudState.hunger, elements.hungerIndicator);
        checkPulse(hudState.thirst, elements.thirstIndicator);
        checkPulse(hudState.stamina, elements.staminaIndicator);
        checkPulse(hudState.oxygen, elements.oxygenIndicator);
    }

    function applyConfig() {
        setCircleProperties();
        
        if (elements.hudContainer) {
            elements.hudContainer.style.opacity = config.DefaultOpacity;
        }
        
        updateHUD();
        
        updateSettingsUI();
    }

    function updateSettingsUI() {
        if (elements.enableHealth) elements.enableHealth.checked = config.EnableHealthBar;
        if (elements.enableArmor) elements.enableArmor.checked = config.EnableArmorBar;
        if (elements.enableHunger) elements.enableHunger.checked = config.EnableHungerBar;
        if (elements.enableThirst) elements.enableThirst.checked = config.EnableThirstBar;
        if (elements.enableStamina) elements.enableStamina.checked = config.EnableStaminaBar;
        if (elements.enableOxygen) elements.enableOxygen.checked = config.EnableOxygenBar;
        if (elements.enableStreetName) elements.enableStreetName.checked = config.EnableStreetName;
        if (elements.enablePulse) elements.enablePulse.checked = config.EnablePulseEffect;
        if (elements.autoHide) elements.autoHide.checked = config.AutoHide;
        
        if (elements.animationDuration && elements.animationDurationValue) {
            elements.animationDuration.value = config.AnimationDuration;
            elements.animationDurationValue.textContent = config.AnimationDuration;
        }
        
        if (elements.defaultOpacity && elements.defaultOpacityValue) {
            elements.defaultOpacity.value = config.DefaultOpacity;
            elements.defaultOpacityValue.textContent = config.DefaultOpacity;
        }
    }

    function setupEventListeners() {
        if (elements.closeSettings) {
            elements.closeSettings.addEventListener('click', () => {
                if (elements.settingsMenu) elements.settingsMenu.classList.add('hidden');
                if (elements.hudContainer) elements.hudContainer.classList.remove('blur');
                
                fetch('https://qt_HUD/closeSettings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({})
                }).catch(err => console.error('Erreur lors de la fermeture des paramètres:', err));
            });
        }
        
        if (elements.saveSettings) {
            elements.saveSettings.addEventListener('click', () => {
                const newConfig = {};
                
                if (elements.enableHealth) newConfig.EnableHealthBar = elements.enableHealth.checked;
                if (elements.enableArmor) newConfig.EnableArmorBar = elements.enableArmor.checked;
                if (elements.enableHunger) newConfig.EnableHungerBar = elements.enableHunger.checked;
                if (elements.enableThirst) newConfig.EnableThirstBar = elements.enableThirst.checked;
                if (elements.enableStamina) newConfig.EnableStaminaBar = elements.enableStamina.checked;
                if (elements.enableOxygen) newConfig.EnableOxygenBar = elements.enableOxygen.checked;
                if (elements.enableStreetName) newConfig.EnableStreetName = elements.enableStreetName.checked;
                if (elements.enablePulse) newConfig.EnablePulseEffect = elements.enablePulse.checked;
                if (elements.autoHide) newConfig.AutoHide = elements.autoHide.checked;
                
                if (elements.animationDuration) {
                    newConfig.AnimationDuration = parseInt(elements.animationDuration.value);
                }
                if (elements.defaultOpacity) {
                    newConfig.DefaultOpacity = parseFloat(elements.defaultOpacity.value);
                }
                
                Object.assign(config, newConfig);
                
                applyConfig();
                
                if (elements.settingsMenu) elements.settingsMenu.classList.add('hidden');
                if (elements.hudContainer) elements.hudContainer.classList.remove('blur');
                
                fetch('https://qt_HUD/updateConfig', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({ config: newConfig })
                }).catch(err => console.error('Erreur lors de la mise à jour de la configuration:', err));
            });
        }
        
        if (elements.resetSettings) {
            elements.resetSettings.addEventListener('click', () => {
                fetch('https://qt_HUD/resetConfig', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({})
                }).catch(err => console.error('Erreur lors de la réinitialisation de la configuration:', err));
            });
        }
        
        if (elements.animationDuration && elements.animationDurationValue) {
            elements.animationDuration.addEventListener('input', () => {
                elements.animationDurationValue.textContent = elements.animationDuration.value;
            });
        }
        
        if (elements.defaultOpacity && elements.defaultOpacityValue) {
            elements.defaultOpacity.addEventListener('input', () => {
                elements.defaultOpacityValue.textContent = elements.defaultOpacity.value;
            });
        }
    }

    if (elements.hudContainer) {
        setCircleProperties();
        
        setupEventListeners();
        
        elements.hudContainer.classList.add('fade-in');
        
        updateHUD();
    } else {
        console.error('Erreur: Le conteneur HUD n\'a pas été trouvé');
    }

    window.addEventListener('message', (event) => {
        const data = event.data;
        
        switch (data.action) {
            case 'initialize':
                if (data.config) {
                    Object.assign(config, data.config);
                    applyConfig();
                }
                break;
                
            case 'updateHUD':
                if (data.health !== undefined) hudState.health = data.health;
                if (data.armor !== undefined) hudState.armor = data.armor;
                if (data.hunger !== undefined) hudState.hunger = data.hunger;
                if (data.thirst !== undefined) hudState.thirst = data.thirst;
                if (data.stamina !== undefined) hudState.stamina = data.stamina;
                if (data.oxygen !== undefined) hudState.oxygen = data.oxygen;
                if (data.streetName !== undefined) hudState.streetName = data.streetName;
                
                if (elements.streetName && data.streetName) {
                    elements.streetName.textContent = data.streetName;
                }
                
                updateHUD();
                break;
                
            case 'toggleHUD':
                hudState.isVisible = data.show;
                if (elements.hudContainer) {
                    elements.hudContainer.style.display = hudState.isVisible ? 'block' : 'none';
                }
                break;
                
            case 'setOpacity':
                if (elements.hudContainer) {
                    elements.hudContainer.style.opacity = data.opacity;
                }
                break;
                
            case 'openSettings':
                if (elements.settingsMenu) {
                    elements.settingsMenu.classList.remove('hidden');
                }
                if (elements.hudContainer) {
                    elements.hudContainer.classList.add('blur');
                }
                break;
        }
    });

    if (config.AutoHide) {
        let lastActivity = Date.now();
        let isHidden = false;
        
        setInterval(() => {
            if (config.AutoHide && hudState.isVisible) {
                if (isControlPressed()) {
                    lastActivity = Date.now();
                    
                    if (isHidden && elements.hudContainer) {
                        isHidden = false;
                        elements.hudContainer.style.opacity = config.DefaultOpacity;
                    }
                } else if (Date.now() - lastActivity > config.AutoHideDelay) {
                    if (!isHidden && elements.hudContainer) {
                        isHidden = true;
                        elements.hudContainer.style.opacity = config.MinimizedOpacity;
                    }
                }
            }
        }, 1000);
    }

    function isControlPressed() {
        return false;
    }
});
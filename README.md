# QT HUD - Système d'interface pour ESX Legacy

## Description
QT HUD est un système d'affichage tête haute (HUD) moderne et élégant pour votre serveur FiveM utilisant ESX Legacy. Il affiche les informations essentielles du joueur de manière intuitive avec des indicateurs circulaires et personnalisables.

## Caractéristiques
- Interface utilisateur moderne avec indicateurs circulaires
- Affichage des informations vitales:
  - Santé
  - Armure
  - Faim
  - Soif
  - Endurance
  - Oxygène
- Affichage du nom de rue actuel
- Système d'auto-masquage lors de l'inactivité
- Effets de pulsation pour les statistiques critiques
- Personnalisation complète via le fichier de configuration
- Compatibilité totale avec ESX Legacy
- Animation fluide des indicateurs
- Interface responsive

## Dépendances
- ESX Legacy

## Installation
1. Téléchargez les fichiers et placez-les dans votre dossier `resources`
2. Ajoutez `ensure qt_HUD` à votre fichier `server.cfg`
3. Redémarrez votre serveur

## Configuration
Le fichier `config.lua` vous permet de personnaliser entièrement le HUD:

### Options générales
```lua
Config.UpdateInterval = 500 -- Intervalle de mise à jour du HUD (en ms)
Config.EnableHealthBar = true -- Activer/désactiver la barre de santé
Config.EnableArmorBar = true -- Activer/désactiver la barre d'armure
Config.EnableHungerBar = true -- Activer/désactiver la barre de faim
Config.EnableThirstBar = true -- Activer/désactiver la barre de soif
Config.EnableStaminaBar = true -- Activer/désactiver la barre d'endurance
Config.EnableOxygenBar = true -- Activer/désactiver la barre d'oxygène
Config.EnableStreetName = true -- Activer/désactiver l'affichage du nom de rue
```

### Personnalisation des couleurs
Vous pouvez personnaliser les couleurs de chaque indicateur:
```lua
Config.Colors = {
    Health = { r = 46, g = 204, b = 113 }, -- Couleur de la barre de santé
    Armor = { r = 52, g = 152, b = 219 }, -- Couleur de la barre d'armure
    Hunger = { r = 230, g = 126, b = 34 }, -- Couleur de la barre de faim
    Thirst = { r = 41, g = 128, b = 185 }, -- Couleur de la barre de soif
    Stamina = { r = 155, g = 89, b = 182 }, -- Couleur de la barre d'endurance
    Oxygen = { r = 26, g = 188, b = 156 } -- Couleur de la barre d'oxygène
}
```

### Effets et animations
```lua
Config.AnimationDuration = 500 -- Durée des animations (en ms)
Config.EnablePulseEffect = true -- Activer/désactiver l'effet de pulsation
Config.PulseThreshold = 20 -- Seuil en dessous duquel l'effet de pulsation s'active (%)

Config.AutoHide = true -- Activer/désactiver l'auto-masquage
Config.AutoHideDelay = 5000 -- Délai avant l'auto-masquage (en ms)
Config.DefaultOpacity = 0.8 -- Opacité par défaut
Config.MinimizedOpacity = 0.3 -- Opacité en mode masqué
```

## Utilisation
Le HUD s'affiche automatiquement en bas à gauche de l'écran. Les joueurs peuvent:

- Visualiser leur santé, armure, faim, soif, endurance et oxygène grâce aux indicateurs circulaires
- Voir le nom de la rue actuelle
- Utiliser la commande `/togglehud` pour afficher ou masquer le HUD
- Utiliser la commande `/fixmap` pour réinitialiser la minimap si nécessaire

## Commandes
```
/togglehud - Afficher/masquer le HUD
/fixmap - Réinitialiser la minimap
```

## Personnalisation avancée
Pour des personnalisations plus poussées, vous pouvez modifier:
- Les fichiers CSS pour changer l'apparence visuelle
- Le fichier HTML pour modifier la structure
- Le fichier JavaScript pour ajouter des fonctionnalités supplémentaires

## Développement et Support
Pour toute question ou problème concernant ce script, n'hésitez pas à me contacter.

## Licence
Ce script est distribué sous licence privée et ne peut être redistribué sans autorisation.

---

J'espère que vous apprécierez ce système de HUD pour votre serveur! N'hésitez pas à me faire part de vos commentaires ou suggestions d'amélioration.

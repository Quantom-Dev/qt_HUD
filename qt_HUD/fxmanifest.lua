fx_version 'cerulean'
game 'gta5'

name 'qt_HUD'
author 'Quantom'
description 'HUD Pour le serveur BadSide'
version '1.0.0'

ui_page 'ui/index.html'

shared_scripts {
    '@es_extended/imports.lua',
    'config.lua'
}

client_scripts {
    'client.lua'
}

server_scripts {
    'server.lua',
}

files {
    'ui/index.html',
    'ui/style.css',
    'ui/script.js'
}

dependencies {
    'es_extended'
}
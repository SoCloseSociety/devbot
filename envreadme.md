@SoClose

>| racine
    >| Fichiers:
        | devbot.js -> index.js.
        | config.json -> Api Key + Sécurité.
        | package.json -> Dépendances. 
        | .eslintrc.json -> AutoCorrecteur ligne et tab ect..
        | readme.md -> Infos Générale.

    >| Dossiers:
        ->| cmd_commerce -> Payments commandes:
            |

        ->| cmd_public -> Public commandes:    
            | ping -> First call to server.
            |

        ->| cmd_server : Server commandes:
            | ban -> Bannir un membre.
            | clear -> Supprimer du texte de 1 à 99.
            | kick -> Kicker un membre.
            | reload -> Recharger une commande (file.js).
            | server -> Affiche les informations serveurs.
            |

        ->| cmd_webhook : Webhooks commandes:
            |

        ->| cmd_private : Commande privé Team Admin: 
            | embed -> Envoie de message générale avec mise en page.
            | help -> Documentation des commandes.
            |

    >| Dependances:
        | nodes_modules : Library générale.
        
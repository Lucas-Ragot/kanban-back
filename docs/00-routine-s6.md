# Mémo git

Le principe du multi remote, c'est de se dire qu'un dépot local peut être relié à plusieurs dépots distants. On donnera un petit nom aux dépots distants (qu'on appelle remote) et au moment de pull ou push ou précisera le petit nom de la remote qu'on vise.

Ce qu'on va faire :

- On va garder master pour la version clean, cad la correction
- Au quotidien on va préférer travailler dans des branches, par exemple pourquoi pas faire une branche par jour ou une branche conception, une branche models, ...
- On va se brancher à la remote du prof un fois initialement via `git remote add correction git@github.com:O-clock-Daguerre/S6-oKanban-alexisOclock.git` dans nos dépots à nous
  On dit en fait `git remote add nomDeLaRemoteQuonChoisit lienSSHduRepo`

Rappel pratique :

- pour changer de branche : `git checkout nomdelabranche`
- pour voir les branches et la branche active `git branch`
- pour créer une branche à partir de la branche sur laquelle on se trouve :
  - On vérifie qu'on est à jour dans nos commits (`git status`)
  - On crée la branche et on se positionne dessus avec `git checkout -b nomdelanouvellebranche`
  - Si on veut récupérer les derniers commit de correction sur la branche master :
    - On se met sur master `git checkout master`
    - On pull depuis la bonne remote `git pull correction master` avec l'option pour l'historique au besoin `git pull --allow-unrelated-histories correction master`

Astuce si on a travaillé sur master :

- On se place sur master `git checkout master`
- On commit tout ce qui doit l'etre
- On crée une nouvelle branche pour ne rien perdre `git checkout -b jour1`
- On revient sur master `git checkout master`
- On pull `git pull --allow-unrelated-histories correction master`
- On résoud les conflits au besoin en ouvrant les fichiers dans VSCode, on accèpte les modifications entrantes
- On add et commit nos changements
- On crée notre nouvelle branche pour la journée à venir `git checkout -b jour2`

Pour pull en résolvant les conflit automatiquement sans se casser la tete

- On se met sur master puis `git pull --allow-unrelated-histories --no-edit -X theirs correction master`

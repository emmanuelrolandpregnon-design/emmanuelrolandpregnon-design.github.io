# Portfolio — Emmanuel-Roland Pregnon

Site statique : projets, parcours et contact. Hébergé sur GitHub Pages.

- Dépôt : https://github.com/emmanuelrolandpregnon-design/emmanuelrolandpregnon-design.github.io
- Site : https://emmanuelrolandpregnon-design.github.io/

## Ajouter un projet

Ouvre `projects.json`. Copie un objet dans `projects` et remplis les champs.

```json
{
  "id": "mon-projet",
  "title": "Nom du projet",
  "year": "2026",
  "role": "Ton rôle",
  "tag": "Marque",
  "status": "En cours",
  "summary": "Une phrase claire.",
  "points": ["Ce qui a été fait", "Le résultat"],
  "link": "https://...",
  "featured": false
}
```

Tags utiles : `Édition`, `Marque`, `Web`, `IA`. Le champ `tag` sert aussi de filtre.

Pour le mail de contact, remplis `profile.email`.

## Publier

Chaque push sur `main` met le site à jour. Si la page n'est pas encore en ligne : **Settings → Pages → Build and deployment → Source : GitHub Actions**.

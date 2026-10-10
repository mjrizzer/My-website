# Mayukh Jairaj — personal portfolio

A responsive, buildless portfolio with project summaries, social links, a portrait, reduced-motion support, and an accessible visitor rating dialog.

## Preview

Run `python -m http.server 8080 --directory dist` and open http://localhost:8080.

## Content

Edit `dist/index.html`, `dist/style.css`, and `dist/app.js`. The portrait is in `dist/assets/profile.jpeg`. Project summaries are based on the public repository descriptions at https://github.com/mjrizzer.

Ratings are stored only in the visitor's browser. No ratings are sent to the owner. Exit intent and the footer invite feedback; browsers cannot reliably display a custom dialog during tab closure.

Education, experience, skills, and participation are based on details supplied by Mayukh. `dist/resume.html` provides an editable, printable A4 résumé; browser edits last only while the page remains open. Use the HTML source for lasting edits.

## Hosting

The static publish directory is `dist`. No dependencies or build step are required.

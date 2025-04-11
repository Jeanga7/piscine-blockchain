const express = require('express')
const app = express()
const port = 3001

app.use(express.static(__dirname)) // Sert tous les fichiers du dossier courant

app.listen(port, () => {
  console.log(`Serveur en cours sur http://localhost:${port}`)
})

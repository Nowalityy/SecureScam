# SecureScam Lab

Application de demo volontairement vulnerable pour s'entrainer aux tests de securite.

## Failles volontairement presentes

### A01:2025 - Broken Access Control
- Endpoint: `GET /api/admin`
- Probleme: endpoint admin accessible sans authentification ni autorisation.
- Exploitation (demo):
  - Acceder a `/api/admin` et constater l'acces a des donnees sensibles.
  - Impact: divulgation d'informations et actions privilegiees possibles.

### A02:2025 - Security Misconfiguration
- Endpoint: `GET /api/debug`
- Probleme: endpoint de debug public, fuite d'informations via `process.env` + CORS permissif (`*`).
- Exploitation (demo):
  - Acceder a `/api/debug` et observer les variables d'environnement et infos runtime.
  - Noter que n'importe quel site peut lire la reponse a cause du CORS permissif.
  - Impact: fuite de secrets (cles API, URL de base de donnees, etc.) et pivot vers d'autres services.

### A03:2025 - Software Supply Chain Failures
- Emplacement: `app/layout.tsx`
- Probleme: chargement d'un script tiers depuis un CDN avec version `latest` et sans SRI.
- Exploitation (demo):
  - Risque de compromission si le package CDN est modifie ou detourne.
  - Impact: execution de code non prevu dans le navigateur de tous les utilisateurs.

### A04:2025 - Cryptographic Failures
- Endpoint: `GET /api/crypto`
- Probleme: crypto faible et mal utilisee (hash MD5 + chiffrement AES-ECB + cle hardcodee).
- Exploitation (demo):
  - Observer les sorties `md5` et `ecb` et la cle exposee.
  - Impact: integrite et confidentialite brisees (hash collision possible, chiffrement deterministe).

### A06:2025 - Insecure Design
- Endpoint: `POST /api/design`
- Probleme: workflow de reset de mot de passe concu de maniere insecurisee.
  - Token previsible
  - Pas d'expiration
  - Pas de rate-limit
- Exploitation (demo):
  - Demander un token pour un email donne.
  - Reproduire le token (previsible) et le reutiliser.
  - Impact: reinitialisation non autorisee d'un compte.

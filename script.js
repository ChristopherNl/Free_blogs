// Durée de validité du choix : 6 mois (en millisecondes)
const SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000; // ~15 552 000 000 ms

// Clés utilisées dans le localStorage
const KEY_CHOICE = "cookieChoice";
const KEY_DATE = "cookieChoiceDate";

// Vérifie si un choix valide existe encore
function hasValidChoice() {
	const choice = localStorage.getItem(KEY_CHOICE);
	const dateStr = localStorage.getItem(KEY_DATE);

	// Pas de choix ou pas de date → invalide
	if (!choice || !dateStr) return false;

	const choiceDate = parseInt(dateStr, 10);
	const now = Date.now();

	// Si le choix date de plus de 6 mois → on le considère expiré
	if (now - choiceDate > SIX_MONTHS_MS) {
		// On nettoie pour repartir proprement
		localStorage.removeItem(KEY_CHOICE);
		localStorage.removeItem(KEY_DATE);
		return false;
	}

	return true;
}

// Enregistre un choix avec la date du jour
function saveChoice(value) {
	localStorage.setItem(KEY_CHOICE, value);
	localStorage.setItem(KEY_DATE, Date.now().toString());
}

// --- Logique d'affichage du bandeau ---

if (!hasValidChoice()) {
	document.getElementById("cookie-banner").style.display = "block";
}

// Clic sur "Tout accepter"
document.getElementById("cookie-accept").addEventListener("click", function () {
	saveChoice("accepted");
	document.getElementById("cookie-banner").style.display = "none";
	// Ici, tu pourras plus tard activer des scripts de mesure d'audience
});

// Clic sur "Tout refuser"
document.getElementById("cookie-refuse").addEventListener("click", function () {
	saveChoice("refused");
	document.getElementById("cookie-banner").style.display = "none";
	// Aucun script non-essentiel n'est chargé
});

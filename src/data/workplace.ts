export async function getAllWorkplaces() {
  try {
    console.log('Fetching workplaces...'); // Ajoute un log pour indiquer le début de la récupération des lieux de travail
    const response = await fetch('/api/post/get'); 
    console.log('Response:', response); // Ajoute un log pour afficher la réponse de la requête
    if (response.ok) {
      const data = await response.json();
      console.log('Workplaces data:', data); // Ajoute un log pour afficher les données récupérées
      return data;
    } else {
      throw new Error('Error fetching workplaces:' + response.statusText);
    }
  } catch (error: any) { 
    console.error('Error fetching workplaces:', error.message); // Ajoute un log pour afficher les erreurs
    throw new Error('Error fetching workplaces:' + error.message);
  }
}
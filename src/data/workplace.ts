export async function getAllWorkplaces() {
  try {
    console.log('Fetching workplaces...');
    const response = await fetch('/api/post/get'); 
    console.log('Response:', response); 
    if (response.ok) {
      const data = await response.json();
      console.log('Workplaces data:', data);
      return data;
    } else {
      throw new Error('Error fetching workplaces:' + response.statusText);
    }
  } catch (error: any) { 
    console.error('Error fetching workplaces:', error.message); 
    throw new Error('Error fetching workplaces:' + error.message);
  }
}
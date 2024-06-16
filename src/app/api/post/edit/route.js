

export  async function GET(req, res) {
  try {
    console.log('test'); 

   
    return res.status(200).json({ message: 'Test successful' });
  } catch (error) {
    console.error('Error in API:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

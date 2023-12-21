import axios from 'axios';
import jwtMiddleware from './JwtMiddleware';


function MyComponent() {
  const apiUrl = '/login';

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'x-access-token': 'your-token',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
}

export default MyComponent;
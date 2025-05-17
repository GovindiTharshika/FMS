import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ServerCount() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/api/servers/count')
      .then(response => setTotal(response.data.total))
      .catch(error => console.error('Error fetching server count:', error));
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold">Total Servers</h2>
      <p className="text-3xl text-blue-600 mt-2">{total}</p>
    </div>
  );
}

export default ServerCount;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ILog } from '../../shared/interface/IVehicle';

const Upload = () => {
  const { id } = useParams();
  const [data, setData] = useState<ILog>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/get_log/${id}`);
        if (res.ok) {
          const data = await res.json();
          setData(data);
        } else {
          console.error('GET request failed.');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (data)
    return (
      <div className='upload-container'>
        <div className='d-flex flex-column header'>
          <p>Make: {data.make}</p>
          <p>Model: {data.model}</p>
          <p>Badge: {data.badge}</p>
        </div>
        <p className='heading'>Logbook:</p>
        <pre>{data.content}</pre>
      </div>
    );
};

export default Upload;

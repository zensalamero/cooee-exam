import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DropDown } from '../../components';
import { IMake, IModel, IBadge } from '../../shared/interface/IVehicle';
import { useNavigate } from 'react-router-dom';

export interface IVehicle {
  make_id?: number;
  model_id?: number;
  badge_id?: number;
}

const Form = () => {
  const _initialValue = {
    make_id: 0,
    model_id: 0,
    badge_id: 0,
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<IVehicle>(_initialValue);
  const [makeList, setMakeList] = useState<IMake[]>([]);
  const [modelList, setModelList] = useState<IModel[]>([]);
  const [badgeList, setBadgeList] = useState<IBadge[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setSelectedFileName(file.name);
      reader.onload = (e) => {
        if (e.target) {
          setSelectedFile(e.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    async function getMake() {
      try {
        const res = await fetch('/get_makes');
        const result = await res.json();
        setMakeList(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMake();
  }, []);

  const getModels = async (id: string) => {
    try {
      const res = await fetch(`/get_models/${id}`);
      const result = await res.json();
      setModelList(result.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getBadges = async (id: string) => {
    try {
      const res = await fetch(`/get_badges/${id}`);
      const result = await res.json();
      setBadgeList(result.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (field: keyof IVehicle, value: string | undefined) => {
    if (value) {
      let newVehicle = { ...vehicle };
      if (field === 'make_id') {
        getModels(value);
        newVehicle = { ...newVehicle, model_id: 0, badge_id: 0 };
      } else if (field === 'model_id') {
        getBadges(value);
        newVehicle = { ...newVehicle, badge_id: 0 };
      } else {
        newVehicle = { ...newVehicle };
      }
      setVehicle({ ...newVehicle, [field]: value });
    }
  };

  const handleUpload = () => {
    if (selectedFile && vehicle.badge_id) {
      fetch('/upload_file', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: selectedFile,
          file_name: selectedFileName,
          badge_id: vehicle.badge_id,
        }),
      })
        .then((response) => setSelectedFile(null))
        .then((data) => {
          navigate(`/upload/${vehicle.badge_id}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handlePresetVehicle = (
    make_id: number,
    model_id: number,
    badge_id: number
  ) => {
    getModels(`${make_id}`);
    getBadges(`${model_id}`);
    setVehicle({ make_id, model_id, badge_id });
  };

  useEffect(() => {
    if (vehicle.badge_id) {
      async function file_check() {
        try {
          const res = await fetch(`/file_check/${vehicle.badge_id}`);
          if (res.ok) {
            const data = await res.json();
            setSelectedFile(data.fileContent);
            setSelectedFileName(data.fileName);
          } else {
            console.error('GET request failed.');
          }
        } catch (error) {
          console.log(error);
        }
      }
      file_check();
    }
  }, [vehicle.badge_id]);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <React.Fragment>
      <h1 className='text-info'>Vehicle Selection Form</h1>
      <div className='form-container'>
        <DropDown
          name={'make'}
          options={makeList}
          vehicle={vehicle}
          onChange={handleChange}
        />
        {modelList.length ? (
          <DropDown
            name={'model'}
            options={modelList}
            vehicle={vehicle}
            onChange={handleChange}
          />
        ) : (
          <React.Fragment />
        )}
        {badgeList.length ? (
          <DropDown
            name={'badge'}
            options={badgeList}
            vehicle={vehicle}
            onChange={handleChange}
          />
        ) : (
          <React.Fragment />
        )}
        {vehicle.badge_id ? (
          <div className='logbook-container w-100'>
            <h3>Upload Logbook</h3>
            <div className='d-flex gap-2' style={{ alignItems: 'center' }}>
              <input
                type='file'
                ref={fileInputRef}
                accept='.txt'
                onChange={(e) => handleFileChange(e)}
                className='d-none'
              />
              <button onClick={() => handleFileButtonClick()}>
                Choose file
              </button>
              <label htmlFor='fileInput' style={{ cursor: 'pointer' }}>
                {selectedFileName ? selectedFileName : 'No file chosen'}
              </label>
            </div>
            <button onClick={() => handleUpload()}>Upload</button>
          </div>
        ) : (
          <React.Fragment />
        )}
        <h3 className='w-100'>Select A Vehicle</h3>
        <button onClick={() => handlePresetVehicle(3, 7, 16)} className='w-100'>
          Tesla Model 3 Performance
        </button>
        <button onClick={() => handlePresetVehicle(2, 4, 9)} className='w-100'>
          BMW 130d xDrive 26d
        </button>
      </div>
    </React.Fragment>
  );
};

export default Form;

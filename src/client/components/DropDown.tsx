import * as React from 'react';
import { IVehicle } from '../pages/Form/Form';

type Props = {
  name: 'badge' | 'make' | 'model';
  options: any[];
  vehicle: IVehicle;
  onChange: (field: keyof IVehicle, value: string | undefined) => void;
};

const DropDown: React.FC<Props> = ({ name, options, vehicle, onChange }) => {
  const field =
    name === 'badge' ? 'badge_id' : name === 'make' ? 'make_id' : 'model_id';
  const handleChange = (e: React.ChangeEvent<{}>) => {
    onChange(field, (e.target as HTMLSelectElement).value);
  };

  return (
    <select
      id={name}
      name={name}
      className='dropdown'
      value={vehicle[field]}
      onChange={handleChange}
      disabled={options.length === 0}
    >
      <option key={0} value={0} disabled>
        {name}
      </option>
      {options.length > 0 ? (
        options.map((i) => (
          <option key={i.id} value={i.id}>
            {i.name}
          </option>
        ))
      ) : (
        <option value={`default-${name}`}>{`Select ${name}`}</option>
      )}
    </select>
  );
};

export default DropDown;

import {useState} from "react";
import {BsSearch} from "react-icons/bs";

// TODO Should be changed when using redux
const options = [
    { value: 'all', label: 'All' },
    { value: 'underwear', label: 'Underwear' },
    { value: 'shoes', label: 'Shoes' }
  ];

const SearchBar = () => {
    const [selected, setSelected] = useState(options[0].value)
    const handleChange = (event:any) => {
        console.log(event.target.value);
        setSelected(event.target.value);
      };
  return (
    <div className="col-span-6">
        <select value={selected} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </select>
    </div>
  );
};

export default SearchBar;

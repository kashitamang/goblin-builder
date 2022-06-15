import { useEffect, useState } from 'react';
// import { useEffect } from 'react';
import './App.css';
import GoblinForm from './GoblinForm';
import GoblinList from './GoblinList';
import Goblin from './Goblin';

function App() {
  /* 
    track: 
      allGoblins, an array of all goblins
      visibleGoblins, a second array of goblins: this one is the filtered version of the above allGoblins array
      goblinFormName, which is how we track the user input for the current name of the goblin in the form
      goblinFormHP, which is how we track the user input for the current HP of the goblin in the form
      goblinFormColor, which is how we track the user input for the current color of the goblin in the form
*/
  const [allGoblins, setAllGoblins] = useState([]);
  const [goblinFormName, setGoblinFormName] = useState('');
  const [goblinFormHP, setGoblinFormHP] = useState('');
  const [goblinFormColor, setGoblinFormColor] = useState('');
  const [filteredGoblins, setAllFilteredGoblins] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  
  useEffect(() => handleFilterGoblins(filterQuery), [filterQuery]);

  function submitGoblin(e) {
    e.preventDefault();
    
    //  on submit, make a new goblin object with a name that comes from the form state, 
    //  an hp that comes from the form state, and a  color that comes from the form state
    const goblin = {
      name: goblinFormName,
      hp: goblinFormHP,
      color: goblinFormColor,
    };

    // update the allGoblins array. 
    // Add the new goblin to the allGoblins array immutably.
    setAllGoblins([...allGoblins, goblin]);
    //  clear out the goblin form state items by setting them to empty strings. 
    // This will cause the form to reset in the UI.
    setGoblinFormName('');
    setGoblinFormHP('');
    setGoblinFormColor('pink');
  }

  function handleDeleteGoblin(name) {
    // find the index of the goblin in allGoblins with this name
    const goblinIndex = allGoblins.findIndex((goblin) => goblin.name === name);
    // use splice to delete the goblin object at this index
    allGoblins.splice(goblinIndex, 1);
    // update the allGoblins array immutably to this new, smaller array
    setAllGoblins([...allGoblins]);
  }

  function handleFilterGoblins(search) {
    // use the filter method to get an array of goblins whose name includes this search argument
    const searchGoblins = allGoblins.filter((goblin) => goblin.name.includes(search));
    // if there is a search argument, set the visible goblins to the filtered goblins
    // if the search argument is undefined, set the visible goblins in state to just be the array of all goblins
    search ? setAllFilteredGoblins(searchGoblins) : setAllFilteredGoblins(allGoblins);
  }

  return (
    <div className="App">
      <div className='current-goblin quarter'>
        <Goblin goblin={{
          name: goblinFormName,
          hp: goblinFormHP,
          color: goblinFormColor }}/>
      </div>
      <div className='goblin-filter quarter'>
        Filter Goblins
        {/* note that handleFilterGoblins is defined upstairs. This is where the allGoblins array gets filtered */}
        <input onChange={(e) => setFilterQuery(e.target.value)} />
      </div>
      <GoblinForm 
        submitGoblin={submitGoblin}
        goblinFormName={goblinFormName}
        setGoblinFormName={setGoblinFormName}
        goblinFormColor={goblinFormColor} 
        setGoblinFormColor={setGoblinFormColor}
        goblinFormHP= {goblinFormHP}
        setGoblinFormHP= {setGoblinFormHP}
      />
      <GoblinList 
        visibleGoblins={filterQuery ? filteredGoblins : allGoblins} // this takes in an array of goblins. 
        //If the filteredGoblins has a length, use that array. Otherwise, use the allGoblins array 
        handleDeleteGoblin={handleDeleteGoblin} // note that the goblin list has access to the ability to delete
      />
    </div>
  );
}

export default App;

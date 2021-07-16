import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowSearch = searchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };
  console.log(searchOption);

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>no result found </div>;
    }

    if (results && results.length > 0) {
      return results[0].show
        ? results.map(item => <div key={item.show.id}>{item.show.name}</div>)
        : results.map(item => (
            <div key={item.person.id}>{item.person.name}</div>
          ));
    }
    return null;
  };

  return (
    <div>
      <MainPageLayout>
        <input
          type="text"
          placeholder="Search Something"
          onChange={onInputChange}
          value={input}
          onKeyDown={onKeyDown}
        />
        <button type="button" onClick={onSearch}>
          Search
        </button>
        {renderResults()}
        <div>
          <label htmlFor="shows-search">
            shows
            <input
              id="shows-search"
              type="radio"
              value="shows"
              checked={isShowSearch}
              onChange={onRadioChange}
            />
          </label>

          <label htmlFor="actors-search">
            Actors
            <input
              id="actors-search"
              type="radio"
              value="people"
              checked={!isShowSearch}
              onChange={onRadioChange}
            />
          </label>
        </div>
      </MainPageLayout>
    </div>
  );
};

export default Home;

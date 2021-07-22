import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from '../components/Home.styled';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';

const Home = () => {
  const [input, setInput] = useLastQuery();
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
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  return (
    <div>
      <MainPageLayout>
        <SearchInput
          type="text"
          placeholder="Search Something"
          onChange={onInputChange}
          value={input}
          onKeyDown={onKeyDown}
        />
        <SearchButtonWrapper>
          <button type="button" onClick={onSearch}>
            Search
          </button>
        </SearchButtonWrapper>

        <RadioInputsWrapper>
          <div>
            <CustomRadio
              label="Shows"
              id="shows-search"
              value="shows"
              checked={isShowSearch}
              onChange={onRadioChange}
            />
          </div>
          <div>
            <CustomRadio
              label="Shows"
              id="actors-search"
              value="people"
              checked={!isShowSearch}
              onChange={onRadioChange}
            />
          </div>
          {renderResults()}
        </RadioInputsWrapper>
      </MainPageLayout>
    </div>
  );
};

export default Home;

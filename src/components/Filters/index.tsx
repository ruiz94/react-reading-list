import { useReadingList } from '@/store';

export const Filters = () => {
  const genres = useReadingList(state => state.genres);
  const updateFilters = useReadingList(state => state.updateFilters);
  const filters = useReadingList(state => state.filters);

  const handleSelect = (value: string) => updateFilters('genre', value);

  return (
    <div>
      <h2>Filters</h2>
      <label
        htmlFor='genre-select'
        className='border-b-2 border-white w-2xs p-2'
      >
        <span>Genre:</span>
        <select
          name=''
          id='genre-select'
          className='text-white'
          onChange={e => handleSelect(e.target.value)}
          value={filters.genre || ''}
        >
          <option value=''>--Choose an option--</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

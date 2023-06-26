import useCountries from '@/app/hooks/useCountries'
import Select from 'react-select'

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}

interface CoutrySelectProps {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

const CoutrySelect: React.FC<CoutrySelectProps> = ({ value, onChange }) => {
  const countries = useCountries()
  const options = countries.getAll

  return (
    <div className="App">
      <Select
        isClearable
        options={options}
        placeholder="Anywhere"
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div
            className="
            flex flex-row items-center gap-3"
          >
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1 ">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg cursor-text',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'grey',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  )
}

export default CoutrySelect

export interface InputProps {
  value: string | number
  onChange: (value: string, event: React.SyntheticEvent) => void
}

const Input: React.FC<InputProps> = ({ value, onChange }) => (
  <div className='input-container'>
    <input
      className='input'
      value={value}
      onChange={event => onChange(event.target.value, event)}
    />
  </div>
)

export default Input

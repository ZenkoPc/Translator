import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  loading?: boolean
  type: SectionType
  onChange: (value: string) => void
  value: string
}

const commonStyles = { border: 0, height: '200px', resize: 'none' }
const getPlaceHolder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir Texto'
  if (loading === true) return 'Cargando'
  return 'Traduccion'
}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
      <Form.Control
        as="textarea"
        autoFocus={type === SectionType.From}
        placeholder={getPlaceHolder({ type, loading })}
        style={styles}
        value={value}
        disabled={type !== SectionType.From}
        onChange={handleChange}
      />
  )
}

import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constans'
import { ArrowIcons, CopyIcon, VoiceIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/Textarea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App () {
  const {
    fromLanguage,
    setFromLanguage,
    setResult,
    setFromText,
    setToLanguage,
    toLanguage,
    interChangeLanguages,
    fromText,
    result,
    loading
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 500)

  useEffect(() => {
    if (debouncedFromText === '') return

    console.log(debouncedFromText)
    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = toLanguage
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h2>Google Translate</h2>

        <Row>
          <Col xs="auto">
            <Stack gap={2}>
              <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
              <TextArea loading={loading} onChange={setFromText} value={fromText} type={SectionType.From} />
            </Stack>
          </Col>
          <Col xs="auto">
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interChangeLanguages}>
              <ArrowIcons />
            </Button>
          </Col>
          <Col xs="auto">
            <Stack gap={2}>
              <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
              <div style={{ position: 'relative' }}>
                <TextArea loading={loading} onChange={setResult} value={result} type={SectionType.To} />
                <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                  <Button
                    variant='link'
                    style={{ position: 'absolute', left: 30, bottom: 0 }}
                    onClick={() => { navigator.clipboard.writeText(result).catch(() => {}) }}
                  >
                    <CopyIcon />
                  </Button>
                  <Button
                    variant='link'
                    style={{ position: 'absolute', left: 0, bottom: 0 }}
                    onClick={handleSpeak}
                  >
                    <VoiceIcon />
                  </Button>
                </div>
              </div>
            </Stack>
          </Col>
        </Row>
    </Container>
  )
}

export default App

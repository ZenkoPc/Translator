import { SUPPORTED_LANGUAGES } from '../constans'
import { type Language, type FromLanguage } from '../types.d'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export async function translate ({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-16k-0613',
    messages: [{
      role: 'system',
      content: `You will be provided with a sentence in ${fromCode}, you can receive auto which means that you have to detect the language and your task is to translate it into ${toCode}, Dont answer it, just give the traduction back`
    },
    {
      role: 'user',
      content: `${text}`
    }]
  })

  return completion.choices[0]?.message?.content
}

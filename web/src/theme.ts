import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Vazirmatn', system-ui, sans-serif" },
        body: { value: "'Vazirmatn', system-ui, sans-serif" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)

import React from 'react'
import { hues } from '@sanity/color'
import { Code, Flex, useTheme_v2 } from '@sanity/ui'
import { useDocumentPane } from 'sanity/structure'

const PAGE_TYPES = [
  { type: 'homePage', slugPrefix: '/' },
  { type: 'projects', slugPrefix: '/projects' },
]

export const PrefixedSlugInput = (props: any) => {
  const documentPane = useDocumentPane()

  // Get the parent document type name (not the field type)
  const parentDocumentType = documentPane.documentType

  const theme = useTheme_v2()
  const isDarkMode = theme.color._dark
  const backgroundColor = isDarkMode ? hues.gray[950].hex : hues.gray[50].hex
  const borderColor = isDarkMode ? hues.gray[800].hex : hues.gray[200].hex

  // Use the default slug input component that Sanity provides
  const DefaultSlugInput = props.renderDefault
  const displayedPrefix = PAGE_TYPES.find(page => page.type === parentDocumentType)?.slugPrefix || '/'

  return (
    <Flex>
      <Flex
        direction="column"
        align="center"
        justify="center"
        paddingX={2}
        style={{
          height: '33px',
          backgroundColor,
          borderLeft: `1px solid ${borderColor}`,
          borderTop: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
          borderTopLeftRadius: '3px',
          borderBottomLeftRadius: '3px',
        }}
      >
        <Code size={1} muted>
          {displayedPrefix}
        </Code>
      </Flex>
      <div style={{ flex: 1, transform: 'translateX(-2px)' }}>
        <DefaultSlugInput {...props} />
      </div>
    </Flex>
  )
}


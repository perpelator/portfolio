# Updated Contentful Setup Guide

## Content Types to Create in Contentful

### 1. Skill Content Type
- **Content Type ID**: `skill`
- **Fields**:
  - `name` (Short text) - Required
  - `category` (Short text) - Required
  - `icon` (Short text) - Required (URL to SVG or image file, e.g., https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/python.svg)

### 2. Project Content Type
- **Content Type ID**: `project`
- **Fields**:
  - `title` (Short text) - Required
  - `description` (Rich text) - Required
  - `technologies` (Short text, List) - Required
  - `image` (Media) - Required
  - `githubUrl` (Short text) - Required
  - `liveUrl` (Short text) - Required
  - `featured` (Boolean) - Required

### 3. Experience Content Type
- **Content Type ID**: `experience`
- **Fields**:
  - `jobTitle` (Short text) - Required
  - `company` (Short text) - Required
  - `location` (Short text) - Required
  - `startDate` (Date) - Required
  - `endDate` (Date) - Optional
  - `current` (Boolean) - Required
  - `description` (Rich text) - Required
  - `achievements` (Short text, List) - Optional
  - `technologies` (Short text, List) - Optional
  - `companyLogo` (Media) - Optional

### 4. Education Content Type
- **Content Type ID**: `education`
- **Fields**:
  - `degree` (Short text) - Required
  - `institution` (Short text) - Required
  - `location` (Short text) - Required
  - `startDate` (Date) - Required
  - `endDate` (Date) - Optional
  - `current` (Boolean) - Required
  - `description` (Rich text) - Required
  - `gpa` (Short text) - Optional
  - `achievements` (Short text, List) - Optional
  - `coursework` (Short text, List) - Optional
  - `institutionLogo` (Media) - Optional

### 5. About Content Type
- **Content Type ID**: `about`
- **Fields**:
  - `name` (Short text) - Required
  - `title` (Short text) - Required
  - `bio` (Rich text) - Required
  - `yearsExperience` (Integer) - Required
  - `projectsCompleted` (Integer) - Required
  - `profileImage` (Media) - Required
  - `resumeUrl` (Media) - Optional (Upload your resume PDF file directly to Contentful)
  - `switcher` (Short text, List) - Required (Dynamic text phrases, e.g., "building scalable applications", "solving complex problems")

### 6. Contact Content Type
- **Content Type ID**: `contact`
- **Fields**:
  - `email` (Short text) - Required
  - `linkedin` (Short text) - Required
  - `github` (Short text) - Required
  - `location` (Short text) - Required

## Rich Text Configuration

For rich text fields (`bio`, `description` in experience, education, and projects), configure with these allowed marks and node types:

### Allowed Marks:
- `bold` - **Bold text**
- `italic` - *Italic text*
- `underline` - Underlined text
- `code` - `Inline code snippets`
- `strikethrough` - ~~Strikethrough text~~

### Allowed Node Types:
- `heading-1` through `heading-6` - Headers for content structure
- `ordered-list` and `unordered-list` - Lists for organizing information
- `hr` - Horizontal rules for section breaks
- `blockquote` - Quotes for emphasis
- `hyperlink` - External links
- `embedded-entry-block` - Block entries
- `table` - Tables for structured data
- `asset-hyperlink` - Links to assets
- `embedded-entry-inline` - Inline entries
- `entry-hyperlink` - Links to other entries

### Example Rich Text JSON Configuration:
```json
{
  "id": "bio",
  "name": "Bio", 
  "type": "RichText",
  "localized": false,
  "required": true,
  "validations": [
    {
      "enabledMarks": [
        "bold",
        "italic", 
        "underline",
        "code",
        "strikethrough"
      ]
    },
    {
      "enabledNodeTypes": [
        "heading-1",
        "heading-2", 
        "heading-3",
        "heading-4",
        "heading-5",
        "heading-6",
        "ordered-list",
        "unordered-list",
        "hr",
        "blockquote",
        "embedded-entry-block",
        "table",
        "asset-hyperlink",
        "embedded-entry-inline", 
        "entry-hyperlink",
        "hyperlink"
      ]
    }
  ]
}
```

## Rich Text Features

The portfolio now supports rich text formatting with:

- **Typography**: Bold, italic, underline, strikethrough, and inline code
- **Structure**: Headers (H1-H6), paragraphs, lists, and horizontal rules
- **Links**: External URLs, entry references, and asset links
- **Content**: Blockquotes, tables, and embedded entries
- **Styling**: Custom CSS classes for dark theme compatibility

## Installation

Make sure to install the required dependencies:

```bash
npm install @contentful/rich-text-react-renderer @contentful/rich-text-types
```

## Environment Variables Required
- `CONTENTFUL_SPACE_ID`: Your Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN`: Your Contentful delivery API access token

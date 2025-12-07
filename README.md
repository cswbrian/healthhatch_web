# HealthHatch Bilingual Blog

A bilingual blog website (Traditional Chinese Hong Kong / English) built with Hugo, Decap CMS, and Tailwind CSS, designed to be hosted on Cloudflare Pages for free.

## Features

- ✅ Bilingual support (Traditional Chinese Hong Kong as default, English as secondary)
- ✅ Ananke theme with Tailwind CSS support
- ✅ No-code blog post creation with images via Decap CMS
- ✅ No-code page content updates
- ✅ Free hosting on Cloudflare Pages
- ✅ Git-based content management
- ✅ Web-based CMS interface accessible at `/admin/`

## Technology Stack

- **Static Site Generator**: Hugo
- **CMS**: Decap CMS (formerly Netlify CMS)
- **Theme**: Ananke
- **Styling**: Tailwind CSS
- **Hosting**: Cloudflare Pages (free tier)
- **Version Control**: Git/GitHub

## Prerequisites

- Hugo installed (version 0.146.0 or higher)
- Node.js and npm (for Tailwind CSS)
- Git
- GitHub account (for CMS authentication)
- Cloudflare account (for hosting)

## Local Development Setup

### 1. Install Dependencies

```bash
# Install Node.js dependencies for Tailwind CSS
npm install
```

### 2. Build Tailwind CSS

```bash
# Build CSS for production
npm run build:css

# Or watch for changes during development
npm run watch:css
```

### 3. Run Hugo Server

```bash
# Start Hugo development server
hugo server

# Or with drafts included
hugo server -D
```

The site will be available at `http://localhost:1313`

### 4. Access CMS Locally

To test the CMS locally, you'll need to run a local proxy server. Decap CMS requires authentication which works best when deployed. For local testing, you can use:

```bash
npx netlify-cms-proxy-server
```

Then access the CMS at `http://localhost:1313/admin/`

## Project Structure

```
healthhatch_web/
├── archetypes/          # Content templates
│   ├── posts.md        # Blog post template
│   └── pages.md        # Page template
├── assets/
│   └── css/
│       └── input.css   # Tailwind CSS input file
├── content/
│   ├── zh-hk/          # Traditional Chinese (Hong Kong) - DEFAULT
│   │   ├── posts/      # Traditional Chinese blog posts
│   │   └── pages/      # Traditional Chinese static pages
│   └── en/
│       ├── posts/      # English blog posts
│       └── pages/      # English static pages
├── i18n/               # Translation files
│   └── zh-HK.toml      # Traditional Chinese translations
├── layouts/            # Custom layout overrides
│   └── partials/
│       └── head-additions.html  # Tailwind CSS inclusion
├── static/
│   ├── admin/          # Decap CMS files
│   │   ├── index.html  # CMS interface
│   │   └── config.yml  # CMS configuration
│   ├── images/
│   │   └── uploads/    # CMS-uploaded images
│   └── _headers        # Cloudflare Pages headers
├── themes/
│   └── ananke/         # Ananke theme
├── hugo.toml           # Hugo configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── package.json        # Node.js dependencies
└── README.md           # This file
```

## Creating Content

### Using Hugo CLI

#### Create a new blog post (Traditional Chinese):

```bash
hugo new posts/my-post.md --contentDir content/zh-hk
```

#### Create a new blog post (English):

```bash
hugo new posts/my-post.md --contentDir content/en
```

#### Create a new page:

```bash
hugo new pages/about.md --contentDir content/zh-hk
```

### Using Decap CMS

1. Deploy your site to Cloudflare Pages
2. Navigate to `https://your-domain.com/admin/`
3. Log in with your GitHub account
4. Select the collection you want to edit:
   - **文章 (繁體中文)** - Traditional Chinese blog posts
   - **Posts (English)** - English blog posts
   - **頁面 (繁體中文)** - Traditional Chinese pages
   - **Pages (English)** - English pages
5. Click "New [Collection]" to create new content
6. Fill in the form fields and upload images as needed
7. Click "Publish" to save and commit to your repository

## Content Management Guide for Non-Technical Users

### Accessing the CMS

1. Go to your website URL: `https://your-domain.com/admin/`
2. Click "Log in with GitHub"
3. Authorize the application
4. You'll see the CMS dashboard

### Creating a Blog Post

1. Click on **"文章 (繁體中文)"** for Traditional Chinese or **"Posts (English)"** for English
2. Click **"New 文章"** or **"New Post"**
3. Fill in the form:
   - **標題 / Title**: Enter the post title
   - **發布日期 / Publish Date**: Select the date and time
   - **描述 / Description**: Write a short description (appears in search results)
   - **精選圖片 / Featured Image**: Click to upload an image
   - **標籤 / Tags**: Add tags (press Enter after each tag)
   - **分類 / Categories**: Add categories (press Enter after each)
   - **作者 / Author**: Enter author name
   - **草稿 / Draft**: Uncheck to publish immediately, or leave checked to save as draft
   - **內容 / Body**: Write your post content using Markdown
4. Click **"Publish"** to save

### Editing a Page

1. Click on **"頁面 (繁體中文)"** or **"Pages (English)"**
2. Click on an existing page to edit, or click **"New 頁面"** / **"New Page"** to create
3. Fill in the form similar to blog posts
4. Click **"Publish"** to save

### Uploading Images

1. In the **精選圖片 / Featured Image** field, click the image icon
2. Click **"Choose an image"**
3. Select an image from your computer
4. The image will be uploaded and the path will be filled in automatically

You can also add images in the content body using Markdown:
```markdown
![Image description](/images/uploads/your-image.jpg)
```

### Markdown Basics

The content editor uses Markdown. Here are some basics:

- **Bold**: `**text**` → **text**
- **Italic**: `*text*` → *text*
- **Heading**: `## Heading` → Large heading
- **Link**: `[Link text](https://url.com)` → [Link text](https://url.com)
- **Image**: `![Alt text](/images/uploads/image.jpg)`
- **List**: 
  ```
  - Item 1
  - Item 2
  ```

## Deployment to Cloudflare Pages

See [cloudflare-pages.md](cloudflare-pages.md) for detailed deployment instructions.

### Quick Steps:

1. Push your code to a GitHub repository
2. In Cloudflare Dashboard, go to Pages
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Configure build settings:
   - **Framework preset**: Hugo
   - **Build command**: `hugo`
   - **Build output directory**: `public`
6. Add environment variables (see cloudflare-pages.md)
7. Click "Save and Deploy"

## Customization

### Tailwind CSS

The project is set up with Tailwind CSS. To customize:

1. Edit `assets/css/input.css` to add custom styles
2. Run `npm run build:css` to compile
3. The compiled CSS is in `static/css/main.css`

### Theme Customization

Since the Ananke theme is installed directly (not as a submodule), you can:

1. Edit files in `themes/ananke/` directly
2. Override layouts by copying files from `themes/ananke/layouts/` to `layouts/`
3. Customize CSS in the theme's assets or use Tailwind CSS

### Language Configuration

Edit `hugo.toml` to modify:
- Default language
- Language names
- Menu items
- Site metadata

## Troubleshooting

### CMS Not Loading

- Verify GitHub OAuth is configured correctly
- Check that environment variables are set in Cloudflare Pages
- Ensure callback URL matches your domain

### Images Not Displaying

- Verify images are uploaded to `static/images/uploads/`
- Check image paths in content files
- Ensure images are committed to the repository

### Build Failures

- Check Hugo version compatibility
- Verify all required directories exist
- Check for syntax errors in configuration files

### Local Development Issues

- Run `hugo server -D` to include draft content
- Clear Hugo cache: `rm -rf resources/_gen`
- Rebuild Tailwind CSS: `npm run build:css`

## Support

For issues or questions:
- Hugo Documentation: https://gohugo.io/documentation/
- Decap CMS Documentation: https://decapcms.org/docs/
- Ananke Theme: https://github.com/theNewDynamic/gohugo-theme-ananke

## License

[Add your license here]

# Trigger deployment

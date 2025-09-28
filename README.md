# FRC Team 5409 - The Chargers Documentation

Comprehensive programming documentation for FRC Team 5409 - The Chargers. This repository contains detailed guides for robot programming, data logging, simulation, and development methodologies.

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/chargersrobotics/5409-docs.git
cd 5409-docs

# Install dependencies
npm install

# Start development server
npx docusaurus start
```

The documentation site will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

Built files will be in the `build` directory.

## 📚 Documentation Structure

- **Robot Documentation** - Hardware specs, software architecture, and development insights for each robot
- **Data Logging** - AdvantageKit implementation, IO layer patterns, and debugging strategies  
- **Simulation** - MapleSim integration, AdvantageScope usage, and simulation best practices
- **Examples** - Code snippets and syntax demonstrations

## 🛠️ Contributing

### Writing Documentation

1. Create a new branch for your changes
2. Write your documentation in Markdown format
3. Follow our style guide:
   - Use descriptive titles and headers
   - Include code examples where relevant
   - Add warning/tip/note admonitions for important information
   - Test all links and ensure images load properly

### Code Examples

When adding Java code examples:
- Use proper syntax highlighting with ```java` blocks
- Include relevant imports and class structure
- Add comments explaining complex logic
- Verify code compiles and follows team standards

### Submitting Changes

1. Test your changes locally with `npx docusaurus start`
2. Build the site with `npm run build` to check for errors
3. Submit a pull request with a clear description of changes
4. Request review from team programming leads

## 🔧 Technical Details

### Built With
- [Docusaurus 3](https://docusaurus.io/) - Documentation platform
- [Prism](https://prismjs.com/) - Syntax highlighting
- [React](https://reactjs.org/) - UI framework

### Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Custom Styling

Custom CSS is in `src/css/custom.css`. This includes:
- Enhanced Java syntax highlighting
- Team color scheme
- Improved code block styling
- Better spacing for admonitions

## 📖 Writing Guide

### Markdown Syntax

This documentation supports standard Markdown plus Docusaurus extensions:

```markdown
# Main Title
## Section Title
### Subsection Title

**Bold text** and *italic text*

- Bullet points
1. Numbered lists

[Link text](https://example.com)

![Image alt text](./path/to/image.png)

`inline code`

```java
// Code block with syntax highlighting
public class Example {
    public void method() {
        System.out.println("Hello World");
    }
}
```

:::tip
This is a tip admonition
:::

:::warning  
This is a warning admonition
:::

:::note
This is a note admonition  
:::
```

### File Organization

- Keep related documentation in the same folder
- Use descriptive filenames
- Include `sidebar_position` in frontmatter to control order
- Add proper frontmatter with `id`, `title`, and `sidebar_position`

### Images and Assets

- Store images in `static/img/`
- Use relative paths: `![Description](./../../static/img/image.png)`
- Optimize images for web (reasonable file sizes)
- Include descriptive alt text

## 🤝 Team Guidelines

### Code Standards

- Follow WPILib coding conventions
- Include proper JavaDoc comments
- Use meaningful variable and method names
- Keep examples concise but complete

### Documentation Standards

- Write for your future self and new team members
- Explain the "why" not just the "what"
- Include troubleshooting tips
- Update documentation when code changes

## 📞 Support

For questions about this documentation:
- Create an issue in this repository
- Ask in the team programming channel
- Contact programming leads

---

**Team 5409 - The Chargers** | [Website](https://chargersrobotics.hdsb.ca) | [The Blue Alliance](https://www.thebluealliance.com/team/5409)

// function to generate markdown for README
function generateMarkdown(data) {
  var markdown = 
  `# ${data.title} ${data.badge}\n
## Description\n
${data.description}\n
## Table of Contents\n
* [Installation](#installation)
* [Usage](#usage)
* [Contributions](#contributions)
* [Testing](#testing)
* [Credits](#credits)\n`
if(data.deployed)
{
  markdown += `* [Deployed Link](#Deployed)\n`
}
markdown +=
`* [License](#license)\n
## Installation
${data.install}\n
## Usage
${data.information}\n
## Contributions
${data.guidelines}\n
## Testing
${data.instructions}\n
## Credits
GitHub: https://www.github.com/${data.username}\n
Email: ${data.email}\n`

if(data.deployed)
{
  markdown += 
  `## Deployed  
  ${data.deployed}\n`
}
markdown +=
`## License
${data.license}`

return markdown;
}

module.exports = generateMarkdown;

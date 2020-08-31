// =========== Const Section ===========
const INQUIRER = require("inquirer");
const FS = require("fs");
const MARKDOWN = require("./assets/utils/generateMarkdown")
// ========== END Const ==================

function Question(type, message, name, choices)
{
    this.type = type;
    this.message = message;
    this.name = name;
    this.choices = choices;
}

// array of questions for user
const questions = [
    new Question("input","Enter a title:","title"),
    new Question("input","Enter a description:","description"),
    new Question("input","Enter installation instructions: ","install"),
    new Question("input","Enter usage information:","information"),
    new Question("input","Enter contribution guidelines:","guidelines"),
    new Question("input","Enter test instructions: ","instructions"),
    new Question("input","Enter github username:","username"),
    new Question("input","Enter deployed link(optional, leave blank):","deployed"),
    new Question("input","Enter email address:","email"),
    new Question("list","Select a licence:","license",["MIT", "GNU General Public v3.0", "ISC", "Apache 2.0" ]),
];

// function to write README file
function writeToFile(fileName, data) 
{
    // Make sure folder exists first
    if (!FS.existsSync("./output")) {
        FS.mkdirSync("./output")
    }

    // Write to file, console if there is an error
    FS.writeFile(fileName, MARKDOWN(data), function(error) 
    {
        if(error) console.log(error);
    });
}

// function to initialize program
function init() 
{

    INQUIRER.prompt(questions).then(answers => 
        {
            // Recieved input, now we need to change the licence and add a badge
            switch (answers.license) {
                case "MIT":
                    answers.badge = "![MIT License](https://img.shields.io/badge/License-MIT-Green)";
                    answers.license = "MIT License: A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.";
                    break;
                case "GNU General Public v3.0":
                    answers.badge = "![ISC License](https://img.shields.io/badge/License-GNUv3-Green)";
                    answers.license = "GNU General Public License: Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.";
                    break;
                case "ISC":
                    answers.badge = "![ISC License](https://img.shields.io/badge/License-ISC-Green)";
                    answers.license = "ISC License: A permissive license lets people do anything with your code with proper attribution and without warranty. The ISC license is functionally equivalent to the BSD 2-Clause and MIT licenses, removing some language that is no longer necessary.";
                    break;
                case "Apache 2.0":
                    answers.badge = "![ISC License](https://img.shields.io/badge/License-Apache-Green)";
                    answers.license = "Apache 2.0 License: A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.";
                    break;
            }

            // Data should now be ready to send off to write to file
            writeToFile("output/README.md", answers)

            console.log(answers);
        });

}

// function call to initialize program
init();

const core = require('@actions/core');
const jmes = require('jmespath')
const fs = require('fs')

try {
    // `who-to-greet` input defined in action metadata file
    const inputFilePath = core.getInput('inputFile');
    const filterString = core.getInput('filter');

    const inputFile = fs.readFileSync(inputFilePath);

    const inputJson = JSON.parse(inputFile);

    // Remove null values
    const filteredIncludes = jmes.search(inputJson, filterString).filter(function(e){return e});
    const filteredIncludesAsString = JSON.stringify(filteredIncludes);

    const outputString = `{"include":${filteredIncludesAsString}}`
    core.setOutput("matrix", outputString);
} catch (error) {
    core.setFailed(error.message);
}

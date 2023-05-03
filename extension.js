// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function getHtmlTagDecorationType() {
	const decorationType = vscode.window.createTextEditorDecorationType({
	  backgroundColor: '#ffa500'
	});
	return decorationType;
  }
function activate(context) {

	let highlightHtmlTag = vscode.commands.registerCommand('template-highlighter.helloWorld', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
		  return;
		}
		const selection = editor.selection;
		const document = editor.document;
	
		const range = new vscode.Range(selection.start, selection.end);
		const selectedText = document.getText(range);
		const regex =/<([a-zA-Z]+)(?:\s|>)/g;
		let match;
		let tagRanges = [];
		while (match = regex.exec(selectedText)) {
		  const start = selection.start.translate(0, match.index);
		  const end = selection.start.translate(0, match.index + match[0].length - 1);
		  const range = new vscode.Range(start, end);
		  tagRanges.push(range);
		}
		const decorationType = getHtmlTagDecorationType();
		editor.setDecorations(decorationType, tagRanges);
	  });
	  context.subscriptions.push(highlightHtmlTag);











	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "template-highlighter" is now active!');
	

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('template-highlighter.helloWorld', function () {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from Template Highlighter!');
		
	// });

	// context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

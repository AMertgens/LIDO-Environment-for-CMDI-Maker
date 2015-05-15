// allows to debug this environment by adding all the source files
// to cmdi maker instead of build files.
// repo should be available as http source for this to work
// and the correct url_prefix must be given below.
// in cmdi maker, call addFile(<this_file>)
var url_prefix = "http://localhost:878/";

var source_scripts = [
	"src/js/lido_main.js",
	"src/js/lido_generator.js",
	"src/js/lido_forms.js",
	"src/js/lido_1.js",
	"src/js/lido_2.js",
	"src/js/lido_3.js",
	"src/js/lido_4.js",
	"src/js/lido_5.js",
	"src/js/lido_output.js"
];

addFiles(source_scripts, url_prefix);
const syntax = [
	{
		// ( BLA BLA BLA )
		name: "adlib",
		match: /\(.*?\)/g,
		style: 'color: yellow'
	},
	{
		// HO-o-o-o-o-LY    
		name: "drag-vowel-base",
		match: /\S*(_|-|\\)\S*(?!.*)*/gm,
		style: 'color: aqua'
	},
	{
		// -O-O-O-O-
		name: "drag-vowels",
		match: /(_|-|\\)\S*(_|-|\\)/gm,
		style: 'color: limegreen'
	},
	{
		// Every tag thats not "special"  
		name: "generic-tags",
		match: /\[.*?\]/g,
		style: 'color: grey; border: 2px solid white; padding: 1px;'
	},
	{
		// [ ]            
		name: "square-brakets",
		match: /\[|\]/g,
		style: 'color: red'
	},
	{
		// ( )   
		name: "brakets",
		match: /\(|\)/g,
		style: 'color: purple;'
	},
	{
		// _ -           
		name: "dash-underscore",
		match: /-|_/g,
		style: 'color: darkcyan; font-weight: bold'
	},
	{
		// ? . !    
		name: "sentance-terminators",
		match: /\.|\?|\!/g,
		style: 'color: yellow; font-weight: bold'
	},
	{
		// tag digits [verser (1)]     
		name: "tag-digits",
		match: /\d+ ?(?! |\d|\w|$)/gm,
		style: 'color: pink; font-weight: bold'
	},
	{
		// chorus  
		name: "chorus",
		match: /chorus(?! |\d|\w|$)/gmi,
		style: 'color: cyan; font-weight: bold'
	},
	{
		// hook
		name: "hook",
		match: /hook ?\w*? ?(?! |\d|\w|$)/gmi,
		style: 'color: yellowgreen; font-weight: bold'
	},
	{
		// verse   
		name: "verse",
		match: /verse(?!\w|$)/gmi,
		style: 'color: blue; font-weight: bold'
	},
	{
		// intro & outro 
		name: "intro-outro",
		match: /intro|outro(?!\w|$)/gmi,
		style: 'color: yellow; font-weight: bold'
	},
	{
		// ,    
		name: "comma",
		match: /,/gm,
		style: 'color: lightgreen'
	},
	{
		// slang (ex: drinkin', get em') 
		name: "slang",
		match: /\b\w*'(?!s|m).\W*/gmi,
		style: 'color: pink'
	},
	{
		// \     
		name: "backslash",
		match: /\\/g,
		style: 'color: orange; font-weight: bold'
	},
	// TAG MULTIPLIERS
	{
		// 2x      
		name: "double",
		match: /2x(?<=[A-Za-z]*)/gmi,
		style: 'color: pink; font-weight: bold'
	},
	{
		// 3x    
		name: "triple",
		match: /3x(?<=[A-Za-z]*)/gmi,
		style: 'color: deeppink; font-weight: bold'
	},
	{
		// 4x     
		name: "quadruple",
		match: /4x(?<=[A-Za-z]*)/gmi,
		style: 'color: darkorchid; font-weight: bold'
	},
	// -------------------------------------
	{
		// ● ○      
		name: "cadence",
		match: /\○|●/gi,
		style: 'color: orange'
	},
	{
		// ssssssssssssss     
		name: "letter-hiss",
		match: /(.)\1{2,}(?!-|_)/gi,
		style: 'color: orange; font-weight: bold'
	},
];
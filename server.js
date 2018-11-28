var express = require('express')
var app = express()

const excelToJson = require('convert-excel-to-json');
const result = excelToJson({
	sourceFile: 'aaa.xlsx',
	sheets: ['STD FOR Export Intagrate'],
});

app.use(function (req, res, next) { //allow cross origin requests
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
	res.header("Access-Control-Max-Age", "3600");
	res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	next();
});

app.get('/', function (req, res) {
	res.send('Hello World')
})
app.get('/getJson', (req, res) => {
	let data= Convert(result)
	// res.json(result)
		res.json(data)
})

Convert=(result)=>{
	let raw = result['STD FOR Export Intagrate'];
	let mortality=[], weight=[], daily_feed=[], fcr=[], temperature=[], humidity=[], hn3=[], co=[], co2=[], light=[], windspeed=[];
	for(let i =4;i<raw.length;i++){
		let _mortality = {
			"day":raw[i].A,
			"daily":raw[i].B,
			"cum":raw[i].C,
			"alarm":['N/A',raw[i].D]
		}
		let _weight = {
			"day":raw[i].A,
			"st-run":raw[i].E,
			"male":raw[i].F,
			"female":raw[i].G,
			"alarm":[raw[i].H,raw[i].H]
		}
		let _daily_feed = {
			"day":raw[i].A,
			"st-run":raw[i].I,
			"male":raw[i].J,
			"female":raw[i].K,
			"alarm":[raw[i].L,raw[i].L]
		}
		let _fcr = {
			"day":raw[i].A,
			"st-run":raw[i].M,
			"male":raw[i].N,
			"female":raw[i].O,
			"alarm":[raw[i].P,raw[i].P]

		}
		let _temperature = {
			"day":raw[i].A,
			"low":raw[i].Q,
			"high":raw[i].R,
			"alarm":[raw[i].S,raw[i].T]
		}
		let _humidity = {
			"day":raw[i].A,
			"low":raw[i].U,
			"high":raw[i].V,
			"alarm":['N/A',raw[i].W]
		}
		let _hn3 = {
			"day":raw[i].A,
			"low":raw[i].X,
			"high":raw[i].Y,
			"alarm":['N/A',raw[i].Z]
		}
		let _co = {
			"day":raw[i].A,
			"low":raw[i].AA,
			"high":raw[i].AB,
			"alarm":['N/A',raw[i].AC]
		}
		let _co2 = {
			"day":raw[i].A,
			"low":raw[i].AD,
			"high":raw[i].AE,
			"alarm":['N/A',raw[i].AF]
		}
		let _light = {
			"day":raw[i].A,
			"target":raw[i].AK,
			"alarm":[raw[i].AL,raw[i].AL]
		}
		let _windspeed = {
			"day":raw[i].A,
			"low":raw[i].AM,
			"high":raw[i].AN,
			"alarm":[raw[i].AO,'N/A']
		}
		mortality.push(_mortality);
		weight.push(_weight);
		daily_feed.push(_daily_feed);
		fcr.push(_fcr);
		temperature.push(_temperature);
		humidity.push(_humidity);
		hn3.push(_hn3);
		co.push(_co);
		co2.push(_co2);
		light.push(_light);
		windspeed.push(_windspeed);
	}

	let all_data={
		"mortality":mortality,
		"weight":weight,
		"daily_feed":daily_feed,
		"fcr":fcr,
		"temperature":temperature,
		"humidity":humidity,
		"hn3":hn3,
		"co":co,
		"co2":co2,
		"light":light,
		"windspeed":windspeed
	}
	console.log(all_data);
	return all_data;
}
app.listen(3210)
var objectID = require("mongodb").ObjectID;

module.exports = function(app, db) {

	app.post("/notes/", (req,res) => {
		const note = {
			text: req['body']['body'],
			title:req['body']['title']
		}
		db.collection("notes").insert(note, (err, results) =>{
			if(err) {
				res.send({ "error":"An error has occurred."});
			} else {
				res.send(results.ops[0]);
			}
		});
	});

	app.get("/notes/:noteID", (req,res) => {
		const id = req.params.noteID;
		const details = {
			'_id': new objectID(id)
		};
		db.collection("notes").findOne(details, (err, item) => {
			if(err) {
				res.send({ "error":"An error has occurred."});
			} else {
				res.send(item);
			}
		});
	});

	app.put("/notes/:noteID", (req,res) => {
		const id = req.params.noteID;
		const details = {
			'_id': new objectID(id)
		};
		const note = {
			text: req['body']['body'],
			title:req['body']['title']
		}
		db.collection("notes").update(details, note, (err, item) => {
			if(err) {
				res.send({ "error":"An error has occurred."});
			} else {
				res.send(item);
			}
		});
	});

	app.delete("/notes/:noteID", (req,res) => {
		const id = req.params.noteID;
		const details = {
			'_id': new objectID(id)
		};
		db.collection("notes").remove(details, (err, item) => {
			if(err) {
				res.send({ "error":"An error has occurred."});
			} else {
				res.send('Note ' + id + ' deleted.');
			}
		});
	});

};
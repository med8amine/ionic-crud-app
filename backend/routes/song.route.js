const express = require('express');
const app = express();
const songRoute = express.Router();
let SongModel = require('../model/Song');

// Add song
songRoute.route('/create').post(async (req, res) => {
    try {
        const result = await SongModel.create(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all songs
songRoute.route('/').get(async (req, res) => {
    try {
        const results = await SongModel.find({});
        console.log(results);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get single song
songRoute.route('/read/:id').get((req, res) => {
    SongModel.findById(req.params.id).then( (results) => {
        console.log(results);
        res.json(results);
    }).catch((error) => {
        res.json(error);
    });
});

// Update song
songRoute.route('/update/:id').put((req, res, next) => {
    SongModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then((results) => {
        if (updatedDocument) {
            console.log(results);
            res.json(results);
        } else {
          console.log('Document not found');
        }
    }).catch((error) => {
        res.json(error);
    });
});

// Delete song
songRoute.route('/delete/:id').delete((req, res, next) => {
    SongModel.findByIdAndDelete(req.params.id).then((results) => {
        if (!results) {
            res.status(404).json({ message: "Song not found" });
        }
        
        res.json({ message: "Song deleted successfully", deletedSong });
    }).catch((error) => {
        res.json(error);
    });
});

module.exports = songRoute
const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'faac69c290a8411fa5dcdc6d64fe7a51'
   });
const handleApiCall= (req,res) =>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data =>{
        res.json(data)
    })
    .catch(err => Response.status(400))
}

const handleImage = (req,res,db)=>{
    const { id } = req.body;
    let found = false;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0])
    })
    .catch(err=> res.status(400).json('Somethings wrong'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
  };

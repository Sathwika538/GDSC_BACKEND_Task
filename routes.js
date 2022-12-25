const express = require("express")
const formModel = require("./models/formModel")

const router = express.Router();
router.post("/", (req, res,next) => {
	
	let data = {
	 name: req.body.name,
	 rollno: req.body.rollno,
	 gender:req.body.gender,
	 dob:req.body.dob,
	}
	
	formModel.create(data)
	.then((x)=>{
		req.flash('message','Successfully Submitted');
		res.redirect('/');
		
	})
	.catch((err)=>{
		console.log(err);
	})

  }) 

  router.put('/edit/:id',(req,res)=>{
	let requiredName = req.params.id;
	formModel.updateOne({name:requiredName},{
		$set:{
			name: req.body.name,
	 		rollno: req.body.rollno,
	 		gender:req.body.gender,
	 		dob:req.body.dob,
		}
	}
		)
	.then((x)=>{
		res.redirect('/alldata');
	})
	.catch((err)=>{
		console.log(err);
	})
  })

  router.delete('/delete/:id',(req,res)=>{
	let requiredName = req.params.id;
	formModel.deleteOne({name:requiredName})
	.then((x)=>{
		res.redirect('/alldata');
	})
	.catch((err)=>{
		console.log(err);
	})
  })

  router.get("/edit/:id",(req,res)=>{
	let requiredName = req.params.id;
	formModel.findOne({name:requiredName})
	.then((x)=>{
        res.render('pages/edit',{x});
	})
	.catch((err)=>{
		console.log(err);
	})
  })

  
  router.get('/alldata',(req,res,next)=>{
	formModel.find({})
	.then((data)=>{
		res.render('pages/showdata', {records : data});
	}).catch((err)=>{
		console.log(err);
	})
  })

  

  router.get("/",  (req, res,next)=> {
		res.render('pages/index',{message:req.flash('message')});
  });

module.exports = router
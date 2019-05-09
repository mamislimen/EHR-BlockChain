
var express = require('express');

var router = express.Router();
var DecisionTree = require('decision-tree');



router.post('/obesite',function(req,res,next){


    var training_data=[
       
     {"height":"1.7","weight":"50","sick":-1},
        {"height":"1.7","weight":"70","sick":0},
        {"height":"1.8","weight":"60","sick":-1},
        {"height":"1.76","weight":"100","sick":1},
        {"height":"1.80","weight":"120","sick":1},
        {"height":"1.76","weight":"100","sick":1},
        {"height":"1.5","weight":"80","sick":1},
        {"height":"1.66","weight":"70","sick":0},
        {"height":"1.66","weight":"100","sick":1},
        {"height":"1.66","weight":"200","sick":1},
        {"height":"1.66","weight":"90","sick":1},
        {"height":"1.7","weight":"90","sick":1},
        {"height":"1.5","weight":"50","sick":0},
        {"height":"1.7","weight":"100","sick":1},
        {"height":"1.66","weight":"90","sick":1},
        {"height":"1.7","weight":"50","sick":-1},
        {"height":"1.5","weight":"50","sick":0},
        {"height":"1.7","weight":"50","sick":-1},
        {"height":"1.8","weight":"80","sick":0},
        {"height":"1.7","weight":"30","sick":-1},
        {"height":"1.5","weight":"45","sick":-1},
        {"height":"1.7","weight":"50","sick":-1},
        {"height":"1.8","weight":"50","sick":-1},
        {"height":"1.66","weight":"40","sick":-1},
        {"height":"1.66","weight":"30","sick":-1},
        {"height":"1.50","weight":"35","sick":-1},
        {"height":"1.50","weight":"30","sick":-1},
        {"height":"1.66","weight":"50","sick":0},
        {"height":"1.60","weight":"50","sick":0},
        {"height":"1.66","weight":"10","sick":-1},
        {"height":"1.68","weight":"50","sick":0},
        {"height":"1.66","weight":"66","sick":0},
        {"height":"1.7","weight":"60","sick":0},
        {"height":"1.8","weight":"100","sick":1},
        {"height":"1.7","weight":"50","sick":-1},
        {"height":"1.8","weight":"80","sick":0},
        {"height":"1.7","weight":"50","sick":-1},
        {"height":"1.5","weight":"35","sick":-1},
        {"height":"1.7","weight":"50","sick":-1},
        {"height":"1.8","weight":"88","sick":0}
    ];
    var class_name = "sick";
    var features = ["height", "weight"];

    var dt = new DecisionTree(training_data, class_name, features);
    
    var conseil;
    var docteur;
   
    var predicted= dt.predict({
                height: req.body.height,
                weight: req.body.weight,
                
            });
        if(predicted == 0 ){
        conseil = "vous êtes en bonne santé" ;
        res.send({"Resultat":predicted,"Conseils":conseil,docteur:false}); 
        }  
        if(predicted == 1 ){
            if(req.body.chronicDiseasess.length > 0){
            req.body.chronicDiseasess.forEach(element => {
                if(element.name == "coeur"){
                    conseil = "vous être un peu obése consultez un docteur"
                    docteur = true;
                }else{
                    conseil = "vous être un peu obése Faire du sport"
                    docteur = false;
                }
                
            });
          
       
            //conseil = "vous être un peu obése" ;
           
            res.send({"Resultat":predicted,"Conseils":conseil,"docteur":docteur});
            
        } else{
            conseil = "vous être un peu obése vu qu'il y a pas de test dans ton dossier vous devez consulter un docteur";
            docteur:true;
            res.send({"Resultat":predicted,"Conseils":conseil,"docteur":true});
        }}

        if(predicted == -1 ){
            docteur:true;
                conseil = "vous être un peu mince voici nos conseils selon votre dossier médical" ;
               
                
                    res.send({"Resultat":predicted,"Conseils":conseil,"docteur":true});

              
        }   

    
    

   


})
module.exports = router;
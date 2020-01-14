const express = require('express');
const {Data} = require('./data')
const router = express.Router();
const sequelize = require('sequelize');
const Op = sequelize.Op;
router.route("/data/").get((req,res)=>{
    const {page,size,searchWord="",sortOn="id",sortType="ASC"} = req.query;
 
    let query = {
        [Op.or]:[
            {
                university: {
                    [Op.like] : "%"+searchWord+"%"
                }
            },
            {
                prof: {
                    [Op.like] : "%"+searchWord+"%"
                }
            },
            {
                doc: {
                    [Op.like] : "%"+searchWord+"%"
                }
            },
         
        ]
           
        };
               
    
    res.setHeader('Content-Type', 'application/json');
    Data.findAll({
        limit: +size,
        offset: (+page)*(+size),
        where : query,
        order: [
            [sortOn,sortType]
        ]
    }).then(u =>{
       Data.findAll({
           where : query
       }).then(c =>{
           res.send(JSON.stringify(
            {
                rows: u,
                items: c.length
            }
           ));
           
       })
    })

});

router.route("/stat/:grouper/:counter").get((req,res)=>{
    const {grouper,counter} = req.params;
    res.setHeader('Content-Type', 'application/json');
    Data.findAll({
        attributes: [grouper,[sequelize.fn('count',sequelize.col(counter)),'count']],
        group: [grouper],
        //raw:true
    }).then(d=>{
        res.send(JSON.stringify(d));
    })
});


router.route("/names").get((req,res)=>{
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(
    [
    'id',
    'Наименование на ВУ/ филиал/ основно звено',
    'шифър на проф. направление',
    'Наименование на професионалното направление',
    'Наименование на докторската програма',
    'Вид процедура',
    'Статус на процедурата',
    'Акредитационна оценка',
    'Дата, до която е валидна акредитацията']))
   
})


module.exports = router;
const express=require('express');
const app=express();
const router=express.Router();
// var arr_obj=[{name:'abhi', age:23, location:'tvm'},{name:'annin',age:23,location:'ern'}];
const fs=require('fs');
app.use(express.json());


function display() {
    try {
        // Read the JSON file synchronously
        const data = fs.readFileSync('details.json', 'utf-8');  // Correct file name
        
        // Parse the JSON string into an object and return it
        return JSON.parse(data);
    } catch (err) {
        // If there's an error (like file not found), log the error and return null or a fallback value
        console.error('Error reading or parsing file:', err);
        return ('File not found!!!');  // You can return an empty object or array if you prefer
    }
}

function postData(newData){
    try {
        const file=fs.readFileSync('details.json','utf-8');
        const existingData=fs.existsSync('details.json')?JSON.parse(file):{};
        const mergedData=Object.assign(existingData,newData);
        fs.writeFileSync('details.json',JSON.stringify(mergedData),'utf-8');
        return 'Data merged and saved successfully!!';
    }

    catch(err){
        console.error('Error writing to file:',err);
        return 'Write Failed!!';
    }
        
    

}



router.post('/display',(req,res)=>{
    const getData=display();
    res.json(getData);

})

router.put('/edit',(req,res)=>{
    const postData=postData(req.body);
    res.send(postData);
})

router.put('/edit', (req, res) => {
    console.log('Received request:', req.body);  // Log request body
    const result = postData(req.body);
    res.send(result);
});


router.get('/hospital',(req,res)=>{

})

router.delete('/delete',(req,res)=>{

})

module.exports=router
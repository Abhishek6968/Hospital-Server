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

function addData(newData) {
    try {
        const file = fs.readFileSync('details.json', 'utf-8');
        const existingData = fs.existsSync('details.json') ? JSON.parse(file) :{};

        if (typeof existingData === 'object') {
            // Use a unique identifier (e.g., id or name) as the key
            if (newData.id) {
                existingData[newData.id] = newData;  // Add new data as key-value pair
            } else {
                return 'New data must contain an "id" field';
            }
        } else {
            return 'Data format in file is not valid for key-value storage';
        }


        fs.writeFileSync('details.json', JSON.stringify(existingData), 'utf-8');
        return 'New data added successfully!';
    } catch (err) {
        console.error('Error writing to file:', err);
        return 'Write Failed!';
    }
}

function deleteData(id) {
    try {
        const file = fs.readFileSync('details.json', 'utf-8');
        const existingData = fs.existsSync('details.json') ? JSON.parse(file) : {};

        // Check if the id exists in the existing data
        if (existingData[id]) {
            delete existingData[id];  // Remove the entry
            fs.writeFileSync('details.json', JSON.stringify(existingData, null, 2), 'utf-8');
            return `Data with ID ${id} has been deleted successfully!`;
        } else {
            return `No data found with ID ${id}.`;
        }
    } catch (err) {
        console.error('Error writing to file:', err);
        return 'Delete Failed!';
    }
}



router.post('/details',(req,res)=>{
    const newData = req.body; 
    const result = addData(newData); 
    res.send(result); 

})

router.put('/edit',(req,res)=>{
    const result=postData(req.body);
    res.send(result);
});


router.get('/hospital',(req,res)=>{
    const getData=display();
    res.json(getData);

})

router.delete('/delete',(req,res)=>{
    const id = req.params.id;  // Get the ID from the URL parameters
    const result = deleteData(id);  // Call the delete function
    res.send(result);  // Send the result back to the client
})

module.exports=router
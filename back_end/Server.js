const express= require('express')
const app = express()
const app2=express();
const port = 3000;

const cors = require('cors');
const jwt=require('jsonwebtoken')

const axios = require('axios');  
const fs = require("fs");
app.use(express.json()); 

app.use(cors());

SECRET_KEY="athma18"



app.get('/' ,(req,res)=>{
    res.send("hello world")
})

const dbFile = "db.json"; 

const CountryFile="country.json";
const packagefile="packages.json";
const bookingFile = "bookings.json";
const getData = () => {
  return JSON.parse(fs.readFileSync(dbFile, "utf-8"));
  
};

 const getCountryData = () => {
  return JSON.parse(fs.readFileSync(CountryFile, "utf-8"));
} 

const getPackages=()=>{
  return JSON.parse(fs.readFileSync(packagefile, "utf-8"));

}

  
app.get("/users", (req, res) => {
  const data = getData();
  res.json(data.users); 
});






app.post("/login",async(req,res)=>{
  const {email,password,userType}=req.body;

   try{
     const response=await axios.get("http://localhost:3000/users")
     const users=response.data;

     const user=users.find(u=>u.email ===email && u.password === password && u.userType===userType );
     if(user){
      const token=jwt.sign({id:user.id,email:user.email,password:user.password,role:user.userType},SECRET_KEY);
      res.status(201).json({token, role:user.userType, message: "Login successful" });

     }
     else{
      res.status(401).json({message:"invalid email,password or username"});

     }
   }
   catch(error){
    res.status(400).json({error:error.message,message:"server error"})

   }
  
})


app.post("/register", async (req, res) => {
  const { username ,email, password } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const users = getData().users;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      console.log("User already exists:", email);

      return res.status(400).json({ message: "User already exists. Please log in." });
    }

    const newUser = {
      id: users.length + 1,
      username:username,
      email:email,
      password:password,
      userType: "traveller"
    };

    users.push(newUser);

    fs.writeFileSync(dbFile, JSON.stringify({ users }, null, 2));
    console.log("User registered successfully:", newUser); 

    res.status(201).json({ message: "Registration successful.Please log in" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


app.get("/countries", (req, res) => {
  const searchTerm = req.query.q?.toLowerCase() ;  
  console.log(searchTerm);
  if (!searchTerm) {
    return res.json([]);  
  }
  const allCountries = getCountryData();
  console.log("Fetched Countries:", allCountries);
 

  const countries = allCountries;

 

  const filtered = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm)
  );


  res.json(filtered);
});


app.get("/country-details", (req, res) => {
  const data = getCountryData();
  res.json(data); 

});

app.post("/packages", async (req, res) => {
  try {
    const { page , limit, destination, type, price, duration } = req.body;

    const skip = (page - 1) * limit;
    console.log(page);


    let allPackages = getPackages();

    if (destination) {
      allPackages = allPackages.filter(pkg =>
        pkg.country.toLowerCase()===destination.toLowerCase()
      );
    }

    if (type) {
      allPackages = allPackages.filter(pkg =>
        pkg.type.toLowerCase() === type.toLowerCase()
      );
    }

    if (price) {
      const [min, max] = price.includes('+') 
        ? [parseInt(price.replace('+', '')), Infinity]
        : price.split('-').map(Number);

      allPackages = allPackages.filter(pkg => {
        const p = parseFloat(pkg.amount);
        return p >= min && p <= max;
      });
    }
    if (duration) {
      const [min, max] = duration.includes('+')
        ? [parseInt(duration.replace('+', '')), Infinity]
        : duration.split('-').map(Number);

      allPackages = allPackages.filter(pkg => {
        const d = parseInt(pkg.numberOfDays);
        return d >= min && d <= max;
      });
    }

    const paginatedPackages = allPackages.slice(skip, skip + limit);

    res.status(200).json(paginatedPackages);

  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

app.get('/packages/:id', (req, res) => {
  console.log(req.params.id);
  TravelPackage=getPackages();
  //console.log("sjdhhd",TravelPackage);
  try {
      const packageItem =  TravelPackage.find(pkg => pkg.packageId == req.params.id);
      console.log("hjhuj",packageItem);
      if (!packageItem) return res.status(404).json({ message: 'Package not found' });
      res.json(packageItem);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.post('/bookings', (req, res) => {
  const bookingData = req.body;
  console.log('Booking Received:', bookingData);

  let bookings = [];
  if (fs.existsSync(bookingFile)) {
    const fileContent = fs.readFileSync(bookingFile, 'utf-8');
    if (fileContent.trim()) {
      
        bookings = JSON.parse(fileContent);
      
    }

  }

  bookings.push(bookingData);
  fs.writeFileSync(bookingFile, JSON.stringify(bookings, null, 2));
  res.status(200).json({ message: 'Booking received successfully!', data: bookingData });
});

app.get('/bookings', (req, res) => {
  if (!fs.existsSync(bookingFile)) {
    return res.json([]);
  }

  const bookings = JSON.parse(fs.readFileSync(bookingFile, 'utf-8'));
  res.json(bookings);
});



app.listen(port,()=>{

    console.log(`app listening on port ${3000}`);
     
});





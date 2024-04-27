import { createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://rzeyacnujlqgcolnwrzn.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6ZXlhY251amxxZ2NvbG53cnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTc1NzgsImV4cCI6MjAyODkzMzU3OH0.t1U-EPEVIAT7pgm0hukuPTrSqbT21FMaDX62QxuRg70');

const button2 = document.getElementById("vehiclesubmit");

async function vehiclesubmit(){
    const tempplate = document.getElementById("plate").value;
    const { data, error } = await supabase
    .from('Vehicles')
    .select('*, People(Name)')
    .ilike('VehicleID','%'+tempplate+'%');
    console.log(data);
    if(!(tempplate)){
        document.getElementById("message").innerHTML = "Error" ;
        document.getElementById("output").innerHTML = "";
    }
    else if(data.length != 0){
        for(let x = 0; x < data.length; x++) {
            document.getElementById("message").innerHTML = "Search Successful" ;
            document.getElementById("output").innerHTML += "VehicleID: "+data[x].VehicleID + "<br>" + "Make: " +data[x].Make+"<br>" + "Model: " + data[x].Model + "<br>" + "Colour: "+data[x].Colour + "<br>" + "Name: " + data[x].People.Name + "<br><br>";
        }
    }
    else{
        document.getElementById("message").innerHTML = "Not found" ;
        document.getElementById("output").innerHTML = "";
    }
}

button2.addEventListener("click", vehiclesubmit);
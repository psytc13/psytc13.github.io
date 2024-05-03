import { createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://rzeyacnujlqgcolnwrzn.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6ZXlhY251amxxZ2NvbG53cnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTc1NzgsImV4cCI6MjAyODkzMzU3OH0.t1U-EPEVIAT7pgm0hukuPTrSqbT21FMaDX62QxuRg70');

const button2 = document.getElementById("vehiclesubmit");

async function vehiclesubmit(){
    const tempplate = document.getElementById("rego").value;
    const { data, error } = await supabase
    .from('Vehicles')
    .select('*, People(Name)')
    .ilike('VehicleID','%'+tempplate+'%');
    if(!(tempplate)){
        document.getElementById("message").innerHTML = "Error" ;
        document.getElementById("results").innerHTML = "";
    }
    else if(data.length != 0){
        document.getElementById("results").innerHTML = "";
        for(let x = 0; x < data.length; x++) {
            if(data[x].OwnerID == null){
                document.getElementById("message").innerHTML = "Search successful" ;
                document.getElementById("results").innerHTML += "<div>VehicleID: "+data[x].VehicleID + "<br>" + "Make: " +data[x].Make+"<br>" + "Model: " + data[x].Model + "<br>" + "Colour: "+data[x].Colour + "<br>" + "Name: No Owner " + "</div><br><br>";
            }
            else{
                document.getElementById("message").innerHTML = "Search successful" ;
                document.getElementById("results").innerHTML += "<div>VehicleID: "+data[x].VehicleID + "<br>" + "Make: " +data[x].Make+"<br>" + "Model: " + data[x].Model + "<br>" + "Colour: "+data[x].Colour + "<br>" + "Name: " + data[x].People.Name + "</div><br><br>";
            }
        }
    }
    else{
        document.getElementById("message").innerHTML = "No result found" ;
        document.getElementById("results").innerHTML = "";
    }
}

button2.addEventListener("click", vehiclesubmit);
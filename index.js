 import { createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://rzeyacnujlqgcolnwrzn.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6ZXlhY251amxxZ2NvbG53cnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTc1NzgsImV4cCI6MjAyODkzMzU3OH0.t1U-EPEVIAT7pgm0hukuPTrSqbT21FMaDX62QxuRg70');

const button = document.getElementById("peoplesubmit");

async function peoplesubmit(){
    const tempname = document.getElementById("name").value;
    const templic = document.getElementById("license").value;
    if(tempname && templic){
        document.getElementById("message").innerHTML = "Error" ;
        document.getElementById("output").innerHTML = "";
    }
    else if(tempname){
        const { data, error } = await supabase
        .from('People')
        .select()
        .ilike('Name','%'+tempname+'%');
        if(data.length != 0){
            for(let x = 0; x < data.length; x++) {
                document.getElementById("message").innerHTML = "Search Successful" ;
                document.getElementById("output").innerHTML += "Name: "+data[x].Name + "<br>" + "Address: " +data[x].Address+"<br>" + "DOB: " + data[x].DOB + "<br>" + "LicenseNumber: "+data[x].LicenseNumber + "<br>" + "ExpiryDate: " + data[x].ExpiryDate + "<br><br>";
            }
        }
        else{
            document.getElementById("message").innerHTML = "Not found" ;
            document.getElementById("output").innerHTML = "";
        }
    }

    else if(templic){
        const { data, error } = await supabase
        .from('People')
        .select()
        .ilike('LicenseNumber','%'+templic+'%');  
        if(data.length != 0){
            for(let x = 0; x < data.length; x++) {
                document.getElementById("message").innerHTML = "Search Successful" ;
                document.getElementById("output").innerHTML += "Name: "+data[x].Name + "<br>" + "Address: " +data[x].Address+"<br>" + "DOB: " + data[x].DOB + "<br>" + "LicenseNumber: "+data[x].LicenseNumber + "<br>" + "ExpiryDate: " + data[x].ExpiryDate + "<br><br>";
            }
        }
        else{
            document.getElementById("message").innerHTML = "Not found" ;
            document.getElementById("output").innerHTML = "";
        }
    }
}

button.addEventListener("click", peoplesubmit);

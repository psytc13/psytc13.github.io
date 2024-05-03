import { createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://rzeyacnujlqgcolnwrzn.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6ZXlhY251amxxZ2NvbG53cnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTc1NzgsImV4cCI6MjAyODkzMzU3OH0.t1U-EPEVIAT7pgm0hukuPTrSqbT21FMaDX62QxuRg70');

const button3 = document.getElementById("addsubmit");

async function addsubmit(){
    const tempreg = document.getElementById("rego").value;
    const tempmake = document.getElementById("make").value;
    const tempmod = document.getElementById("model").value;    
    const tempcol = document.getElementById("colour").value;
    const tempown = document.getElementById("owner").value;
    if(tempreg && tempmake && tempmod && tempcol && tempown){
        const { data, error } = await supabase
        .from('People')
        .select()
        .ilike('Name','%'+tempown+'%');
        if (data.length != 0){
            const { error } = await supabase.from('Vehicles')
            .insert({VehicleID: tempreg, Make: tempmake, Model: tempmod, Colour: tempcol, OwnerID: data[0].PersonID});
            document.getElementById("message").innerHTML = "Vehicle added successfully";
            document.getElementById("output").innerHTML = "";
        }
        else{
            document.getElementById("output").innerHTML = '<label for="personid">PersonID</label>'+
            '<input type="text" id="personid" name="personid"><br><br>'+
            '<label for="name">Name</label>'+
            '<input type="text" id="name" name="name"><br><br>'+
            '<label for="address">Address</label>'+
            '<input type="text" id="address" name="address"><br><br>'+
            '<label for="dob">DOB</label>'+
            '<input type="text" id="dob" name="dob"><br><br>'+
            '<label for="license">License</label>'+
            '<input type="text" id="license" name="license"><br><br>'+
            '<label for="expire">Expire</label>'+
            '<input type="text" id="expire" name="expire"><br><br>'+
            '<button id="addowner">Add owner</button>' ;
            document.getElementById("message").innerHTML = "";
            const button4 = document.getElementById("addowner");

            async function addowner(){
                const tempid = document.getElementById("personid").value;
                const tempname = document.getElementById("name").value;
                const tempadd = document.getElementById("address").value;    
                const tempdob = document.getElementById("dob").value;
                const templic = document.getElementById("license").value;
                const tempexp = document.getElementById("expire").value;
                if(tempid && tempname && tempadd && tempdob && templic && tempexp){
                    const { error2 } = await supabase.from('People')
                    .insert({PersonID: tempid, Name: tempname, Address: tempadd, DOB: tempdob, LicenseNumber: templic, ExpiryDate: tempexp});
                    document.getElementById("message").innerHTML = "Vehicle added successfully";
                    const { error } = await supabase.from('Vehicles')
                    .insert({VehicleID: tempreg, Make: tempmake, Model: tempmod, Colour: tempcol, OwnerID: tempid});
                }

                else{
                    document.getElementById("message").innerHTML = "Error" ;
                    document.getElementById("output").innerHTML = "";
                    document.getElementById("results").innerHTML = "";
                }
            }

            button4.addEventListener("click", addowner);
        }
    }
    else{
        document.getElementById("message").innerHTML = "Error" ;
        document.getElementById("results").innerHTML = "";
    }
}

button3.addEventListener("click", addsubmit);

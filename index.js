 import { createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://rzeyacnujlqgcolnwrzn.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6ZXlhY251amxxZ2NvbG53cnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTc1NzgsImV4cCI6MjAyODkzMzU3OH0.t1U-EPEVIAT7pgm0hukuPTrSqbT21FMaDX62QxuRg70');

const button = document.getElementById("peoplesubmit");

async function peoplesubmit(){
    const tempname = document.getElementById("name").value;
    const templic = document.getElementById("license").value;
    const { data, error } = await supabase
    .from('People')
    .select()
    .ilike('Name','%'+tempname+'%'); 
    console.log(data);
}

button.addEventListener("click", peoplesubmit);

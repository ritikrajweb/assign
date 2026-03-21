// --- 1. SUPABASE CONFIGURATION ---
const SUPABASE_URL = 'https://jqxbbnypkvnvyscylsty.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxeGJibnlwa3ZudnlzY3lsc3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMTY0NTIsImV4cCI6MjA4OTU5MjQ1Mn0.877h8uS66QjehLvMwx3rEsZG8N_XdK1pqPHiF5YKchU';

// Using 'supabaseClient' to prevent naming collisions with the external library
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- 2. THE 8 ETHNOGRAPHIES & GOOGLE DRIVE LINKS ---
const ethnographies = [
    { title: "The Todas by A. Walker (1986)", link: "https://drive.google.com/file/d/1v6r4huD0UBEWn0hjIy3dhECJ73o32SYK/view?usp=sharing" },
    { title: "The Muria and their Ghotul by Verrier Elwin (1992)", link: "https://drive.google.com/file/d/1u4sJZcHYeCNjbmqj4lvDSQ_vfkApgAmx/view?usp=sharing" },
    { title: "Argonauts of the Western Pacific by M. Malinowski (1992)", link: "https://drive.google.com/file/d/1GNn4d2hjlcLodsHJuF92GcvV5NipBFiw/view?usp=sharing" },
    { title: "The Naked Nagas by C.V. Furer-Haimendorf (1939)", link: "https://drive.google.com/file/d/1Yekszf_4t8dhGV7jCzcR3vLodsAhOgqf/view?usp=sharing" },
    { title: "The Neur by E.E. Evans-Pritchard (1940)", link: "https://drive.google.com/file/d/1FPb8HVxen40em3b5W6jt7_hJgHVZDPeq/view?usp=sharing" },
    { title: "Affairs of Tribes by D.N. Majumdar (1950)", link: "https://drive.google.com/file/d/1RWDb5phGz_lrTu3oe-msLnyQ8MgFLlfH/view?usp=sharing" },
    { title: "Indian Village by S. C. Dube (1955)", link: "https://drive.google.com/file/d/1pDvbkzMT_SykIIIDKZdlvdgnDvGYooU9/view?usp=sharing" },
    { title: "Hindus of the Himalayas by G.D. Berreman (1963)", link: "https://drive.google.com/file/d/1hZEcrdLKjbI9Upb9jfb3QpRvq1_NRkzQ/view?usp=sharing" }
];

// --- 3. HARDCODED STUDENT DATABASE ---
const studentDB = {
    // B.A. Students
    "Y24120001": { name: "ANSHUL TAMRAKAR", course: "B.A.", books: [0, 1] }, "Y24120002": { name: "KHUSHVEER SINGH SURYAVANSHI", course: "B.A.", books: [0, 2] },
    "Y24120003": { name: "SHREYASHI JAIN", course: "B.A.", books: [0, 3] }, "Y24120041": { name: "VIJAY KUMAR", course: "B.A.", books: [0, 4] },
    "Y24120060": { name: "AARYA GOANTIYA", course: "B.A.", books: [1, 7] }, "Y24120061": { name: "ANIYA PARTE", course: "B.A.", books: [0, 6] },
    "Y24120062": { name: "SATYAM SEN", course: "B.A.", books: [2, 4] }, "Y24120087": { name: "AGRATI AGRAWAL", course: "B.A.", books: [1, 2] },
    "Y24120088": { name: "SHUBHAM CHOUBEY", course: "B.A.", books: [1, 7] }, "Y24120116": { name: "HARSH LODHI", course: "B.A.", books: [6, 7] },
    "Y24120127": { name: "RITIK RAJ", course: "B.A.", books: [1, 6] }, "Y24120129": { name: "BOBI RAJA", course: "B.A.", books: [2, 4] },
    "Y24120150": { name: "JAYA RAIKWAR", course: "B.A.", books: [1, 7] }, "Y24120151": { name: "KUNDAN RAJAK", course: "B.A.", books: [2, 3] },
    "Y24120152": { name: "VINAY SINGH THAKUR", course: "B.A.", books: [2, 4] }, "Y24120184": { name: "BHARTESHU GRAY", course: "B.A.", books: [2, 5] },
    "Y24120185": { name: "RAGINI GOUND", course: "B.A.", books: [2, 6] }, "Y24120187": { name: "RAMPAL SINGH THAKUR", course: "B.A.", books: [2, 7] },
    "Y24120188": { name: "SHREYA THAKUR", course: "B.A.", books: [3, 4] }, "Y24120203": { name: "ABHISHEK YADAV", course: "B.A.", books: [3, 5] },
    "Y24120204": { name: "ADITYA SINGH", course: "B.A.", books: [3, 6] }, "Y24120205": { name: "AVINASH AHIRWAR", course: "B.A.", books: [3, 7] },
    "Y24120206": { name: "HARSH KHANGAR", course: "B.A.", books: [4, 5] }, "Y24120207": { name: "KRISH YADAV", course: "B.A.", books: [4, 6] },
    "Y24120244": { name: "ARJUN PATEL", course: "B.A.", books: [4, 7] }, "Y24120245": { name: "DEEPAK SANJAY MUNDHE", course: "B.A.", books: [5, 6] },
    "Y24120246": { name: "NANCY PANDEY", course: "B.A.", books: [6, 7] }, "Y24120260": { name: "AYUSH AHIRWAR", course: "B.A.", books: [5, 6] },
    "Y24120261": { name: "NEERAJ YADAV", course: "B.A.", books: [0, 1] }, "Y24120280": { name: "ADITYA VINODIYA", course: "B.A.", books: [0, 2] },
    "Y24120282": { name: "RIMJHIM SONI", course: "B.A.", books: [1, 6] }, "Y24120283": { name: "SHIVANSHU MISHRA", course: "B.A.", books: [0, 7] },
    "Y24120293": { name: "ABHI YADAV", course: "B.A.", books: [0, 5] }, "Y24120294": { name: "ADITYA TIWARI", course: "B.A.", books: [0, 7] },
    "Y24120296": { name: "KRASHITA PANDEY", course: "B.A.", books: [0, 7] }, "Y24120298": { name: "PRIYANSH SHRIVASTAVA", course: "B.A.", books: [1, 2] },
    "Y24120325": { name: "KRISHNA RAIKWAR", course: "B.A.", books: [1, 3] }, "Y24120333": { name: "AYUSHI SURYAVANSHI", course: "B.A.", books: [1, 4] },
    "Y24120334": { name: "KHUSHI AHIRWAR", course: "B.A.", books: [1, 5] }, "Y24120337": { name: "SHUBHAM AHIRWAR", course: "B.A.", books: [1, 6] },
    "Y24120339": { name: "ASHISH KUMAR", course: "B.A.", books: [0, 1] }, "Y24120355": { name: "KULDEEP YADAV", course: "B.A.", books: [2, 3] },
    "Y24120356": { name: "NEETESH DANGI", course: "B.A.", books: [2, 4] }, "Y24120393": { name: "NANCY JAIN", course: "B.A.", books: [2, 5] },
    "Y24120395": { name: "MEENAKSHI SEN", course: "B.A.", books: [2, 6] }, "Y24120449": { name: "HARSH YADAV", course: "B.A.", books: [2, 4] },
    "Y24120526": { name: "RISHITA YADAV", course: "B.A.", books: [3, 4] }, "Y24120547": { name: "NIHAL KAROSIA", course: "B.A.", books: [3, 5] },
    "Y24120548": { name: "SOMIL KAROSIYA", course: "B.A.", books: [3, 6] }, "Y24120549": { name: "VINAY KUMAR YADAV", course: "B.A.", books: [3, 7] },
    "Y24120553": { name: "KHUSHI YADAV", course: "B.A.", books: [4, 5] }, "Y24120554": { name: "PRATHMESH AHIRWAR", course: "B.A.", books: [4, 6] },
    "Y24120555": { name: "UDIT NAMDEV", course: "B.A.", books: [4, 7] }, "Y24120556": { name: "VAISHALI SEN", course: "B.A.", books: [5, 6] },
    "Y24120594": { name: "SOURABH SINGH LODHI", course: "B.A.", books: [5, 7] }, "Y24120599": { name: "KHUSHI SONI", course: "B.A.", books: [6, 7] },
    "Y24120600": { name: "MUKESH PRAJAPATI", course: "B.A.", books: [0, 1] }, "Y24120607": { name: "JIYA SEN", course: "B.A.", books: [0, 2] },
    "Y24120618": { name: "ANSHIKA SIROTHIYA", course: "B.A.", books: [0, 7] }, "Y24120621": { name: "APRAJITA PATHAK", course: "B.A.", books: [0, 4] },
    "Y24120634": { name: "PUNEET SEN", course: "B.A.", books: [0, 5] }, "Y24120640": { name: "PRINCI JAIN", course: "B.A.", books: [0, 1] },
    "Y24120641": { name: "VIVEK AHIRWAR", course: "B.A.", books: [0, 4] }, "Y24120646": { name: "ANJLEE YADAV", course: "B.A.", books: [1, 2] },
    "Y24120647": { name: "APOORVA THAKUR", course: "B.A.", books: [1, 3] }, "Y24120657": { name: "AMAN KUMAR MARAVI", course: "B.A.", books: [1, 4] },
    "Y24120659": { name: "SHIVANSH VISHWAKARMA", course: "B.A.", books: [1, 5] }, "Y24120661": { name: "SIMRAN BEE", course: "B.A.", books: [1, 4] },
    "Y24120664": { name: "HARSH SEN", course: "B.A.", books: [1, 7] }, "Y24120665": { name: "PRATEEK NEGI", course: "B.A.", books: [2, 3] },
    "Y24120678": { name: "JIYA DUBEY", course: "B.A.", books: [0, 1] }, "Y24120691": { name: "KHUSHBOO AHIRWAR", course: "B.A.", books: [0, 1] },
    "Y24120692": { name: "JAYANT SEN", course: "B.A.", books: [2, 6] }, "Y24120697": { name: "JIGYASHA SHARMA", course: "B.A.", books: [2, 7] },
    "Y24130025": { name: "RAKSHA SINGH", course: "B.A.", books: [1, 6] }, "Y24130066": { name: "AASHIYA RANGREJ", course: "B.A.", books: [3, 5] },
    "Y24130071": { name: "AMAN GHARU", course: "B.A.", books: [3, 6] },
    
    // B.Sc. Students
    "Y24102001": { name: "Abhay Chadar", course: "B.Sc.", books: [3, 7] }, "Y24102002": { name: "Abhilasha", course: "B.Sc.", books: [4, 5] },
    "Y24102003": { name: "Ajay Shukla", course: "B.Sc.", books: [4, 6] }, "Y24102004": { name: "Anwesha", course: "B.Sc.", books: [4, 7] },
    "Y24102005": { name: "Bharti Kumai", course: "B.Sc.", books: [5, 6] }, "Y24102006": { name: "Bhumika Patel", course: "B.Sc.", books: [5, 7] },
    "Y24102007": { name: "Ghanshyam", course: "B.Sc.", books: [6, 7] }, "Y24102008": { name: "Kanak Singh", course: "B.Sc.", books: [0, 1] },
    "Y24102009": { name: "Karam Lakshana", course: "B.Sc.", books: [0, 2] }, "Y24102010": { name: "Lakhichand Chouhan", course: "B.Sc.", books: [0, 3] },
    "Y24102011": { name: "Lalu Prasad Yadav", course: "B.Sc.", books: [0, 4] }, "Y24102012": { name: "Mahima Kumari Roy", course: "B.Sc.", books: [0, 5] },
    "Y24102013": { name: "Manan Pawar", course: "B.Sc.", books: [0, 6] }, "Y24102014": { name: "Minakshi Kumari", course: "B.Sc.", books: [0, 7] },
    "Y24102015": { name: "Nisha Patel", course: "B.Sc.", books: [1, 2] }, "Y24102016": { name: "Parth Bharadwaj", course: "B.Sc.", books: [1, 3] },
    "Y24102017": { name: "Purvi Jain", course: "B.Sc.", books: [1, 4] }, "Y24102018": { name: "Rakhi Kumari", course: "B.Sc.", books: [1, 5] },
    "Y24102019": { name: "Sahil Patel", course: "B.Sc.", books: [1, 6] }, "Y24102020": { name: "Saloni Dubey", course: "B.Sc.", books: [1, 7] },
    "Y24102021": { name: "Shivani Kirad", course: "B.Sc.", books: [2, 3] }, "Y24102022": { name: "Shrishti Kumari", course: "B.Sc.", books: [2, 4] },
    "Y24102023": { name: "Vaibhav Athya", course: "B.Sc.", books: [2, 5] }, "Y24102024": { name: "Saraswati Dangi", course: "B.Sc.", books: [2, 6] },
    "Y24105001": { name: "Aashutosh Singh Dahiya", course: "B.Sc.", books: [2, 7] }, "Y24105002": { name: "Aastha Tiwari", course: "B.Sc.", books: [3, 7] },
    "Y24105003": { name: "Amayra Gupta", course: "B.Sc.", books: [3, 5] }, "Y24105004": { name: "Anjini Saraf", course: "B.Sc.", books: [3, 6] },
    "Y24105005": { name: "Annya Singh Yadav", course: "B.Sc.", books: [3, 7] }, "Y24105006": { name: "Anushree Shandilya", course: "B.Sc.", books: [4, 5] },
    "Y24105007": { name: "Arushi Yadav", course: "B.Sc.", books: [4, 6] }, "Y24105008": { name: "Ayush Rajesh Singh", course: "B.Sc.", books: [4, 7] },
    "Y24105009": { name: "B P Shyamendra Rao", course: "B.Sc.", books: [5, 6] }, "Y24105010": { name: "Dhanupratap Dhurvey", course: "B.Sc.", books: [5, 7] },
    "Y24105011": { name: "Gayatri Prajapati", course: "B.Sc.", books: [6, 7] }, "Y24105012": { name: "Indrajeet Kumar", course: "B.Sc.", books: [0, 1] },
    "Y24105013": { name: "Karuna Verma", course: "B.Sc.", books: [0, 2] }, "Y24105014": { name: "Kiran Singh Dhurvey", course: "B.Sc.", books: [0, 3] },
    "Y24105015": { name: "Kumar Gaurav", course: "B.Sc.", books: [0, 4] }, "Y24105016": { name: "Madhvi Sharma", course: "B.Sc.", books: [1, 6] },
    "Y24105017": { name: "Mohit Kurmi", course: "B.Sc.", books: [0, 6] }, "Y24105018": { name: "Naman Kumar Rawat", course: "B.Sc.", books: [0, 7] },
    "Y24105019": { name: "Pankaj Ahirwar", course: "B.Sc.", books: [1, 2] }, "Y24105020": { name: "Poonam Ahirwar", course: "B.Sc.", books: [1, 3] },
    "Y24105021": { name: "Poonam Lodhi", course: "B.Sc.", books: [1, 4] }, "Y24105022": { name: "Rashi Napit", course: "B.Sc.", books: [1, 5] },
    "Y24105023": { name: "Renuka Priya", course: "B.Sc.", books: [1, 6] }, "Y24105024": { name: "Sanjeet Kumar", course: "B.Sc.", books: [1, 7] },
    "Y24105025": { name: "Shreyansh Raikwar", course: "B.Sc.", books: [2, 3] }, "Y24105026": { name: "Sonam Singh Chouhan", course: "B.Sc.", books: [2, 4] },
    "Y24105027": { name: "Sumit Raman Ray", course: "B.Sc.", books: [2, 5] }, "Y24105028": { name: "Namita Kumari", course: "B.Sc.", books: [0, 6] },
    "Y24105029": { name: "Anvesha Jain", course: "B.Sc.", books: [2, 7] }, "Y24105030": { name: "Hari Kumar", course: "B.Sc.", books: [3, 4] },
    "Y24105031": { name: "Shrishti Vaidya", course: "B.Sc.", books: [3, 5] }, "Y24105032": { name: "Vineet Sen", course: "B.Sc.", books: [3, 6] },
    "Y20105009": { name: "Jyoti Sonkar", course: "B.Sc.", books: [3, 7] }, "Y21105023": { name: "Vasudev Tiwari", course: "B.Sc.", books: [4, 5] },
    "Y24107001": { name: "Aalok Raj", course: "B.Sc.", books: [4, 6] }, "Y24107002": { name: "Abhigyan Shivam", course: "B.Sc.", books: [4, 7] },
    "Y24107003": { name: "Arshia Singh", course: "B.Sc.", books: [5, 6] }, "Y24107004": { name: "Deepanjali Verma", course: "B.Sc.", books: [5, 7] },
    "Y24107005": { name: "Dipti Shukla", course: "B.Sc.", books: [6, 7] }, "Y24107006": { name: "Esha Gouri Patel", course: "B.Sc.", books: [0, 1] },
    "Y24107007": { name: "Janvi Kumari", course: "B.Sc.", books: [0, 2] }, "Y24107008": { name: "Likha Manyo", course: "B.Sc.", books: [1, 6] },
    "Y24107009": { name: "Nitish Kumar Singh", course: "B.Sc.", books: [0, 4] }, "Y24107010": { name: "Preeti Raj Bansal", course: "B.Sc.", books: [0, 5] },
    "Y24107011": { name: "Prerna", course: "B.Sc.", books: [0, 6] }, "Y24107012": { name: "Rajendra Singh", course: "B.Sc.", books: [0, 7] },
    "Y24107013": { name: "Rimjhim Verma", course: "B.Sc.", books: [1, 2] }, "Y24107014": { name: "Ritika Singh", course: "B.Sc.", books: [1, 3] },
    "Y24107015": { name: "Riya Sen", course: "B.Sc.", books: [1, 4] }, "Y24107016": { name: "Ruchi Rajak", course: "B.Sc.", books: [1, 5] },
    "Y24107017": { name: "Sanidhya Tiwari", course: "B.Sc.", books: [1, 7] }, "Y24107018": { name: "Shailja Diwedi", course: "B.Sc.", books: [1, 7] },
    "Y24107019": { name: "Shruti Kumari", course: "B.Sc.", books: [2, 3] }, "Y24107020": { name: "Shruti Kumari", course: "B.Sc.", books: [2, 4] },
    "Y24107021": { name: "Sunil Singh Tomar", course: "B.Sc.", books: [2, 5] }, "Y24107022": { name: "Shushant Jaiswal", course: "B.Sc.", books: [2, 6] },
    "Y24107023": { name: "Shushmit Mukherjee", course: "B.Sc.", books: [2, 7] }, "Y24107024": { name: "Vedika Bajpai", course: "B.Sc.", books: [3, 4] },
    "Y24107025": { name: "Vishesh Kannaujiya", course: "B.Sc.", books: [3, 5] },
    "Y24106001": { name: "Aarya Thakur", course: "B.Sc.", books: [3, 6] }, "Y24106002": { name: "Abhiraj Singh", course: "B.Sc.", books: [3, 7] },
    "Y24106003": { name: "Abhishek Patel", course: "B.Sc.", books: [4, 5] }, "Y24106004": { name: "Akansha Choudhary", course: "B.Sc.", books: [4, 6] },
    "Y24106005": { name: "Ananya Pandey", course: "B.Sc.", books: [4, 7] }, "Y24106006": { name: "Aniket Patel", course: "B.Sc.", books: [5, 6] },
    "Y24106007": { name: "Anuj Kumar Patel", course: "B.Sc.", books: [5, 7] }, "Y24106008": { name: "Anushka Jha", course: "B.Sc.", books: [6, 7] },
    "Y24106010": { name: "Atul Singh Dangi", course: "B.Sc.", books: [0, 1] }, "Y24106011": { name: "Kanika Jhanjhote", course: "B.Sc.", books: [0, 2] },
    "Y24106012": { name: "Krishna Singh Lodhi", course: "B.Sc.", books: [0, 3] }, "Y24106013": { name: "Monit Choudhary", course: "B.Sc.", books: [0, 4] },
    "Y24106014": { name: "Muskan Singh Dangi", course: "B.Sc.", books: [0, 5] }, "Y24106015": { name: "Pradeep Ahirwar", course: "B.Sc.", books: [0, 6] },
    "Y24106016": { name: "Rounak Sen", course: "B.Sc.", books: [0, 7] }, "Y24106017": { name: "Rounak Sharma", course: "B.Sc.", books: [1, 2] },
    "Y24106019": { name: "Shailendra Patel", course: "B.Sc.", books: [1, 3] }, "Y24106020": { name: "Shiva Ghoshi", course: "B.Sc.", books: [1, 4] },
    "Y24106021": { name: "Shreya Yadav", course: "B.Sc.", books: [1, 5] }, "Y24106023": { name: "Tanisha Jha", course: "B.Sc.", books: [1, 6] },
    "Y24106024": { name: "Tara Sen", course: "B.Sc.", books: [1, 7] }, "Y24106025": { name: "Divyansh Thakur", course: "B.Sc.", books: [2, 3] },
    "Y24106027": { name: "Somil Jain", course: "B.Sc.", books: [2, 4] }, "Y24109001": { name: "Ashmika Martin", course: "B.Sc.", books: [2, 5] },
    "Y24109002": { name: "Bhoomi Prajapati", course: "B.Sc.", books: [2, 6] }, "Y24109003": { name: "Bhoomika Jat", course: "B.Sc.", books: [2, 7] },
    "Y24109004": { name: "Christy David", course: "B.Sc.", books: [3, 4] }, "Y24109005": { name: "Diksha Ahirwar", course: "B.Sc.", books: [3, 5] },
    "Y24109006": { name: "Jainab Sheikh", course: "B.Sc.", books: [3, 6] }, "Y24109007": { name: "Shriram Sahu", course: "B.Sc.", books: [3, 7] },
    "Y24109008": { name: "Amit Suryavanshi", course: "B.Sc.", books: [4, 5] }, "Y24109009": { name: "Ayush Pastor", course: "B.Sc.", books: [4, 6] },
    "Y24109011": { name: "Sourabh Dangi", course: "B.Sc.", books: [4, 7] }, "Y24109013": { name: "Ankita Raja", course: "B.Sc.", books: [5, 6] },
    "Y24109014": { name: "Antra Patel", course: "B.Sc.", books: [5, 7] }, "Y24109015": { name: "Aryan Patel", course: "B.Sc.", books: [6, 7] },
    "Y24109017": { name: "Hans Raj Singh", course: "B.Sc.", books: [0, 1] }, "Y24109019": { name: "Namrata Raja Bundela", course: "B.Sc.", books: [0, 2] },
    "Y24109020": { name: "Sanu Tiwari", course: "B.Sc.", books: [0, 3] }
};

let currentStudentId = "";
let currentStrikeCount = 0;
let lastMemeIndex = -1; // This guarantees no immediate duplicates

// --- 4. DEVICE SCRAPER ---
function getDeviceData() {
    return {
        device: navigator.userAgent,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}

// --- 5. LOGIN LOGIC ---
document.getElementById('generate-btn').addEventListener('click', async () => {
    const enrollment = document.getElementById('enrollment-input').value.trim().toUpperCase();
    const student = studentDB[enrollment];
    const errorMsg = document.getElementById('error-msg');
    
    if (!student) {
        errorMsg.classList.remove('hidden');
        return;
    }
    
    errorMsg.classList.add('hidden');
    currentStudentId = enrollment;
    
    const { device, timezone } = getDeviceData();
    
    // Log the moment they successfully log in!
    await supabaseClient.from('tracking').insert([
        { enrollment_no: currentStudentId, action: 'login', device: device, timezone: timezone }
    ]);
    
    // Check Supabase for previous cheat clicks
    const { count, error } = await supabaseClient
        .from('tracking')
        .select('*', { count: 'exact', head: true })
        .eq('enrollment_no', enrollment)
        .eq('action', 'cheat');

    currentStrikeCount = count || 0;

    // Build Dashboard
    document.getElementById('student-name-display').innerText = `Welcome, ${student.name}`;
    document.getElementById('student-details-display').innerText = `Enrollment: ${enrollment} | Program: ${student.course}`;
    
    const listDiv = document.getElementById('topic-list');
    listDiv.innerHTML = ''; 
    student.books.forEach(index => {
        let ethno = ethnographies[index];
        listDiv.innerHTML += `
            <div class="book-item">
                <div class="book-title">${ethno.title}</div>
                <a href="${ethno.link}" target="_blank" style="color: #2980b9; font-weight: bold; text-decoration: none;">⬇ Open PDF in Google Drive</a>
            </div>`;
    });

    // Enforce 1-Strike Limit via Supabase Verification
    if (currentStrikeCount >= 1) {
        document.getElementById('trap-container').classList.add('hidden');
    }

    // Reveal the UI
    document.getElementById('landing-card').classList.add('hidden');
    document.getElementById('results-area').classList.remove('hidden');
    document.getElementById('wa-help-btn').classList.remove('hidden');
    
    // Reveal the Watermark smoothly
    setTimeout(() => {
        document.getElementById('watermark').classList.remove('hidden');
    }, 500);
});

// --- 6. WHATSAPP TRACKING LOGIC ---
document.getElementById('wa-help-btn').addEventListener('click', async function(e) {
    e.preventDefault(); 
    const { device, timezone } = getDeviceData();
    
    // Log to Supabase silently
    await supabaseClient.from('tracking').insert([
        { enrollment_no: currentStudentId, action: 'whatsapp', device: device, timezone: timezone }
    ]);
    
    // Open chat
    window.open(`https://wa.me/918986937029?text=Hi,%20I%20need%20help%20with%20ANT%20DSM%20412.`, '_blank');
});

// --- 7. THE TRAP ROULETTE (YOUR EXACT 20 LINKS) ---
const trapLinks = [
    "https://youtu.be/HI8nIMRhuvo?si=DUAZbFgGgyWz4Gym",
    "https://youtu.be/EyLcr-MYB1Q?si=KifwukQsr-7UDhKv",
    "https://youtu.be/ZlpsGW1g4cA?si=ngPANFFNoxrslduX",
    "https://youtu.be/AJG-Nluvg5c?si=H-3jrY2DQmwVqt_Y",
    "https://youtu.be/roTe_x_oJE8?si=XXsWzNCJrj8qeCmW",
    "https://youtu.be/TN5CgsJFzWs?si=zE1Zrj-UY1Nx19kL",
    "https://youtu.be/bQ5NAumOtC0?si=9y64RxXIsDHIUkm2",
    "https://youtu.be/lNwApgaHK4Y?si=zAP92p1N6dTj62gj",
    "https://youtu.be/4TjrQ9sG9TE?si=DQwtYI2Tl6Hzxkft",
    "https://youtu.be/VX9npbMm6Cc?si=ApBJ7EaynaUTZ-_1",
    "https://youtu.be/SVePV-i7lt4?si=2ER0OHyFeNeOUaZv",
    "https://youtu.be/cKSpFkMr6Ik?si=BgzFq_akWW_CWW0C",
    "https://youtu.be/4JkuHzcvKmY?si=MTRa6DMn-iv2GDLF",
    "https://youtu.be/7rym-VB6YhE?si=NjlcMJrh0DvqbAJ6",
    "https://youtu.be/0UWL4Oa6PQA?si=UFwAUY7meIDfhqrE",
    "https://youtu.be/FZ-1LyNJiL4?si=WkurOAz9ZWc9GKbj",
    "https://youtu.be/xc0LQveanOk?si=oI8DncBSFamsv2md",
    "https://youtu.be/55Q9Ko1O5kQ?si=TtdqyCY5qCAFn5H0",
    "https://youtu.be/DgKM2hXtsh0?si=y78DoZ_NAyp8KYjr",
    "https://youtu.be/0A4yLCUfIkE?si=jqrvFdzK44fwLQyf"
];

document.getElementById('cheat-btn').addEventListener('click', async function() {
    currentStrikeCount++;

    // Pick a random meme, but force it to re-roll if it matches the last one
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * trapLinks.length);
    } while (randomIndex === lastMemeIndex);
    
    // Save this new index so we remember it for the next click
    lastMemeIndex = randomIndex; 
    
    const finalLink = trapLinks[randomIndex];
    const { device, timezone } = getDeviceData();
    
    // Send tracking data directly to Supabase
    await supabaseClient.from('tracking').insert([
        { 
            enrollment_no: currentStudentId, 
            action: 'cheat', 
            strike_count: currentStrikeCount, 
            meme_url: finalLink, 
            device: device, 
            timezone: timezone 
        }
    ]);

    // Open Meme
    window.open(finalLink, '_blank');
    
    // Instantly hide the trap upon the first strike
    if (currentStrikeCount >= 1) {
        document.getElementById('trap-container').classList.add('hidden');
    }
});
//Start Page Alert
function localStorageAlert(){
    alert("This quiz uses local storage. If you're using incognito mode on your browser, or have disabled cookies, you may not be able to take this quiz.");
};

//Select Elements
const region = document.getElementById('map');
const selectedRegion = localStorage.getItem('selectedRegion');
const mode = localStorage.getItem('mode');
const question = document.getElementById('question');
const questionNumber = document.getElementById('questionNumber');
const stampProgress = document.getElementById('stamp');
const result_stampImg = document.getElementById('park-img');
const result_stampLocation = document.getElementById('park-name');
const result_stampLocaleType = document.getElementById('park-type');
const result_parkAddress = document.getElementById('park');
const result_parkSite = document.getElementById('site-type');
const result_parkState = document.getElementById('park-state');
const result_about = document.getElementById('about');
const result_options = document.getElementById('options');

//Convert to an array, so you can use array functions on it
const icon= Array.from(document.getElementsByClassName('choice_icon'));
const choice= Array.from(document.getElementsByClassName('choice_text'));
const clickable_area= Array.from(document.getElementsByClassName('clickableArea'));

//Variables
let answers = [];
let questionCounter = 0;
let choicesCounter=0;
let maxQuestions = 5;
let questionIndex=0;

//Questions Array
let questions =[
    {
        question:"Do you mind crowds?",
        icons:{
            choice1: "icons/Q1_A.svg",
            choice2: "icons/Q1_B.svg",
            choice3: "icons/Q1_C.svg",
            choice4: "icons/Q1_D.svg",
        },
        choices:{
            choice1: "No crowds",
            choice2:"I prefer to get off the beaten path",
            choice3:"I don't care either way",
            choice4:"I like crowds",
        }
    },
    {
        question:"Where would you like to stay on your trip?",
        icons:{
            choice1:"Q2_A.svg",
            choice2:"Q2_B.svg",
            choice3:"Q2_C.svg",
            choice4:"Q2_D.svg",
        },
        choices:{
            choice1:"Hotel",
            choice2:"Tent",
            choice3:"RV",
            choice4:"Cabin"
        }
    },
    {
        question:"What activities do you enjoy?",
        icons:{
            choice1:"Q3_A.svg",
            choice2:"Q3_B.svg",
            choice3:"Q3_C.svg",
            choice4:"Q3_D.svg",
        },
        choices:{
            choice1: "Animal Watching",
            choice2:"Hiking",
            choice3:"Kayaking",
            choice4:"Biking"
        }
    },
    {
        question:"How long can you go with out checking your phone?",
        icons:{
            choice1:"Q4_A.svg",
            choice2:"Q4_B.svg",
            choice3:"Q4_C.svg",
            choice4:"Q4_D.svg",
        },
        choices:{
            choice1:"A few hours",
            choice2:"Forever",
            choice3:"A few days",
            choice4:"One day"
        }
    },
    {
        question:"How long do you plan to visit?",
        icons:{
            choice1:"Q5_A.svg",
            choice2:"Q5_B.svg",
            choice3:"Q5_C.svg",
            choice4:"Q5_D.svg",
        },
        choices:{
            choice1:"More than a week",
            choice2:"A long weekend",
            choice3:"It's a day trip",
            choice4:"About a week"
        }
    }
];

//If on location.html, register which region was clicked on and save to local storage
if(window.location.pathname=="/location.html"){
    region.addEventListener("click", e => {
        localStorage.setItem("selectedRegion", e.target.id);
        }); 
};


//Start Game
startGame = () => {
    getNewQuestion();
};

//Functions
getNewQuestion = () => {
    questionCounter++;
    question.innerHTML= questions[questionIndex].question;
    iconsLoop();
    choicesLoop();
    progressTracker();
    clickIt();
};


progressTracker = () => {
    let totalQuestions= 6;
    let progressCounter = Math.floor((questionCounter/totalQuestions)*100);
    let progressStamp = Math.floor((progressCounter)/totalQuestions);
    questionNumber.innerHTML = `Question ${questionCounter}`;
    stampProgress.innerHTML = `${progressCounter}`;
};

iconsLoop = () => {
    icon.forEach(icon => {
        const number = icon.dataset['number'];
        icon.innerHTML = `<img src="/icons/${questions[choicesCounter].icons['choice' + number]}">`;
    });
};

choicesLoop = () => {
    choice.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = questions[choicesCounter].choices['choice' + number];
    });
};

clickIt = () => {
    clickable_area.forEach(clickable_area => {
        clickable_area.addEventListener("click", e => {
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];
            answers.push(selectedAnswer);

            if(answers.length == 5){
                localStorage.setItem("mode",calculateMode(answers));
                window.location.assign("/results.html");
            }

            questionIndex++;
            choicesCounter++;
            questionCounter++;
            question.innerHTML= questions[questionIndex].question;
            iconsLoop();
            choicesLoop();
            progressTracker();
        });
    });
};

calculateMode = (myArray) =>
  myArray.reduce(
    (a,b,i,arr)=>
            (arr.filter(v=>v===a).length>=arr.filter(v=>v===b).length?a:b),
    null)

displayResults = () => {
    if(selectedRegion == "NE" & mode == 1){
        result_stampImg.innerHTML = "<img src=\'/parks/arcadia.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Arcadia";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="Arcadia";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "Maine, USA";
        result_about.innerHTML = "Along the rugged coastline of Maine, this gem of the Northeast offers ocean shoreline, coastal forests, remote islands, rocky mountains and historic lighthouses. With 45 miles of historic carriage roads to bike and 125 miles of trails to hike, Acadia is a premier destination for the adventurous and outdoorsy. ";
        result_options.innerHTML = "Other good options to explore: New River Gorge National Park and Preserve (WV), Castle Clinton National Monument (NY),Greenbelt National Park (MD), Hamilton Grange (NY), Vanderbilt Mansion National Historic Site (NY).";

    }else if(selectedRegion == "NE" & mode == 2){
        result_stampImg.innerHTML = "<img src=\'/parks/katahdin.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Katahdin";
        result_stampLocaleType.innerHTML = "National Monument";
        result_parkAddress.innerHTML ="Katahdin Woods and Waters";
        result_parkSite.innerHTML ="National Monument";
        result_parkState.innerHTML = "Virginia, USA";
        result_about.innerHTML = "This monument preserves more than 87,500 acres along the East Branch of the Penobscot River in Maine, a traditional transportation corridor of the native Wabanaki people of the region, as well as part of the area’s logging history. The topography of the monument includes deep river valleys, dramatic flood plains and curious geologic features, including lava flows and “rock conglomerates” — formations made up of different types of Appalachian rock fragments dating back millions of years.";
        result_options.innerHTML = "Other good options to explore: Constitution Gardens (DC), Great Egg Harbor National Scenic and Recreation (NJ), Kenilworth Park and Aquatic Gardens (DC), Catocin Mountain National Park (MD), Weir Farm National Historic Park (CT).";

    }else if(selectedRegion == "NE" & mode == 3){
        result_stampImg.innerHTML = "<img src=\'/parks/african.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "African Burial Ground";
        result_stampLocaleType.innerHTML = "National Monument";
        result_parkAddress.innerHTML ="African Burial Ground";
        result_parkSite.innerHTML ="National Monument";
        result_parkState.innerHTML = "DC, USA";
        result_about.innerHTML = "During the 17th and 18th centuries, more than 15,000 Africans, both enslaved and free, were buried in a seven-acre plot in New York City. Now, the African Burial Ground National Monument stands over the burial ground to honor these men and women. The monument exhibits extensive information on the history, anthropology and archaeology of the site, using research conducted by Howard University.";
        result_options.innerHTML = "Other good options to explore: Ellis Island National Monument (NY), Wolf Trap National Park for the Performing Arts (VA), Boston National Historic Park (MA), Harriet Tubman National Park (NY), Lowell National Historic Park (MA).";

    }else if(selectedRegion == "NE" & mode == 4){
        result_stampImg.innerHTML = "<img src=\'/parks/shenandoah.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Shenandoah";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="Shenandoah";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "Virginia, USA";
        result_about.innerHTML = "Nestled in the Blue Ridge Mountains in central Virginia, Shenandoah features rolling tree-lined hills, wooded hollows, spectacular waterfalls and a diversity of wildlife, all easily accessible from the scenic Skyline Drive. The park preserves a remarkable slice of southern Appalachian natural history and beauty with a dazzling array of recreational opportunities.";
        result_options.innerHTML = "Other good options to explore: Cape Cod National Seashore (MA), Appalachian National Scenic Trail (East Coast), Thomas Edison National Park (NJ), Upper Delaware Scenic and Recreational River (DE), Great Falls National Park (MD, VA).";

    }else if(selectedRegion == "SE" & mode == 1){
        result_stampImg.innerHTML = "<img src=\'/parks/grtmtns.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Great Smoky Mountains";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="The Great Smoky Mountains";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "Tennessee, USA";
        result_about.innerHTML = "Perhaps no other place in America represents such an ideal mix of the convenient and the extraordinary, putting a region with postcard-perfect views and plentiful wildlife within easy reach of the interstate. World renowned for its biodiversity, the beauty of its ancient mountains and its Southern Appalachian mountain culture, this southeastern gem is worth fighting the crowds to see.";
        result_options.innerHTML = "Other good options to explore: Big South Fork National River and Recreation Area (KY, TN), Russell Cave National Monument (AL), Natchez Trace Parkway(AL, MS, TN), Canaveral National Seashore (FL), Hot Springs National Park (AR).";

    }else if(selectedRegion == "SE" & mode == 2){
        result_stampImg.innerHTML = "<img src=\'/parks/dryTort.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Dry Tortugas";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="Dry Tortugas";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "Florida, USA";
        result_about.innerHTML = "This park protects seven small islands 70 miles west of Key West, Florida, and renowned for its vibrant coral, lush seagrass, and migratory birds. These islands change constantly from the effects of tides, weather, air, and other environmental and human factors. On Garden Key, visitors can tour the largest all-masonry fort in the United States, built between 1846 and 1875 to defend the Gulf of Mexico, but never completed.";
        result_options.innerHTML = " Other good options to explore: Cumberland Gap National Historic Park (KY, TN, VA),  Cape Hatteras National Seashore (NC),Timucuan Ecological and Historic Preserve (FL), Jean Lafitte National Historic Park and Preserve (LA).";

    }else if(selectedRegion == "SE" & mode == 3){
        result_stampImg.innerHTML = "<img src=\'/parks/tuskegee.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Tuskegee";
        result_stampLocaleType.innerHTML = "National Site";
        result_parkAddress.innerHTML ="Tuskegee Institute";
        result_parkSite.innerHTML ="National Historic Site";
        result_parkState.innerHTML = "Alabama, USA";
        result_about.innerHTML = "Booker T. Washington founded the Tuskegee Normal School (now Tuskegee University) in 1881 to train African Americans as teachers, skilled laborers and farmers in the impoverished, segregated Reconstruction-era South. Today, the legacy of Washington, Carver and many others has been preserved in the Historic Campus District of Tuskegee University where you can tour the gorgeous campus, the George Washington Carver Museum, and Booker T. Washington’s home.";
        result_options.innerHTML = "Other good options to explore: Wright Brothers National Memorial (NC), Andersonville National Historic Site  (GA), Birmingham Civil Rights National Monument (AL), Abraham Lincoln Birthplace National Historic Park (KY)";

    }else if(selectedRegion == "SE" & mode == 4){
        result_stampImg.innerHTML = "<img src=\'/parks/everglades.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Everglades";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="Everglades";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "Florida, USA";
        result_about.innerHTML = "One of the largest wetlands in the world, this iconic \"\River of Grass\"\ protects 1.5 million acres of subtropical wilderness in South Florida. Its rare mix of salt and fresh water is home to the largest mangrove ecosystem in the Western hemisphere. Visitors can access this marshy wilderness in short hikes off of the main park road or explore the western coast of the park by paddling along the stunning 99-mile Wilderness Waterway Trail.";
        result_options.innerHTML = "Other good options to explore: Mammoth Cave National Park (KY), Congaree National Park (SC),Buck Island Reef National Monument (FL), Oben Wild and Scenic River (TN), Big Cypress National Preserve (FL).";

    }else if(selectedRegion == "MW" & mode == 1){
        result_stampImg.innerHTML = "<img src=\'/parks/badlands.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Badlands";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="Badlands";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "South Dakota, USA";
        result_about.innerHTML = "This park's sharply textured rock formations share a 244,000-acre landscape with the largest protected mixed-grass prairie in the United States. The buttes, pinnacles and spires that define this region have been eroding for half a million years into their distinctive shapes — and continue to erode at a rate of about an inch per year. The park’s rugged beauty attracts visitors from around the world, and its geologic deposits contain the world’s richest Oligocene epoch fossil beds, estimated at 23 to 35 million years old. ";
        result_options.innerHTML = "Other good options to explore: Sleeping Bear Dunes (MI), Cuyahoga (OH), Grand Portage National Monument (MN),Wind Cave (SD), Apostle Islands (MI).";
        
    }else if(selectedRegion == "MW" & mode == 2){
        result_stampImg.innerHTML = "<img src=\'/parks/theodore.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Theodore Roosevelt";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="Theodore Roosevelt";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "South Dakota, USA";
        result_about.innerHTML = "Long before Theodore Roosevelt became America’s 26th president, he spent years as a rancher in the rugged lands preserved by this national park. He grew a strong attachment to the landscape, and now the park’s three distinct units cover some 70,000 acres of badlands, prairies, and forests abundant with plants and wildlife. Popular for back country hiking and horseback riding, the park also hosts a variety of wildlife from Bison and wild horses, to prairie dogs and big horn sheep.";
        result_options.innerHTML = "Other good options to explore: Ice Age National Scenic Trail (WI), Tallgrass Prairie National Preserve (KS), Indiana Dunes National Park(IL), Missouri National Recreational River (MO), Gateway Arch National Historic Landmark (MO).";

    }else if(selectedRegion == "MW" & mode == 3){
        result_stampImg.innerHTML = "<img src=\'/parks/agatefossilbed.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Agate Fossil Beds";
        result_stampLocaleType.innerHTML = "National Monument";
        result_parkAddress.innerHTML ="Agate Fossil Beds";
        result_parkSite.innerHTML ="National Monument";
        result_parkState.innerHTML = "Nebraska, USA";
        result_about.innerHTML = "During the 1890s, scientists rediscovered what the Lakota Sioux already knew—bones preserved in one of the world's most significant Miocene Epoch mammal sites. Informative exhibits in the visitor center show what remains of these creatures and visitors can walk the trails to view fossils and animal skeletons, as well as see Native American artifacts.";
        result_options.innerHTML = "Other good options to explore: Effigy Mounds (IA), Pipestone National Monument (MN), Dayton Aviation Heritage Site (OH), Nicodemus National Historic Site (KS), Ste. Genevieve National Historic Park (MO).";

    }else if(selectedRegion == "MW" & mode == 4){
        result_stampImg.innerHTML = "<img src=\'/parks/apostle.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Apostle Islands";
        result_stampLocaleType.innerHTML = "National Lakeshore";
        result_parkAddress.innerHTML ="Apostle Islands";
        result_parkSite.innerHTML ="National Lakeshore";
        result_parkState.innerHTML = "Michigan, USA";
        result_about.innerHTML = "During the Ice Age, huge glaciers advanced and retreated through this region of Wisconsin, sculpting the sandstone bedrock and enlarging channels between what would become the park's 21 islands in Lake Superior. Today, the lakeshore lies within a transitional zone where boreal and northern forests meet, offering visitors ample opportunities to hike and paddle among the beaches, cliffs, caves, islands and woods.";
        result_options.innerHTML = "Other good options to explore: Theodore Roosevelt (SD), Isle Royale National Park (MI), Voyageurs National Park (MN), Ozark National Scenic Riverway (MO), Jewel Cave National Monument (SD).";

    }else if(selectedRegion == "SW" & mode == 1){
        result_stampImg.innerHTML = "<img src=\'/parks/zion.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Zion";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="Zion";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "Utah, USA";
        result_about.innerHTML = "Escape to Zion National Park, where free flowing rivers cut through multi-hued sedimentary rock to form Zion's deep and spectacular canyons. Park trails lead visitors to dramatic rock formations, hanging gardens, scenic vistas, ancient rock art and natural arches. People have lived in Zion’s landscape for at least 8,000 years, and the park's prehistoric art and artifacts tell the stories of the area’s previous inhabitants. ";
        result_options.innerHTML = "Other good options to explore: The Grand Canyon (AZ), Arches National Park (UT), Mesa Verde National Park (CO), Bryce Canyon National Park (UT), White Sands National Park (NM).";

    }else if(selectedRegion == "SW" & mode == 2){
        result_stampImg.innerHTML = "<img src=\'/parks/gunnison.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Black Canyon";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="Black Canyon of the Gunnison";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "Colorado, USA";
        result_about.innerHTML = "This park protects a 12-mile stretch of the Gunnison River as it flows through an exceptionally deep and narrow gorge. The steep canyon walls keep out much of the sunlight, giving it a dark appearance and inspiring the \"Black Canyon\" name. Visitors can enjoy trout fishing and challenging paddling conditions on the river. It’s also a rock climbers’ heaven, with 145 remote and challenging climbs throughout the park.";
        result_options.innerHTML = " Other good options to explore: Guadalupe Mountains National Park (TX), Carlsbad Caverns National Park (NM), Dinosaur National Park (CO), Capitol Reef National Park (UT), Padre Island National Seashore (TX).";

    }else if(selectedRegion == "SW" & mode == 3){
        result_stampImg.innerHTML = "<img src=\'/parks/aztec.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Aztec Ruins";
        result_stampLocaleType.innerHTML = "National Monument";
        result_parkAddress.innerHTML ="Aztec Ruins";
        result_parkSite.innerHTML ="National Monument";
        result_parkState.innerHTML = "New Mexico, USA";
        result_about.innerHTML = "Built by the Pueblo people as a public ceremonial, economic and political center over 900 years ago, Aztec National Monument is a designated World Heritage Site, with it’s Great House containing over 400 masonry rooms and North America’s largest reconstructed great kiva. Visitors can view ancient pottery, woven yucca tiles, and obsidian jewelry at the museum where archaeologists and Native American Scholars share their insights into how the community developed and everyday people lived.";
        result_options.innerHTML = "Other good options to explore: Hovenweep National Monument (UT, CO), Petroglyphs National Monument (NM), Montezuma Castle National Monument (AZ), Timpanogos Cave National Monument (UT), Florissant Fossil  Beds (CO).";

    }else if(selectedRegion == "SW" & mode == 4){
        result_stampImg.innerHTML = "<img src=\'/parks/bigBend.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Big Bend";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="Big Bend";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "Texas, USA";
        result_about.innerHTML = "Big Bend National Park features broad expanses of Chihuahuan Desert shrubland and grassland interspersed with smaller areas of high-elevation woodland in the Chisos Mountains. Rugged rocks and deep canyons along the Rio Grande are among the park's most striking features; wetlands and springs add to the park's biological diversity. Visitors can explore the rugged trails, seek out the colorful array of birds and wildflowers, and spread out on a blanket after dark enjoying some of the darkest night skies in the country.";
        result_options.innerHTML = "Other good options to explore: Canyonlands National Park (UT), Great Sand Dunes National Park and Preserve (CO), Rio Grande Wild and Scenic River (TX), Gila Cliff Dwellings National Monument (NM), Rocky Mountain National Park (CO).";

    }else if(selectedRegion == "W" & mode == 1){
        result_stampImg.innerHTML = "<img src=\'/parks/tetons.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Grand Teton";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="Grand Teton";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "Wyoming, USA";
        result_about.innerHTML = "This spectacular destination preserves a dramatic stretch of the Teton Range bordering the Snake River. One of the unusual features of these distinctive mountains is the absence of foothills, meaning that there are no smaller mountains blocking the view. The park also features glacier-carved lakes, a historic district of weathered buildings made by 19th century Mormon homesteaders, and an abundance of wildlife large and small, including nearly 1,000 bison that roam the grassy fields in herds.";
        result_options.innerHTML = "Other good options to explore: Yellowstone National Park (WY) San Juan Island (WA), Yosemite (CA), Devil’s Tower (WY), Great Basin (NV), Pinnacles (CA).";

    }else if(selectedRegion == "W" & mode == 2){
        result_stampImg.innerHTML = "<img src=\'/parks/joshua.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Joshua Tree";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="Joshua Tree";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "California, USA";
        result_about.innerHTML = "This iconic park preserves portions of two spectacular desert ecosystems. The Colorado Desert in the eastern portion of the park features natural gardens of creosote bush, ocotillo and cholla cactus. The higher, slightly cooler Mojave Desert offers dazzling vistas of Joshua trees and yucca. The vast park also contains spectacularly sculpted formations of a type of rock known as monzogranite and is a mecca for rock climbers around the world.";
        result_options.innerHTML ="Other good options to explore: Mojave Natural Preserve (CA), Denali National Park and Preserve (AK), Sequoia National Park (CA), Northern Cascades National Park (WA), Tule Springs Fossil Beds National Monument (NV).";

    }else if(selectedRegion == "W" & mode == 3){
        result_stampImg.innerHTML = "<img src=\'/parks/Haleakalā.jpg\' width=\'100%\' height=\'100%\'>";
        result_stampLocation.innerHTML = "Haleakalā";
        result_stampLocaleType.innerHTML = "National Park";
        result_parkAddress.innerHTML ="Haleakalā";
        result_parkSite.innerHTML ="National Park";
        result_parkState.innerHTML = "Hawaii, USA";
        result_about.innerHTML = "This park protects a portion of the dormant 10,000-foot-tall shield volcano that makes up most of the island of Maui, including a massive two-mile-wide crater at the volcano's summit. Visitors can see rare native birds, hike through landscapes dry with cinder cones and lush with rainforests, and explore trails through wilderness areas with waterfalls and freshwater pools.";
        result_options.innerHTML ="Other good options to explore: Bighorn Canyon Recreational Area(WY), Mount Rainier National Park(WA), Glacier National Park (MT),Olympic National Park (WA), Hawai’i Volcanoes National Park (HI).";

    }else{//selectedRegion == "W" & mode == 4
    result_stampImg.innerHTML = "<img src=\'/parks/kenai.jpg\' width=\'100%\' height=\'100%\'>";
    result_stampLocation.innerHTML = "Kenai Fjords";
    result_stampLocaleType.innerHTML = "National Park";
    result_parkAddress.innerHTML ="Kenai Fjords";
    result_parkSite.innerHTML ="National Park";
    result_parkState.innerHTML = "Alaska, USA";
    result_about.innerHTML = "At the edge of the Kenai Peninsula lies a land where the ice age lingers. Nearly 40 glaciers flow from the Harding Icefield, Kenai Fjords' crowning feature. Wildlife thrives in icy waters and lush forests around this vast expanse of ice. Today, shrinking glaciers bear witness to the effects of our changing climate. Take a boat tour, hike the glaciers and kayak the surrounding fjords to experience once in a lifetime views and wildlife.";
    result_options.innerHTML = " Other good options to explore: Crater Lake (OR), Muir Woods National Park (CA), Kaloko Honokohau National Historical Park (HI), Katmai National Park and Preserve (AK), Kings Canyon National Park (CA).";    
}
};

//Start Game
startGame();

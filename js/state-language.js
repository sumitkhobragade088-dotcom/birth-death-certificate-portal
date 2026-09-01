(function(){
  const STATE_LANGUAGE = {
    "AN":"hi","AP":"te","AR":"hi","AS":"as","BR":"hi","CH":"hi","CG":"hi","DN":"gu","DL":"hi","GA":"mr",
    "GJ":"gu","HR":"hi","HP":"hi","JK":"ur","JH":"hi","KA":"kn","KL":"ml","LA":"hi","LD":"ml","MP":"hi",
    "MH":"mr","MN":"hi","ML":"hi","MZ":"hi","NL":"hi","OD":"or","PY":"ta","PB":"pa","RJ":"hi","SK":"hi",
    "TN":"ta","TS":"te","TR":"bn","UP":"hi","UK":"hi","WB":"bn"
  };

  const LANG_NAME = {
    en:"English",hi:"हिन्दी",mr:"मराठी",gu:"ગુજરાતી",pa:"ਪੰਜਾਬੀ",bn:"বাংলা",as:"অসমীয়া",
    or:"ଓଡ଼ିଆ",te:"తెలుగు",ta:"தமிழ்",kn:"ಕನ್ನಡ",ml:"മലയാളം",ur:"اردو"
  };

  const T = {
    en:{
      birthTitle:"All State Birth Registration", deathTitle:"All State Death Registration",
      state:"State", district:"District", localBody:"Hospital / Local Body",
      childInfo:"Child Information", deceasedInfo:"Deceased Person", family:"Family Details",
      fullName:"Full Name", aadhaar:"Aadhaar Number", gender:"Gender",
      dob:"Date of Birth", dod:"Date of Death", pob:"Place of Birth", pod:"Place of Death",
      parents:"Parents", father:"Father Name", mother:"Mother Name", spouse:"Spouse Name",
      fatherAadhaar:"Father Aadhaar", motherAadhaar:"Mother Aadhaar",
      address:"Address", addressBirth:"Address at Birth", addressDeath:"Address at Death",
      permanent:"Permanent Address", registration:"Registration", regNo:"Registration Number",
      regDate:"Date of Registration", issueDate:"Issue Date", remarks:"Remarks",
      saveBirth:"Save Birth Certificate", saveDeath:"Save Death Certificate",
      selectState:"Select State", selectDistrict:"Select District", selectAuthority:"Select saved authority"
    },
    hi:{
      birthTitle:"सभी राज्यों का जन्म पंजीकरण", deathTitle:"सभी राज्यों का मृत्यु पंजीकरण",
      state:"राज्य",district:"जिला",localBody:"अस्पताल / स्थानीय निकाय",childInfo:"बच्चे की जानकारी",
      deceasedInfo:"मृत व्यक्ति",family:"परिवार विवरण",fullName:"पूरा नाम",aadhaar:"आधार संख्या",gender:"लिंग",
      dob:"जन्म तिथि",dod:"मृत्यु तिथि",pob:"जन्म स्थान",pod:"मृत्यु स्थान",parents:"माता-पिता",
      father:"पिता का नाम",mother:"माता का नाम",spouse:"पति/पत्नी का नाम",fatherAadhaar:"पिता का आधार",
      motherAadhaar:"माता का आधार",address:"पता",addressBirth:"जन्म के समय पता",addressDeath:"मृत्यु के समय पता",
      permanent:"स्थायी पता",registration:"पंजीकरण",regNo:"पंजीकरण संख्या",regDate:"पंजीकरण की तिथि",
      issueDate:"जारी करने की तिथि",remarks:"टिप्पणी",saveBirth:"जन्म प्रमाणपत्र सहेजें",saveDeath:"मृत्यु प्रमाणपत्र सहेजें",
      selectState:"राज्य चुनें",selectDistrict:"जिला चुनें",selectAuthority:"अस्पताल / निकाय चुनें"
    },
    mr:{
      birthTitle:"सर्व राज्य जन्म नोंदणी",deathTitle:"सर्व राज्य मृत्यू नोंदणी",state:"राज्य",district:"जिल्हा",
      localBody:"रुग्णालय / स्थानिक संस्था",childInfo:"बालकाची माहिती",deceasedInfo:"मृत व्यक्ती",family:"कुटुंब तपशील",
      fullName:"पूर्ण नाव",aadhaar:"आधार क्रमांक",gender:"लिंग",dob:"जन्म दिनांक",dod:"मृत्यू दिनांक",
      pob:"जन्म ठिकाण",pod:"मृत्यू ठिकाण",parents:"पालक",father:"वडिलांचे नाव",mother:"आईचे नाव",
      spouse:"पती/पत्नीचे नाव",fatherAadhaar:"वडिलांचा आधार",motherAadhaar:"आईचा आधार",address:"पत्ता",
      addressBirth:"जन्मावेळचा पत्ता",addressDeath:"मृत्यूवेळचा पत्ता",permanent:"कायमचा पत्ता",
      registration:"नोंदणी",regNo:"नोंदणी क्रमांक",regDate:"नोंदणी दिनांक",issueDate:"जारी दिनांक",
      remarks:"शेरा",saveBirth:"जन्म प्रमाणपत्र जतन करा",saveDeath:"मृत्यू प्रमाणपत्र जतन करा",
      selectState:"राज्य निवडा",selectDistrict:"जिल्हा निवडा",selectAuthority:"रुग्णालय / संस्था निवडा"
    },
    gu:{
      birthTitle:"તમામ રાજ્ય જન્મ નોંધણી",deathTitle:"તમામ રાજ્ય મૃત્યુ નોંધણી",state:"રાજ્ય",district:"જિલ્લો",
      localBody:"હોસ્પિટલ / સ્થાનિક સંસ્થા",childInfo:"બાળકની માહિતી",deceasedInfo:"મૃત વ્યક્તિ",family:"પરિવાર વિગતો",
      fullName:"પૂર્ણ નામ",aadhaar:"આધાર નંબર",gender:"લિંગ",dob:"જન્મ તારીખ",dod:"મૃત્યુ તારીખ",pob:"જન્મ સ્થળ",pod:"મૃત્યુ સ્થળ",
      parents:"માતા-પિતા",father:"પિતાનું નામ",mother:"માતાનું નામ",spouse:"પતિ/પત્નીનું નામ",
      fatherAadhaar:"પિતાનો આધાર",motherAadhaar:"માતાનો આધાર",address:"સરનામું",addressBirth:"જન્મ સમયે સરનામું",
      addressDeath:"મૃત્યુ સમયે સરનામું",permanent:"કાયમી સરનામું",registration:"નોંધણી",regNo:"નોંધણી નંબર",
      regDate:"નોંધણી તારીખ",issueDate:"જારી તારીખ",remarks:"ટિપ્પણી",saveBirth:"જન્મ પ્રમાણપત્ર સાચવો",
      saveDeath:"મૃત્યુ પ્રમાણપત્ર સાચવો",selectState:"રાજ્ય પસંદ કરો",selectDistrict:"જિલ્લો પસંદ કરો",selectAuthority:"હોસ્પિટલ / સંસ્થા પસંદ કરો"
    },
    pa:{
      birthTitle:"ਸਾਰੇ ਰਾਜ ਜਨਮ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",deathTitle:"ਸਾਰੇ ਰਾਜ ਮੌਤ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",state:"ਰਾਜ",district:"ਜ਼ਿਲ੍ਹਾ",
      localBody:"ਹਸਪਤਾਲ / ਸਥਾਨਕ ਸੰਸਥਾ",childInfo:"ਬੱਚੇ ਦੀ ਜਾਣਕਾਰੀ",deceasedInfo:"ਮ੍ਰਿਤ ਵਿਅਕਤੀ",family:"ਪਰਿਵਾਰ ਵੇਰਵਾ",
      fullName:"ਪੂਰਾ ਨਾਮ",aadhaar:"ਆਧਾਰ ਨੰਬਰ",gender:"ਲਿੰਗ",dob:"ਜਨਮ ਮਿਤੀ",dod:"ਮੌਤ ਮਿਤੀ",pob:"ਜਨਮ ਸਥਾਨ",pod:"ਮੌਤ ਸਥਾਨ",
      parents:"ਮਾਤਾ-ਪਿਤਾ",father:"ਪਿਤਾ ਦਾ ਨਾਮ",mother:"ਮਾਤਾ ਦਾ ਨਾਮ",spouse:"ਪਤੀ/ਪਤਨੀ ਦਾ ਨਾਮ",
      fatherAadhaar:"ਪਿਤਾ ਆਧਾਰ",motherAadhaar:"ਮਾਤਾ ਆਧਾਰ",address:"ਪਤਾ",addressBirth:"ਜਨਮ ਸਮੇਂ ਦਾ ਪਤਾ",
      addressDeath:"ਮੌਤ ਸਮੇਂ ਦਾ ਪਤਾ",permanent:"ਸਥਾਈ ਪਤਾ",registration:"ਰਜਿਸਟ੍ਰੇਸ਼ਨ",regNo:"ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨੰਬਰ",
      regDate:"ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਮਿਤੀ",issueDate:"ਜਾਰੀ ਮਿਤੀ",remarks:"ਟਿੱਪਣੀ",saveBirth:"ਜਨਮ ਸਰਟੀਫਿਕੇਟ ਸੰਭਾਲੋ",
      saveDeath:"ਮੌਤ ਸਰਟੀਫਿਕੇਟ ਸੰਭਾਲੋ",selectState:"ਰਾਜ ਚੁਣੋ",selectDistrict:"ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",selectAuthority:"ਹਸਪਤਾਲ / ਸੰਸਥਾ ਚੁਣੋ"
    },
    bn:{
      birthTitle:"সকল রাজ্যের জন্ম নিবন্ধন",deathTitle:"সকল রাজ্যের মৃত্যু নিবন্ধন",state:"রাজ্য",district:"জেলা",
      localBody:"হাসপাতাল / স্থানীয় সংস্থা",childInfo:"শিশুর তথ্য",deceasedInfo:"মৃত ব্যক্তি",family:"পারিবারিক তথ্য",
      fullName:"পূর্ণ নাম",aadhaar:"আধার নম্বর",gender:"লিঙ্গ",dob:"জন্ম তারিখ",dod:"মৃত্যুর তারিখ",pob:"জন্মস্থান",pod:"মৃত্যুর স্থান",
      parents:"পিতা-মাতা",father:"পিতার নাম",mother:"মাতার নাম",spouse:"স্বামী/স্ত্রীর নাম",fatherAadhaar:"পিতার আধার",
      motherAadhaar:"মাতার আধার",address:"ঠিকানা",addressBirth:"জন্মের সময় ঠিকানা",addressDeath:"মৃত্যুর সময় ঠিকানা",
      permanent:"স্থায়ী ঠিকানা",registration:"নিবন্ধন",regNo:"নিবন্ধন নম্বর",regDate:"নিবন্ধনের তারিখ",
      issueDate:"জারির তারিখ",remarks:"মন্তব্য",saveBirth:"জন্ম সনদ সংরক্ষণ করুন",saveDeath:"মৃত্যু সনদ সংরক্ষণ করুন",
      selectState:"রাজ্য নির্বাচন করুন",selectDistrict:"জেলা নির্বাচন করুন",selectAuthority:"হাসপাতাল / সংস্থা নির্বাচন করুন"
    },
    as:{
      birthTitle:"সকলো ৰাজ্য জন্ম পঞ্জীয়ন",deathTitle:"সকলো ৰাজ্য মৃত্যু পঞ্জীয়ন",state:"ৰাজ্য",district:"জিলা",
      localBody:"চিকিৎসালয় / স্থানীয় সংস্থা",childInfo:"শিশুৰ তথ্য",deceasedInfo:"মৃত ব্যক্তি",family:"পৰিয়ালৰ তথ্য",
      fullName:"সম্পূৰ্ণ নাম",aadhaar:"আধাৰ নম্বৰ",gender:"লিংগ",dob:"জন্ম তাৰিখ",dod:"মৃত্যুৰ তাৰিখ",pob:"জন্ম স্থান",pod:"মৃত্যু স্থান",
      parents:"পিতৃ-মাতৃ",father:"পিতৃৰ নাম",mother:"মাতৃৰ নাম",spouse:"স্বামী/স্ত্ৰীৰ নাম",address:"ঠিকনা",
      permanent:"স্থায়ী ঠিকনা",registration:"পঞ্জীয়ন",regNo:"পঞ্জীয়ন নম্বৰ",regDate:"পঞ্জীয়ন তাৰিখ",
      issueDate:"জাৰী তাৰিখ",remarks:"মন্তব্য",saveBirth:"জন্ম প্ৰমাণপত্ৰ সংৰক্ষণ কৰক",saveDeath:"মৃত্যু প্ৰমাণপত্ৰ সংৰক্ষণ কৰক",
      selectState:"ৰাজ্য বাছক",selectDistrict:"জিলা বাছক",selectAuthority:"চিকিৎসালয় / সংস্থা বাছক"
    },
    or:{
      birthTitle:"ସମସ୍ତ ରାଜ୍ୟ ଜନ୍ମ ପଞ୍ଜିକରଣ",deathTitle:"ସମସ୍ତ ରାଜ୍ୟ ମୃତ୍ୟୁ ପଞ୍ଜିକରଣ",state:"ରାଜ୍ୟ",district:"ଜିଲ୍ଲା",
      localBody:"ହସ୍ପିଟାଲ / ସ୍ଥାନୀୟ ସଂସ୍ଥା",childInfo:"ଶିଶୁ ସୂଚନା",deceasedInfo:"ମୃତ ବ୍ୟକ୍ତି",family:"ପରିବାର ବିବରଣୀ",
      fullName:"ପୂର୍ଣ୍ଣ ନାମ",aadhaar:"ଆଧାର ନମ୍ବର",gender:"ଲିଙ୍ଗ",dob:"ଜନ୍ମ ତାରିଖ",dod:"ମୃତ୍ୟୁ ତାରିଖ",
      pob:"ଜନ୍ମ ସ୍ଥାନ",pod:"ମୃତ୍ୟୁ ସ୍ଥାନ",parents:"ମାତାପିତା",father:"ପିତାଙ୍କ ନାମ",mother:"ମାତାଙ୍କ ନାମ",
      spouse:"ସ୍ୱାମୀ/ସ୍ତ୍ରୀଙ୍କ ନାମ",address:"ଠିକଣା",permanent:"ସ୍ଥାୟୀ ଠିକଣା",registration:"ପଞ୍ଜିକରଣ",
      regNo:"ପଞ୍ଜିକରଣ ନମ୍ବର",regDate:"ପଞ୍ଜିକରଣ ତାରିଖ",issueDate:"ଜାରି ତାରିଖ",remarks:"ମନ୍ତବ୍ୟ",
      saveBirth:"ଜନ୍ମ ପ୍ରମାଣପତ୍ର ସଂରକ୍ଷଣ",saveDeath:"ମୃତ୍ୟୁ ପ୍ରମାଣପତ୍ର ସଂରକ୍ଷଣ",
      selectState:"ରାଜ୍ୟ ବାଛନ୍ତୁ",selectDistrict:"ଜିଲ୍ଲା ବାଛନ୍ତୁ",selectAuthority:"ହସ୍ପିଟାଲ / ସଂସ୍ଥା ବାଛନ୍ତୁ"
    },
    te:{
      birthTitle:"అన్ని రాష్ట్రాల జనన నమోదు",deathTitle:"అన్ని రాష్ట్రాల మరణ నమోదు",state:"రాష్ట్రం",district:"జిల్లా",
      localBody:"ఆసుపత్రి / స్థానిక సంస్థ",childInfo:"శిశువు సమాచారం",deceasedInfo:"మృత వ్యక్తి",family:"కుటుంబ వివరాలు",
      fullName:"పూర్తి పేరు",aadhaar:"ఆధార్ సంఖ్య",gender:"లింగం",dob:"జనన తేదీ",dod:"మరణ తేదీ",pob:"జనన స్థలం",pod:"మరణ స్థలం",
      parents:"తల్లిదండ్రులు",father:"తండ్రి పేరు",mother:"తల్లి పేరు",spouse:"భర్త/భార్య పేరు",address:"చిరునామా",
      permanent:"శాశ్వత చిరునామా",registration:"నమోదు",regNo:"నమోదు సంఖ్య",regDate:"నమోదు తేదీ",issueDate:"జారీ తేదీ",
      remarks:"గమనికలు",saveBirth:"జనన ధృవపత్రం సేవ్ చేయండి",saveDeath:"మరణ ధృవపత్రం సేవ్ చేయండి",
      selectState:"రాష్ట్రం ఎంచుకోండి",selectDistrict:"జిల్లా ఎంచుకోండి",selectAuthority:"ఆసుపత్రి / సంస్థ ఎంచుకోండి"
    },
    ta:{
      birthTitle:"அனைத்து மாநில பிறப்பு பதிவு",deathTitle:"அனைத்து மாநில இறப்பு பதிவு",state:"மாநிலம்",district:"மாவட்டம்",
      localBody:"மருத்துவமனை / உள்ளாட்சி அமைப்பு",childInfo:"குழந்தை தகவல்",deceasedInfo:"இறந்தவர்",family:"குடும்ப விவரங்கள்",
      fullName:"முழுப் பெயர்",aadhaar:"ஆதார் எண்",gender:"பாலினம்",dob:"பிறந்த தேதி",dod:"இறந்த தேதி",pob:"பிறந்த இடம்",pod:"இறந்த இடம்",
      parents:"பெற்றோர்",father:"தந்தை பெயர்",mother:"தாய் பெயர்",spouse:"கணவர்/மனைவி பெயர்",address:"முகவரி",
      permanent:"நிரந்தர முகவரி",registration:"பதிவு",regNo:"பதிவு எண்",regDate:"பதிவு தேதி",issueDate:"வெளியீட்டு தேதி",
      remarks:"குறிப்புகள்",saveBirth:"பிறப்பு சான்றிதழை சேமிக்கவும்",saveDeath:"இறப்பு சான்றிதழை சேமிக்கவும்",
      selectState:"மாநிலம் தேர்வு",selectDistrict:"மாவட்டம் தேர்வு",selectAuthority:"மருத்துவமனை / அமைப்பு தேர்வு"
    },
    kn:{
      birthTitle:"ಎಲ್ಲಾ ರಾಜ್ಯ ಜನನ ನೋಂದಣಿ",deathTitle:"ಎಲ್ಲಾ ರಾಜ್ಯ ಮರಣ ನೋಂದಣಿ",state:"ರಾಜ್ಯ",district:"ಜಿಲ್ಲೆ",
      localBody:"ಆಸ್ಪತ್ರೆ / ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ",childInfo:"ಮಗುವಿನ ಮಾಹಿತಿ",deceasedInfo:"ಮೃತ ವ್ಯಕ್ತಿ",family:"ಕುಟುಂಬ ವಿವರಗಳು",
      fullName:"ಪೂರ್ಣ ಹೆಸರು",aadhaar:"ಆಧಾರ್ ಸಂಖ್ಯೆ",gender:"ಲಿಂಗ",dob:"ಜನ್ಮ ದಿನಾಂಕ",dod:"ಮರಣ ದಿನಾಂಕ",pob:"ಜನ್ಮ ಸ್ಥಳ",pod:"ಮರಣ ಸ್ಥಳ",
      parents:"ಪೋಷಕರು",father:"ತಂದೆಯ ಹೆಸರು",mother:"ತಾಯಿಯ ಹೆಸರು",spouse:"ಗಂಡ/ಹೆಂಡತಿ ಹೆಸರು",address:"ವಿಳಾಸ",
      permanent:"ಶಾಶ್ವತ ವಿಳಾಸ",registration:"ನೋಂದಣಿ",regNo:"ನೋಂದಣಿ ಸಂಖ್ಯೆ",regDate:"ನೋಂದಣಿ ದಿನಾಂಕ",issueDate:"ಜಾರಿ ದಿನಾಂಕ",
      remarks:"ಟಿಪ್ಪಣಿ",saveBirth:"ಜನನ ಪ್ರಮಾಣಪತ್ರ ಉಳಿಸಿ",saveDeath:"ಮರಣ ಪ್ರಮಾಣಪತ್ರ ಉಳಿಸಿ",
      selectState:"ರಾಜ್ಯ ಆಯ್ಕೆ",selectDistrict:"ಜಿಲ್ಲೆ ಆಯ್ಕೆ",selectAuthority:"ಆಸ್ಪತ್ರೆ / ಸಂಸ್ಥೆ ಆಯ್ಕೆ"
    },
    ml:{
      birthTitle:"എല്ലാ സംസ്ഥാന ജനന രജിസ്ട്രേഷൻ",deathTitle:"എല്ലാ സംസ്ഥാന മരണ രജിസ്ട്രേഷൻ",state:"സംസ്ഥാനം",district:"ജില്ല",
      localBody:"ആശുപത്രി / പ്രാദേശിക സ്ഥാപനം",childInfo:"കുട്ടിയുടെ വിവരങ്ങൾ",deceasedInfo:"മരിച്ച വ്യക്തി",family:"കുടുംബ വിവരങ്ങൾ",
      fullName:"പൂർണ്ണ പേര്",aadhaar:"ആധാർ നമ്പർ",gender:"ലിംഗം",dob:"ജനന തീയതി",dod:"മരണ തീയതി",pob:"ജനന സ്ഥലം",pod:"മരണ സ്ഥലം",
      parents:"മാതാപിതാക്കൾ",father:"പിതാവിന്റെ പേര്",mother:"മാതാവിന്റെ പേര്",spouse:"ഭർത്താവ്/ഭാര്യയുടെ പേര്",address:"വിലാസം",
      permanent:"സ്ഥിര വിലാസം",registration:"രജിസ്ട്രേഷൻ",regNo:"രജിസ്ട്രേഷൻ നമ്പർ",regDate:"രജിസ്ട്രേഷൻ തീയതി",issueDate:"നൽകിയ തീയതി",
      remarks:"കുറിപ്പുകൾ",saveBirth:"ജനന സർട്ടിഫിക്കറ്റ് സംരക്ഷിക്കുക",saveDeath:"മരണ സർട്ടിഫിക്കറ്റ് സംരക്ഷിക്കുക",
      selectState:"സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",selectDistrict:"ജില്ല തിരഞ്ഞെടുക്കുക",selectAuthority:"ആശുപത്രി / സ്ഥാപനം തിരഞ്ഞെടുക്കുക"
    },
    ur:{
      birthTitle:"تمام ریاستوں کی پیدائش رجسٹریشن",deathTitle:"تمام ریاستوں کی وفات رجسٹریشن",state:"ریاست",district:"ضلع",
      localBody:"ہسپتال / مقامی ادارہ",childInfo:"بچے کی معلومات",deceasedInfo:"متوفی شخص",family:"خاندانی تفصیلات",
      fullName:"پورا نام",aadhaar:"آدھار نمبر",gender:"جنس",dob:"تاریخ پیدائش",dod:"تاریخ وفات",pob:"مقام پیدائش",pod:"مقام وفات",
      parents:"والدین",father:"والد کا نام",mother:"والدہ کا نام",spouse:"شوہر/بیوی کا نام",address:"پتہ",
      permanent:"مستقل پتہ",registration:"رجسٹریشن",regNo:"رجسٹریشن نمبر",regDate:"رجسٹریشن کی تاریخ",issueDate:"اجراء کی تاریخ",
      remarks:"تبصرہ",saveBirth:"پیدائش سرٹیفکیٹ محفوظ کریں",saveDeath:"وفات سرٹیفکیٹ محفوظ کریں",
      selectState:"ریاست منتخب کریں",selectDistrict:"ضلع منتخب کریں",selectAuthority:"ہسپتال / ادارہ منتخب کریں"
    }
  };

  function dict(lang){ return Object.assign({},T.en,T[lang]||{}); }

  function translateFormByStateCode(code){
    const lang=STATE_LANGUAGE[code]||"hi";
    const d=dict(lang);
    document.documentElement.lang=lang;
    document.documentElement.dir=(lang==="ur"?"rtl":"ltr");

    const type=window.CERTIFICATE_TYPE||"birth";
    const title=document.querySelector(".content header h1");
    if(title) title.textContent= type==="birth"?d.birthTitle:d.deathTitle;

    const map = {
      state:d.state,district:d.district,localBody:d.localBody,personName:d.fullName,aadhaar:d.aadhaar,gender:d.gender,
      eventDate:type==="birth"?d.dob:d.dod,eventPlace:type==="birth"?d.pob:d.pod,
      fatherName:d.father,motherName:d.mother,spouseName:d.spouse,fatherAadhaar:d.fatherAadhaar,motherAadhaar:d.motherAadhaar,
      addressEvent:type==="birth"?d.addressBirth:d.addressDeath,permanentAddress:d.permanent,registrationNumber:d.regNo,
      registrationDate:d.regDate,issueDate:d.issueDate,remarks:d.remarks
    };

    Object.entries(map).forEach(([id,text])=>{
      const el=document.getElementById(id); if(!el)return;
      const label=el.closest("label"); if(label && label.firstChild) label.firstChild.nodeValue=text;
    });

    const heads=[...document.querySelectorAll(".form-grid h3")];
    heads.forEach(h=>{
      const original=(h.dataset.i18nKey||h.textContent.trim());
      if(!h.dataset.i18nKey) h.dataset.i18nKey=original;
      if(/Child Information/i.test(original)) h.textContent=d.childInfo;
      else if(/Deceased Person/i.test(original)) h.textContent=d.deceasedInfo;
      else if(/Parents/i.test(original)) h.textContent=d.parents;
      else if(/Family Details/i.test(original)) h.textContent=d.family;
      else if(/Address/i.test(original)) h.textContent=d.address;
      else if(/Registration/i.test(original)) h.textContent=d.registration;
    });

    const save=document.querySelector('#certificateForm button[type="submit"]');
    if(save) save.textContent=type==="birth"?d.saveBirth:d.saveDeath;

    if(state?.options?.length) state.options[0].text=d.selectState;
    if(district?.options?.length) district.options[0].text=d.selectDistrict;
    if(localBody?.options?.length) localBody.options[0].text=d.selectAuthority;

    let badge=document.getElementById("autoLanguageBadge");
    if(!badge){
      badge=document.createElement("div"); badge.id="autoLanguageBadge"; badge.className="language-badge";
      document.querySelector(".content header")?.appendChild(badge);
    }
    badge.textContent="Auto Language: "+(LANG_NAME[lang]||lang);
    window.BIRTH_PORTAL_ACTIVE_LANGUAGE=lang;
  }

  window.birthPortalStateLanguage={STATE_LANGUAGE,LANG_NAME,T,translateFormByStateCode};
})();

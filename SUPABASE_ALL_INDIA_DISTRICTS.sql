-- ALL INDIA DISTRICTS SEED
-- Safe to run repeatedly.


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Nicobars'),
  ('North and Middle Andaman'),
  ('South Andaman')
) as d(name)
where s.code='AN'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Alluri Sitharama Raju'),
  ('Anakapalli'),
  ('Anantapuramu'),
  ('Annamayya'),
  ('Bapatla'),
  ('Chittoor'),
  ('Dr. B.R. Ambedkar Konaseema'),
  ('East Godavari'),
  ('Eluru'),
  ('Guntur'),
  ('Kakinada'),
  ('Krishna'),
  ('Kurnool'),
  ('Nandyal'),
  ('NTR'),
  ('Palnadu'),
  ('Parvathipuram Manyam'),
  ('Prakasam'),
  ('Sri Potti Sriramulu Nellore'),
  ('Sri Sathya Sai'),
  ('Srikakulam'),
  ('Tirupati'),
  ('Visakhapatnam'),
  ('Vizianagaram'),
  ('West Godavari'),
  ('YSR Kadapa')
) as d(name)
where s.code='AP'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Anjaw'),
  ('Changlang'),
  ('Dibang Valley'),
  ('East Kameng'),
  ('East Siang'),
  ('Kamle'),
  ('Keyi Panyor'),
  ('Kra Daadi'),
  ('Kurung Kumey'),
  ('Leparada'),
  ('Lohit'),
  ('Longding'),
  ('Lower Dibang Valley'),
  ('Lower Siang'),
  ('Lower Subansiri'),
  ('Namsai'),
  ('Pakke Kessang'),
  ('Papum Pare'),
  ('Shi Yomi'),
  ('Siang'),
  ('Tawang'),
  ('Tirap'),
  ('Upper Siang'),
  ('Upper Subansiri'),
  ('West Kameng'),
  ('West Siang')
) as d(name)
where s.code='AR'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Bajali'),
  ('Baksa'),
  ('Barpeta'),
  ('Biswanath'),
  ('Bongaigaon'),
  ('Cachar'),
  ('Charaideo'),
  ('Chirang'),
  ('Darrang'),
  ('Dhemaji'),
  ('Dhubri'),
  ('Dibrugarh'),
  ('Dima Hasao'),
  ('Goalpara'),
  ('Golaghat'),
  ('Hailakandi'),
  ('Hojai'),
  ('Jorhat'),
  ('Kamrup'),
  ('Kamrup Metropolitan'),
  ('Karbi Anglong'),
  ('Kokrajhar'),
  ('Lakhimpur'),
  ('Majuli'),
  ('Morigaon'),
  ('Nagaon'),
  ('Nalbari'),
  ('Sivasagar'),
  ('Sonitpur'),
  ('South Salmara-Mankachar'),
  ('Tamulpur'),
  ('Tinsukia'),
  ('Udalguri'),
  ('West Karbi Anglong')
) as d(name)
where s.code='AS'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Araria'),
  ('Arwal'),
  ('Aurangabad'),
  ('Banka'),
  ('Begusarai'),
  ('Bhagalpur'),
  ('Bhojpur'),
  ('Buxar'),
  ('Darbhanga'),
  ('East Champaran'),
  ('Gaya'),
  ('Gopalganj'),
  ('Jamui'),
  ('Jehanabad'),
  ('Kaimur'),
  ('Katihar'),
  ('Khagaria'),
  ('Kishanganj'),
  ('Lakhisarai'),
  ('Madhepura'),
  ('Madhubani'),
  ('Munger'),
  ('Muzaffarpur'),
  ('Nalanda'),
  ('Nawada'),
  ('Patna'),
  ('Purnia'),
  ('Rohtas'),
  ('Saharsa'),
  ('Samastipur'),
  ('Saran'),
  ('Sheikhpura'),
  ('Sheohar'),
  ('Sitamarhi'),
  ('Siwan'),
  ('Supaul'),
  ('Vaishali'),
  ('West Champaran')
) as d(name)
where s.code='BR'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Chandigarh')
) as d(name)
where s.code='CH'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Balod'),
  ('Baloda Bazar-Bhatapara'),
  ('Balrampur'),
  ('Bastar'),
  ('Bemetara'),
  ('Bijapur'),
  ('Bilaspur'),
  ('Dantewada'),
  ('Dhamtari'),
  ('Durg'),
  ('Gariaband'),
  ('Gaurela-Pendra-Marwahi'),
  ('Janjgir-Champa'),
  ('Jashpur'),
  ('Kabirdham'),
  ('Kanker'),
  ('Khairagarh-Chhuikhadan-Gandai'),
  ('Kondagaon'),
  ('Korba'),
  ('Koriya'),
  ('Mahasamund'),
  ('Manendragarh-Chirmiri-Bharatpur'),
  ('Mohla-Manpur-Ambagarh Chowki'),
  ('Mungeli'),
  ('Narayanpur'),
  ('Raigarh'),
  ('Raipur'),
  ('Rajnandgaon'),
  ('Sakti'),
  ('Sarangarh-Bilaigarh'),
  ('Sukma'),
  ('Surajpur'),
  ('Surguja')
) as d(name)
where s.code='CG'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Dadra and Nagar Haveli'),
  ('Daman'),
  ('Diu')
) as d(name)
where s.code='DN'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Central Delhi'),
  ('East Delhi'),
  ('New Delhi'),
  ('North Delhi'),
  ('North East Delhi'),
  ('North West Delhi'),
  ('Shahdara'),
  ('South Delhi'),
  ('South East Delhi'),
  ('South West Delhi'),
  ('West Delhi')
) as d(name)
where s.code='DL'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('North Goa'),
  ('South Goa')
) as d(name)
where s.code='GA'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Ahmedabad'),
  ('Amreli'),
  ('Anand'),
  ('Aravalli'),
  ('Banaskantha'),
  ('Bharuch'),
  ('Bhavnagar'),
  ('Botad'),
  ('Chhota Udaipur'),
  ('Dahod'),
  ('Dang'),
  ('Devbhoomi Dwarka'),
  ('Gandhinagar'),
  ('Gir Somnath'),
  ('Jamnagar'),
  ('Junagadh'),
  ('Kheda'),
  ('Kutch'),
  ('Mahisagar'),
  ('Mehsana'),
  ('Morbi'),
  ('Narmada'),
  ('Navsari'),
  ('Panchmahal'),
  ('Patan'),
  ('Porbandar'),
  ('Rajkot'),
  ('Sabarkantha'),
  ('Surat'),
  ('Surendranagar'),
  ('Tapi'),
  ('Vadodara'),
  ('Valsad')
) as d(name)
where s.code='GJ'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Ambala'),
  ('Bhiwani'),
  ('Charkhi Dadri'),
  ('Faridabad'),
  ('Fatehabad'),
  ('Gurugram'),
  ('Hisar'),
  ('Jhajjar'),
  ('Jind'),
  ('Kaithal'),
  ('Karnal'),
  ('Kurukshetra'),
  ('Mahendragarh'),
  ('Nuh'),
  ('Palwal'),
  ('Panchkula'),
  ('Panipat'),
  ('Rewari'),
  ('Rohtak'),
  ('Sirsa'),
  ('Sonipat'),
  ('Yamunanagar')
) as d(name)
where s.code='HR'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Bilaspur'),
  ('Chamba'),
  ('Hamirpur'),
  ('Kangra'),
  ('Kinnaur'),
  ('Kullu'),
  ('Lahaul and Spiti'),
  ('Mandi'),
  ('Shimla'),
  ('Sirmaur'),
  ('Solan'),
  ('Una')
) as d(name)
where s.code='HP'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Anantnag'),
  ('Bandipora'),
  ('Baramulla'),
  ('Budgam'),
  ('Doda'),
  ('Ganderbal'),
  ('Jammu'),
  ('Kathua'),
  ('Kishtwar'),
  ('Kulgam'),
  ('Kupwara'),
  ('Poonch'),
  ('Pulwama'),
  ('Rajouri'),
  ('Ramban'),
  ('Reasi'),
  ('Samba'),
  ('Shopian'),
  ('Srinagar'),
  ('Udhampur')
) as d(name)
where s.code='JK'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Bokaro'),
  ('Chatra'),
  ('Deoghar'),
  ('Dhanbad'),
  ('Dumka'),
  ('East Singhbhum'),
  ('Garhwa'),
  ('Giridih'),
  ('Godda'),
  ('Gumla'),
  ('Hazaribagh'),
  ('Jamtara'),
  ('Khunti'),
  ('Koderma'),
  ('Latehar'),
  ('Lohardaga'),
  ('Pakur'),
  ('Palamu'),
  ('Ramgarh'),
  ('Ranchi'),
  ('Sahibganj'),
  ('Seraikela Kharsawan'),
  ('Simdega'),
  ('West Singhbhum')
) as d(name)
where s.code='JH'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Bagalkot'),
  ('Ballari'),
  ('Belagavi'),
  ('Bengaluru Rural'),
  ('Bengaluru Urban'),
  ('Bidar'),
  ('Chamarajanagar'),
  ('Chikkaballapur'),
  ('Chikkamagaluru'),
  ('Chitradurga'),
  ('Dakshina Kannada'),
  ('Davanagere'),
  ('Dharwad'),
  ('Gadag'),
  ('Hassan'),
  ('Haveri'),
  ('Kalaburagi'),
  ('Kodagu'),
  ('Kolar'),
  ('Koppal'),
  ('Mandya'),
  ('Mysuru'),
  ('Raichur'),
  ('Ramanagara'),
  ('Shivamogga'),
  ('Tumakuru'),
  ('Udupi'),
  ('Uttara Kannada'),
  ('Vijayapura'),
  ('Vijayanagara'),
  ('Yadgir')
) as d(name)
where s.code='KA'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Alappuzha'),
  ('Ernakulam'),
  ('Idukki'),
  ('Kannur'),
  ('Kasaragod'),
  ('Kollam'),
  ('Kottayam'),
  ('Kozhikode'),
  ('Malappuram'),
  ('Palakkad'),
  ('Pathanamthitta'),
  ('Thiruvananthapuram'),
  ('Thrissur'),
  ('Wayanad')
) as d(name)
where s.code='KL'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Kargil'),
  ('Leh')
) as d(name)
where s.code='LA'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Lakshadweep')
) as d(name)
where s.code='LD'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Agar Malwa'),
  ('Alirajpur'),
  ('Anuppur'),
  ('Ashoknagar'),
  ('Balaghat'),
  ('Barwani'),
  ('Betul'),
  ('Bhind'),
  ('Bhopal'),
  ('Burhanpur'),
  ('Chhatarpur'),
  ('Chhindwara'),
  ('Damoh'),
  ('Datia'),
  ('Dewas'),
  ('Dhar'),
  ('Dindori'),
  ('Guna'),
  ('Gwalior'),
  ('Harda'),
  ('Indore'),
  ('Jabalpur'),
  ('Jhabua'),
  ('Katni'),
  ('Khandwa'),
  ('Khargone'),
  ('Maihar'),
  ('Mandla'),
  ('Mandsaur'),
  ('Mauganj'),
  ('Morena'),
  ('Narmadapuram'),
  ('Narsinghpur'),
  ('Neemuch'),
  ('Niwari'),
  ('Pandhurna'),
  ('Panna'),
  ('Raisen'),
  ('Rajgarh'),
  ('Ratlam'),
  ('Rewa'),
  ('Sagar'),
  ('Satna'),
  ('Sehore'),
  ('Seoni'),
  ('Shahdol'),
  ('Shajapur'),
  ('Sheopur'),
  ('Shivpuri'),
  ('Sidhi'),
  ('Singrauli'),
  ('Tikamgarh'),
  ('Ujjain'),
  ('Umaria'),
  ('Vidisha')
) as d(name)
where s.code='MP'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Ahmednagar'),
  ('Akola'),
  ('Amravati'),
  ('Beed'),
  ('Bhandara'),
  ('Buldhana'),
  ('Chandrapur'),
  ('Chhatrapati Sambhajinagar'),
  ('Dharashiv'),
  ('Dhule'),
  ('Gadchiroli'),
  ('Gondia'),
  ('Hingoli'),
  ('Jalgaon'),
  ('Jalna'),
  ('Kolhapur'),
  ('Latur'),
  ('Mumbai City'),
  ('Mumbai Suburban'),
  ('Nagpur'),
  ('Nanded'),
  ('Nandurbar'),
  ('Nashik'),
  ('Palghar'),
  ('Parbhani'),
  ('Pune'),
  ('Raigad'),
  ('Ratnagiri'),
  ('Sangli'),
  ('Satara'),
  ('Sindhudurg'),
  ('Solapur'),
  ('Thane'),
  ('Wardha'),
  ('Washim'),
  ('Yavatmal')
) as d(name)
where s.code='MH'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Bishnupur'),
  ('Chandel'),
  ('Churachandpur'),
  ('Imphal East'),
  ('Imphal West'),
  ('Jiribam'),
  ('Kakching'),
  ('Kamjong'),
  ('Kangpokpi'),
  ('Noney'),
  ('Pherzawl'),
  ('Senapati'),
  ('Tamenglong'),
  ('Tengnoupal'),
  ('Thoubal'),
  ('Ukhrul')
) as d(name)
where s.code='MN'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('East Garo Hills'),
  ('East Jaintia Hills'),
  ('East Khasi Hills'),
  ('Eastern West Khasi Hills'),
  ('North Garo Hills'),
  ('Ri Bhoi'),
  ('South Garo Hills'),
  ('South West Garo Hills'),
  ('South West Khasi Hills'),
  ('West Garo Hills'),
  ('West Jaintia Hills'),
  ('West Khasi Hills')
) as d(name)
where s.code='ML'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Aizawl'),
  ('Champhai'),
  ('Hnahthial'),
  ('Khawzawl'),
  ('Kolasib'),
  ('Lawngtlai'),
  ('Lunglei'),
  ('Mamit'),
  ('Saiha'),
  ('Saitual'),
  ('Serchhip')
) as d(name)
where s.code='MZ'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Chumoukedima'),
  ('Dimapur'),
  ('Kiphire'),
  ('Kohima'),
  ('Longleng'),
  ('Mokokchung'),
  ('Mon'),
  ('Niuland'),
  ('Noklak'),
  ('Peren'),
  ('Phek'),
  ('Shamator'),
  ('Tseminyu'),
  ('Tuensang'),
  ('Wokha'),
  ('Zunheboto')
) as d(name)
where s.code='NL'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Angul'),
  ('Balangir'),
  ('Balasore'),
  ('Bargarh'),
  ('Bhadrak'),
  ('Boudh'),
  ('Cuttack'),
  ('Deogarh'),
  ('Dhenkanal'),
  ('Gajapati'),
  ('Ganjam'),
  ('Jagatsinghpur'),
  ('Jajpur'),
  ('Jharsuguda'),
  ('Kalahandi'),
  ('Kandhamal'),
  ('Kendrapara'),
  ('Kendujhar'),
  ('Khordha'),
  ('Koraput'),
  ('Malkangiri'),
  ('Mayurbhanj'),
  ('Nabarangpur'),
  ('Nayagarh'),
  ('Nuapada'),
  ('Puri'),
  ('Rayagada'),
  ('Sambalpur'),
  ('Subarnapur'),
  ('Sundargarh')
) as d(name)
where s.code='OD'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Karaikal'),
  ('Mahe'),
  ('Puducherry'),
  ('Yanam')
) as d(name)
where s.code='PY'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Amritsar'),
  ('Barnala'),
  ('Bathinda'),
  ('Faridkot'),
  ('Fatehgarh Sahib'),
  ('Fazilka'),
  ('Ferozepur'),
  ('Gurdaspur'),
  ('Hoshiarpur'),
  ('Jalandhar'),
  ('Kapurthala'),
  ('Ludhiana'),
  ('Malerkotla'),
  ('Mansa'),
  ('Moga'),
  ('Pathankot'),
  ('Patiala'),
  ('Rupnagar'),
  ('Sahibzada Ajit Singh Nagar'),
  ('Sangrur'),
  ('Shaheed Bhagat Singh Nagar'),
  ('Sri Muktsar Sahib'),
  ('Tarn Taran')
) as d(name)
where s.code='PB'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Ajmer'),
  ('Alwar'),
  ('Anupgarh'),
  ('Balotra'),
  ('Banswara'),
  ('Baran'),
  ('Barmer'),
  ('Beawar'),
  ('Bharatpur'),
  ('Bhilwara'),
  ('Bikaner'),
  ('Bundi'),
  ('Chittorgarh'),
  ('Churu'),
  ('Dausa'),
  ('Deeg'),
  ('Dholpur'),
  ('Didwana-Kuchaman'),
  ('Dudu'),
  ('Dungarpur'),
  ('Gangapur City'),
  ('Hanumangarh'),
  ('Jaipur'),
  ('Jaipur Rural'),
  ('Jaisalmer'),
  ('Jalore'),
  ('Jhalawar'),
  ('Jhunjhunu'),
  ('Jodhpur'),
  ('Jodhpur Rural'),
  ('Karauli'),
  ('Kekri'),
  ('Khairthal-Tijara'),
  ('Kota'),
  ('Kotputli-Behror'),
  ('Nagaur'),
  ('Neem Ka Thana'),
  ('Pali'),
  ('Phalodi'),
  ('Pratapgarh'),
  ('Rajsamand'),
  ('Salumbar'),
  ('Sanchore'),
  ('Sawai Madhopur'),
  ('Shahpura'),
  ('Sikar'),
  ('Sirohi'),
  ('Sri Ganganagar'),
  ('Tonk'),
  ('Udaipur')
) as d(name)
where s.code='RJ'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Gangtok'),
  ('Gyalshing'),
  ('Mangan'),
  ('Namchi'),
  ('Pakyong'),
  ('Soreng')
) as d(name)
where s.code='SK'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Ariyalur'),
  ('Chengalpattu'),
  ('Chennai'),
  ('Coimbatore'),
  ('Cuddalore'),
  ('Dharmapuri'),
  ('Dindigul'),
  ('Erode'),
  ('Kallakurichi'),
  ('Kancheepuram'),
  ('Kanniyakumari'),
  ('Karur'),
  ('Krishnagiri'),
  ('Madurai'),
  ('Mayiladuthurai'),
  ('Nagapattinam'),
  ('Namakkal'),
  ('Nilgiris'),
  ('Perambalur'),
  ('Pudukkottai'),
  ('Ramanathapuram'),
  ('Ranipet'),
  ('Salem'),
  ('Sivaganga'),
  ('Tenkasi'),
  ('Thanjavur'),
  ('Theni'),
  ('Thoothukudi'),
  ('Tiruchirappalli'),
  ('Tirunelveli'),
  ('Tirupathur'),
  ('Tiruppur'),
  ('Tiruvallur'),
  ('Tiruvannamalai'),
  ('Tiruvarur'),
  ('Vellore'),
  ('Viluppuram'),
  ('Virudhunagar')
) as d(name)
where s.code='TN'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Adilabad'),
  ('Bhadradri Kothagudem'),
  ('Hanumakonda'),
  ('Hyderabad'),
  ('Jagtial'),
  ('Jangaon'),
  ('Jayashankar Bhupalpally'),
  ('Jogulamba Gadwal'),
  ('Kamareddy'),
  ('Karimnagar'),
  ('Khammam'),
  ('Komaram Bheem Asifabad'),
  ('Mahabubabad'),
  ('Mahabubnagar'),
  ('Mancherial'),
  ('Medak'),
  ('Medchal-Malkajgiri'),
  ('Mulugu'),
  ('Nagarkurnool'),
  ('Nalgonda'),
  ('Narayanpet'),
  ('Nirmal'),
  ('Nizamabad'),
  ('Peddapalli'),
  ('Rajanna Sircilla'),
  ('Rangareddy'),
  ('Sangareddy'),
  ('Siddipet'),
  ('Suryapet'),
  ('Vikarabad'),
  ('Wanaparthy'),
  ('Warangal'),
  ('Yadadri Bhuvanagiri')
) as d(name)
where s.code='TS'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Dhalai'),
  ('Gomati'),
  ('Khowai'),
  ('North Tripura'),
  ('Sepahijala'),
  ('South Tripura'),
  ('Unakoti'),
  ('West Tripura')
) as d(name)
where s.code='TR'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Agra'),
  ('Aligarh'),
  ('Ambedkar Nagar'),
  ('Amethi'),
  ('Amroha'),
  ('Auraiya'),
  ('Ayodhya'),
  ('Azamgarh'),
  ('Baghpat'),
  ('Bahraich'),
  ('Ballia'),
  ('Balrampur'),
  ('Banda'),
  ('Barabanki'),
  ('Bareilly'),
  ('Basti'),
  ('Bhadohi'),
  ('Bijnor'),
  ('Budaun'),
  ('Bulandshahr'),
  ('Chandauli'),
  ('Chitrakoot'),
  ('Deoria'),
  ('Etah'),
  ('Etawah'),
  ('Farrukhabad'),
  ('Fatehpur'),
  ('Firozabad'),
  ('Gautam Buddha Nagar'),
  ('Ghaziabad'),
  ('Ghazipur'),
  ('Gonda'),
  ('Gorakhpur'),
  ('Hamirpur'),
  ('Hapur'),
  ('Hardoi'),
  ('Hathras'),
  ('Jalaun'),
  ('Jaunpur'),
  ('Jhansi'),
  ('Kannauj'),
  ('Kanpur Dehat'),
  ('Kanpur Nagar'),
  ('Kasganj'),
  ('Kaushambi'),
  ('Kheri'),
  ('Kushinagar'),
  ('Lalitpur'),
  ('Lucknow'),
  ('Maharajganj'),
  ('Mahoba'),
  ('Mainpuri'),
  ('Mathura'),
  ('Mau'),
  ('Meerut'),
  ('Mirzapur'),
  ('Moradabad'),
  ('Muzaffarnagar'),
  ('Pilibhit'),
  ('Pratapgarh'),
  ('Prayagraj'),
  ('Raebareli'),
  ('Rampur'),
  ('Saharanpur'),
  ('Sambhal'),
  ('Sant Kabir Nagar'),
  ('Shahjahanpur'),
  ('Shamli'),
  ('Shravasti'),
  ('Siddharthnagar'),
  ('Sitapur'),
  ('Sonbhadra'),
  ('Sultanpur'),
  ('Unnao'),
  ('Varanasi')
) as d(name)
where s.code='UP'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Almora'),
  ('Bageshwar'),
  ('Chamoli'),
  ('Champawat'),
  ('Dehradun'),
  ('Haridwar'),
  ('Nainital'),
  ('Pauri Garhwal'),
  ('Pithoragarh'),
  ('Rudraprayag'),
  ('Tehri Garhwal'),
  ('Udham Singh Nagar'),
  ('Uttarkashi')
) as d(name)
where s.code='UK'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);


insert into public.districts (state_id, name_en)
select s.id, d.name
from public.states s
cross join (values
  ('Alipurduar'),
  ('Bankura'),
  ('Birbhum'),
  ('Cooch Behar'),
  ('Dakshin Dinajpur'),
  ('Darjeeling'),
  ('Hooghly'),
  ('Howrah'),
  ('Jalpaiguri'),
  ('Jhargram'),
  ('Kalimpong'),
  ('Kolkata'),
  ('Malda'),
  ('Murshidabad'),
  ('Nadia'),
  ('North 24 Parganas'),
  ('Paschim Bardhaman'),
  ('Paschim Medinipur'),
  ('Purba Bardhaman'),
  ('Purba Medinipur'),
  ('Purulia'),
  ('South 24 Parganas'),
  ('Uttar Dinajpur')
) as d(name)
where s.code='WB'
and not exists (
  select 1 from public.districts x
  where x.state_id=s.id and lower(x.name_en)=lower(d.name)
);

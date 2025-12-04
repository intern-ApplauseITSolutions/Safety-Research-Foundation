import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Users, ArrowRight, Clock, Tag, Youtube, FileText, Play, ExternalLink, Quote, Star, Image, Video, Newspaper, Headphones, BookOpen, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import eBooks
import braceHandbook from '../../../assets/ebooks/BRACE-Handbook.pdf';
import roadwiseKannada from '../../../assets/ebooks/ROADWISE-Kannada.pdf';

// Import Audio files - BOSCH Creatives
import audio1 from '../../../assets/images/BOSCH creative 01 (15 secs) NEW rev.mp3';
import audio2 from '../../../assets/images/BOSCH creative 02 (15 secs) NEW rev.mp3';
import audio3 from '../../../assets/images/BOSCH creative 03 (15 secs) NEW rev.mp3';
import audio4 from '../../../assets/images/BOSCH creative 04 (15 secs) NEW rev.mp3';
import audio5 from '../../../assets/images/BOSCH creative 05 (15 secs) NEW rev.mp3';
import audio6 from '../../../assets/images/BOSCH creative 06 (15 secs) NEW rev.mp3';
import audio7 from '../../../assets/images/BOSCH creative 07 (15 secs) NEW rev.mp3';
import audio8 from '../../../assets/images/BOSCH creative 08 (15 secs) NEW rev.mp3';
import audio9 from '../../../assets/images/BOSCH creative 09 (15 secs) NEW rev.mp3';
import audio10 from '../../../assets/images/BOSCH creative 10 (15 secs) NEW rev.mp3';
import audio11 from '../../../assets/images/BOSCH creative 11 (15 secs) NEW rev.mp3';
import audio12 from '../../../assets/images/BOSCH creative 12 (15 secs) NEW rev.mp3';

// Import Child Safety Seat Awareness Session images
import childSafety1 from '../../../assets/images/ChildSafetySeatAwarenessSession/IMG-20250112-WA0001.jpg';
import childSafety2 from '../../../assets/images/ChildSafetySeatAwarenessSession/IMG-20250112-WA0003.jpg';
import childSafety3 from '../../../assets/images/ChildSafetySeatAwarenessSession/IMG-20250112-WA0005.jpg';
import childSafety4 from '../../../assets/images/ChildSafetySeatAwarenessSession/IMG-20250112-WA0006.jpg';
import childSafety5 from '../../../assets/images/ChildSafetySeatAwarenessSession/IMG-20250112-WA0014.jpg';

// Import Road Safety Awareness Program images from St Joseph Boys High School
import stJoseph1 from '../../../assets/images/RoadSafetyAwarenessProgram –01&02Sep2022/IMG_20220901_134547-scaled.jpg';
import stJoseph2 from '../../../assets/images/RoadSafetyAwarenessProgram –01&02Sep2022/IMG_20220901_150535-1.jpg';
import stJoseph3 from '../../../assets/images/RoadSafetyAwarenessProgram –01&02Sep2022/IMG_20220902_134613-scaled.jpg';
import stJoseph4 from '../../../assets/images/RoadSafetyAwarenessProgram –01&02Sep2022/IMG_20220902_1412231-scaled-e1662963720705.jpg';

// Import Road Safety Awareness Program images from St Arnolds Central School
import stArnolds1 from '../../../assets/images/RoadSafetyAwarenessProgram–StArnoldsCentralSchoolPune.@29thJuly2022/29th-St-Arnolds-1-1-scaled.jpg';
import stArnolds2 from '../../../assets/images/RoadSafetyAwarenessProgram–StArnoldsCentralSchoolPune.@29thJuly2022/29th-St-Arnolds-2-2-2-scaled.jpg';
import stArnolds3 from '../../../assets/images/RoadSafetyAwarenessProgram–StArnoldsCentralSchoolPune.@29thJuly2022/29th-St-Arnolds-3-1-scaled.jpg';
import stArnolds4 from '../../../assets/images/RoadSafetyAwarenessProgram–StArnoldsCentralSchoolPune.@29thJuly2022/29th-St-Arnolds-4-1-1-scaled.jpg';

// Import Road Safety Awareness Program images from St Arnolds School Wadgaon Shari
import stArnoldsWadgaon1 from '../../../assets/images/Road SafetyAwarenessProgram–StArnoldSchoolPune.@22ndJuly2022/22nd-St-Arnolds-1-2-scaled.jpg';
import stArnoldsWadgaon2 from '../../../assets/images/Road SafetyAwarenessProgram–StArnoldSchoolPune.@22ndJuly2022/22nd-St-Arnolds-2-1-1-scaled.jpg';
import stArnoldsWadgaon3 from '../../../assets/images/Road SafetyAwarenessProgram–StArnoldSchoolPune.@22ndJuly2022/22nd-St-Arnolds-3-1-1-scaled.jpg';
import stArnoldsWadgaon4 from '../../../assets/images/Road SafetyAwarenessProgram–StArnoldSchoolPune.@22ndJuly2022/22nd-St-Arnolds-4-1-scaled.jpg';

// Import Road Safety Awareness Program images from Apte Prashala
import aptePrashala1 from '../../../assets/images/Road SafetyAwarenessProgram–AptePrashalaDeccanGymkhanaPune. @12thJuly2022/12th-Apte-School-1-1-scaled.jpg';
import aptePrashala2 from '../../../assets/images/Road SafetyAwarenessProgram–AptePrashalaDeccanGymkhanaPune. @12thJuly2022/12th-Apte-school-2-1-scaled.jpg';
import aptePrashala3 from '../../../assets/images/Road SafetyAwarenessProgram–AptePrashalaDeccanGymkhanaPune. @12thJuly2022/12th-Apte-School-3-1.jpg';
import aptePrashala4 from '../../../assets/images/Road SafetyAwarenessProgram–AptePrashalaDeccanGymkhanaPune. @12thJuly2022/12th-Apte-school-4-1.jpg';

// Import Go Yellow Road Safety Awareness Campaign images
import goYellow1 from '../../../assets/images/GoYellowRoadSafetyAwareness25th&26thFeb2022/1.jpg';
import goYellow2 from '../../../assets/images/GoYellowRoadSafetyAwareness25th&26thFeb2022/2.jpg';
import goYellow3 from '../../../assets/images/GoYellowRoadSafetyAwareness25th&26thFeb2022/3.jpg';
import goYellow4 from '../../../assets/images/GoYellowRoadSafetyAwareness25th&26thFeb2022/4.jpg';
import goYellow5 from '../../../assets/images/GoYellowRoadSafetyAwareness25th&26thFeb2022/5.jpg';

// Import Reflective Safety Jacket Distribution event images
import jacketDistribution1 from '../../../assets/images/Reflective Safety jacket Distribution event – MIDC Buttibori police station Nagpur/IMG_20210219_124830-scaled.jpg';
import jacketDistribution2 from '../../../assets/images/Reflective Safety jacket Distribution event – MIDC Buttibori police station Nagpur/IMG_20210219_125456-scaled.jpg';

// Import Road Safety Audit NH 48 images
import nh48Audit1 from '../../../assets/images/RoadSafetyAuditNH48{Katraj–DehuRoadBypass Pune}/1_pune-katrej.jpg';
import nh48Audit2 from '../../../assets/images/RoadSafetyAuditNH48{Katraj–DehuRoadBypass Pune}/2_pune-katrej.jpg';
import nh48Audit3 from '../../../assets/images/RoadSafetyAuditNH48{Katraj–DehuRoadBypass Pune}/3_pune-katrej.jpg';

// Import Buttibori Police Station Jacket Distribution event images
import buttiboriJacket1 from '../../../assets/images/Reflective Safety jacket Distribution event – Buttibori Police Station Nagpur/IMG_20210219_113036-1.jpg';
import buttiboriJacket2 from '../../../assets/images/Reflective Safety jacket Distribution event – Buttibori Police Station Nagpur/IMG_20210219_113330-scaled.jpg';

// Import Umred Police Station Jacket Distribution event images
import umredJacket1 from '../../../assets/images/Reflective Safety jacket Distribution event – Umred police station Nagpur/IMG_9873-umred-scaled.jpg';
import umredJacket2 from '../../../assets/images/Reflective Safety jacket Distribution event – Umred police station Nagpur/IMG_9892-umred-scaled.jpg';

// Import Kalameshwar Police Station Jacket Distribution event images
import kalameshwarJacket1 from '../../../assets/images/Reflective Safety jacket Distribution event – Kalameshwar police station Nagpur/IMG_9615.jpg';
import kalameshwarJacket2 from '../../../assets/images/Reflective Safety jacket Distribution event – Kalameshwar police station Nagpur/IMG_9616-1-scaled.jpg';

// Import Kuhi Police Station Jacket Distribution event images
import kuhiJacket1 from '../../../assets/images/Reflective Safety jacket Distribution event – Kuhi police station Nagpur/2-scaled.jpg';
import kuhiJacket2 from '../../../assets/images/Reflective Safety jacket Distribution event – Kuhi police station Nagpur/3-scaled.jpg';

// Import Safety Mask Distribution event images
import maskDistribution1 from '../../../assets/images/Safety mask distribution event – Pune/IMG_20200911_112943-01.jpeg';
import maskDistribution2 from '../../../assets/images/Safety mask distribution event – Pune/IMG_20200911_114036-01.jpeg';
import maskDistribution3 from '../../../assets/images/Safety mask distribution event – Pune/IMG_20200911_114130.jpg';
import maskDistribution4 from '../../../assets/images/Safety mask distribution event – Pune/IMG_20200911_114205-01.jpeg';

// Import Coimbatore Safety Mask Distribution event images
import coimbatoreMask1 from '../../../assets/images/Safety mask distribution event – Coimbatore/0.6.jpeg';
import coimbatoreMask2 from '../../../assets/images/Safety mask distribution event – Coimbatore/0.7.jpeg';
import coimbatoreMask3 from '../../../assets/images/Safety mask distribution event – Coimbatore/1.jpeg';
import coimbatoreMask4 from '../../../assets/images/Safety mask distribution event – Coimbatore/13-scaled.jpg';
import coimbatoreMask5 from '../../../assets/images/Safety mask distribution event – Coimbatore/3-1.jpeg';
import coimbatoreMask6 from '../../../assets/images/Safety mask distribution event – Coimbatore/4.jpeg';

// Import Ahmedabad Safety Mask Distribution event images
import ahmedabadMask1 from '../../../assets/images/Safety mask distribution event – Ahmedabad/1-1-scaled.jpg';
import ahmedabadMask2 from '../../../assets/images/Safety mask distribution event – Ahmedabad/2-1-scaled.jpg';
import ahmedabadMask3 from '../../../assets/images/Safety mask distribution event – Ahmedabad/3.jpeg';

// Import Chetan Dattaji Gaikwad High School program images
import chetanSchool1 from '../../../assets/images/Road Safety Awareness Program- Chetan Dattaji Gaikwad High School, Khadki, Pune/s7.jpeg';
import chetanSchool2 from '../../../assets/images/Road Safety Awareness Program- Chetan Dattaji Gaikwad High School, Khadki, Pune/s8.jpeg';

// Import Symbiosis Open Skills University program image
import symbiosisUniversity1 from '../../../assets/images/Road Safety Awareness Program- Symbiosis Open Skills University, Pune/s9.jpeg';

// Import NCL Junior College program image
import nclCollege1 from '../../../assets/images/Road Safety Awareness Program- NCL Junior College, Pune/s10.jpeg';

// Import Vidyanchal School program images
import vidyanchalSchool1 from '../../../assets/images/Road Safety Awareness Program- Vidyanchal School, Pune/s13.png';
import vidyanchalSchool2 from '../../../assets/images/Road Safety Awareness Program- Vidyanchal School, Pune/s14.jpeg';

// Import Manchester International School program image
import manchesterSchool1 from '../../../assets/images/Road Safety Awareness Program- Manchester international school, Coimbatore/s15-1.jpeg';

// Import Loyola High School program images
import loyolaSchool1 from '../../../assets/images/Road Safety Awareness Program- Loyola High School, Pune/s11.jpeg';
import loyolaSchool2 from '../../../assets/images/Road Safety Awareness Program- Loyola High School, Pune/s12.jpeg';

// Import local images as placeholders for other Road Safety events
import roadSafety1 from '../../../assets/images/Road_Safety_Training.jpg';
import roadSafety2 from '../../../assets/images/Create_Public_awareness.jpg';
import roadSafety3 from '../../../assets/images/People_Driver_Training.jpg';
import roadSafety4 from '../../../assets/images/Road_Infrastructure.jpg';
import roadSafety5 from '../../../assets/images/carousel-3.jpg';

const eventsData = [
  {
    id: 1,
    title: "Child Safety Seat Awareness Session",
    date: "11th January 2025",
    location: "Tuljabhavani Housing Society, Ravet, Pune",
    category: "Awareness Session",
    excerpt: "On the occasion of National Road Safety Week, Safety Research Foundation (SRF) organized a Child Safety Seat Awareness session...",
    content: "On the occasion of National Road Safety Week, Safety Research Foundation (SRF) organized a Child Safety Seat Awareness session at Tuljabhavani Housing Society, Ravet, Pune. The session received an overwhelming response from parents, who actively participated by asking insightful questions and trying out the demonstration of child safety seats in their own cars.",
    fullDescription: `On the occasion of National Road Safety Week, Safety Research Foundation (SRF) organized a Child Safety Seat Awareness session at Tuljabhavani Housing Society, Ravet, Pune. The session received an overwhelming response from parents, who actively participated by asking insightful questions and trying out the demonstration of child safety seats in their own cars.

The program included an engaging presentation on the types of child safety seats suitable for various age and weight groups, the risks associated with improper or non-usage, and live demonstrations of installation techniques for both ISOFIX and seatbelt-mounted car seats. Parents gained hands-on experience by trying the child seats in their own cars, ensuring a practical understanding of the correct usage.

Attendees appreciated the efforts of SRF, expressing gratitude for organizing such a meaningful and impactful session that emphasized the need for child safety on the roads.

Glimpses of Program`,
    image: childSafety1,
    images: [childSafety1, childSafety2, childSafety3, childSafety4, childSafety5],
    featured: true
  },
  {
    id: 2,
    title: "Road Safety Awareness Sessions",
    date: "27th November 2024",
    location: "Three Schools in Khadki, Pune",
    category: "School Program",
    excerpt: "Safety Research Foundation, in collaboration with Rotary Club Khadki, successfully conducted Road Safety Awareness sessions...",
    content: "Safety Research Foundation, in collaboration with Rotary Club Khadki, successfully conducted Road Safety Awareness sessions at three prominent schools in Khadki, Pune—GMI Girls High School (73 students), Alegaokar High School (64 students), and Chetan Dattaji Gaikwad English Medium School (45 students).",
    fullDescription: `Safety Research Foundation, in collaboration with Rotary Club Khadki, successfully conducted Road Safety Awareness sessions at three prominent schools in Khadki, Pune—GMI Girls High School (73 students), Alegaokar High School (64 students), and Chetan Dattaji Gaikwad English Medium School (45 students).

The sessions focused on key topics such as helmet usage for two-wheeler safety, pedestrian safety practices, adherence to traffic rules and signals, the dangers of distracted driving, and the risks of speeding. Students actively participated in engaging discussions, received practical tips, and took part in interactive Q&A sessions. A significant highlight of the event was the collective pledge taken by the students to follow and promote road safety measures within their families and communities. The program emphasized the importance of sharing these learnings to create a broader impact.

SRF continues its commitment to fostering safer roads through education and advocacy, with these sessions representing a crucial step toward nurturing a culture of safety among young road users.

Glimpses of Program`,
    image: roadSafety1,
    images: [roadSafety1, roadSafety2, roadSafety3, roadSafety4, roadSafety5],
    featured: true
  },
  {
    id: 3,
    title: "Road Safety Awareness Program",
    date: "01 & 02 Sep 2022",
    location: "St Joseph Boys High School, Kirkee, Pune",
    category: "School Program",
    excerpt: "Safety Research Foundation conducted 'Road Safety Awareness Program' for the students at St Joseph Boys High School...",
    content: "Safety Research Foundation conducted 'Road Safety Awareness Program' for the students at St Joseph Boys High School, Kirkee, Pune. The objective of the program was to make students aware about safe road practices and imbibing good Samaritan values from an early age.",
    fullDescription: `Safety Research Foundation conducted 'Road Safety Awareness Program' for the students at "St Joseph Boys High School", Kirkee, Pune. The objective of the program was to make students aware about safe road practices and imbibing good Samaritan values from an early age.

The program was organised within the school premises and saw active participation of students from std 8th, 9th, National Cadet Corps (NCC) and SCOUT guide cadets. Participants were made aware about traffic rules, regulations, reading & relevance of various signage's and other safe practices.

Special focus was on emphasizing safe bicycle riding practices, minimum driving age, use of helmets, seat belts and maintaining road discipline even as a pedestrian. The session was highly interactive with participants, especially NCC & SCOUT cadets sharing real-life experience and discussing remedial approach.

SRF is committed towards advocating road safety amongst all age groups and categories of road users by way of data driven approach and conducts such programs regularly for various strata of population.

Glimpses of Program`,
    image: stJoseph1,
    images: [stJoseph1, stJoseph2, stJoseph3, stJoseph4],
    featured: true
  },
  {
    id: 4,
    title: "Road Safety Awareness Program",
    date: "29th July 2022",
    location: "St Arnolds Central School Pune",
    category: "School Program",
    excerpt: "Safety Research Foundation conducted a School Road safety awareness program for St Arnold's Central School Pune...",
    content: "Safety Research Foundation conducted a School Road safety awareness program for St Arnold's Central School Pune. Our trustee Mr Sesh. S addressed the students on the importance of Road safety.",
    fullDescription: `Safety Research Foundation conducted a School Road safety awareness program for St Arnold's Central School Pune Our trustee Mr Sesh. S addressed the students on the importance of Road safety…

This program was an introduction session on the importance of traffic rules and regulations, students from class 9th participated in this interactive session. Traffic rules, Road Signage's, No mobile phone use while riding /driving. , Pedestrians safety, zebra crossing, No signal jumping, Importance on the use of helmet, seat belts, Bicycle safety rules.

This was an interactive session with the students and a message was passed through the students to their respective parents on Road Safety and follow Traffic Rules and Regulations.

Glimpses of Program`,
    image: stArnolds1,
    images: [stArnolds1, stArnolds2, stArnolds3, stArnolds4],
    featured: true
  },
  {
    id: 5,
    title: "Road Safety Awareness Program",
    date: "22nd July 2022",
    location: "St Arnolds School Pune, Wadgaon Shari",
    category: "School Program",
    excerpt: "Safety Research Foundation conducted a School Road safety awareness program for St Arnolds School Pune Wadgaon Shari...",
    content: "Safety Research Foundation conducted a School Road safety awareness program for St Arnolds School Pune Wadgaon Shari. Father Joyce Kurian from St Arnolds supported the cause and addressed the students on Road safety awareness.",
    fullDescription: `Safety Research Foundation conducted a School Road safety awareness program for St Arnolds School Pune Wadgaon Shari. Father Joyce Kurian from St Arnolds supported the cause and addressed the students on Road safety awareness.

This program was an introduction session on the importance of traffic rules and regulations, students from class 8th participated in this interactive session. Traffic rules, Road Signage's, No mobile phone use while riding /driving, Pedestrians safety, zebra crossing, No signal jumping, Importance on the use of helmet, seat belts, Bicycle safety rules.

This was an interactive session with students and a message was passed through the students to their respective parents on the importance on Road safety, Traffic Rules and Regulations.

Glimpses of Program`,
    image: stArnoldsWadgaon1,
    images: [stArnoldsWadgaon1, stArnoldsWadgaon2, stArnoldsWadgaon3, stArnoldsWadgaon4],
    featured: true
  },
  {
    id: 6,
    title: "Road Safety Awareness Program",
    date: "12th July 2022",
    location: "Apte Prashala Deccan Gymkhana Pune",
    category: "School Program",
    excerpt: "Safety Research Foundation conducted a School Road safety awareness program for Apte Prashala...",
    content: "Safety Research Foundation conducted a School Road safety awareness program for Apte Prashala. This program was an introduction session on the importance of traffic rules and regulations.",
    fullDescription: `Safety Research Foundation conducted a School Road safety awareness program for Apte Prashala.

This program was an introduction session on the importance of traffic rules and regulations,students from class 8th and 9th participated in this interactive session. Traffic rules, Road Signage's, No mobile phone use while riding /driving, Pedestrians safety, Zebra crossing, No signal jumping, Importance on the use of helmet, seat belts, Bicycle safety rules.

This session was an interaction with students and a message was passed through the students to their respective parents on the importance traffic rules and regulations.

Glimpses of Program`,
    image: aptePrashala1,
    images: [aptePrashala1, aptePrashala2, aptePrashala3, aptePrashala4],
    featured: true
  },
  {
    id: 7,
    title: "Go Yellow Road Safety Awareness",
    date: "25th & 26th Feb 2022",
    location: "Pune University Chowk & Vimanagar Chowk",
    category: "Public Awareness",
    excerpt: "SRF team conducted a Road safety Awareness Program titled GO YELLOW on 25th Feb @Pune University Chowk...",
    content: "SRF team conducted a Road safety Awareness Program titled GO YELLOW on 25th Feb @Pune University Chowk & Vimanagar Chowk and 26thFeb @ Bal Gandharv /Good Luck chowk. Focus of the event was to create awareness on Road safety rules and the awareness on the new fine structure levied by the Traffic department.",
    fullDescription: `SRF team conducted a Road safety Awareness Program titled GO YELLOW on 25th Feb @Pune University Chowk & Vimanagar Chowk and 26thFeb @ Bal Gandharv /Good Luck chowk. Focus of the event was to create awareness on Road safety rules and the awareness on the new fine structure levied by the Traffic department.

In this awareness program we tagged the road users with a YELLOW badge Symbolising 'MY Commitment towards Road Safety. As the colour Yellow symbolises every individual's commitment towards following Road Safety rules." SRF, team has tagged the road users with Go yellow badges and spoke on current scenario of traffic condition and how important it is to follow the traffic safety rules, the team has also tagged the Yellow Badges Sr.Pi Mr. P .Masalkar & PSI .Jadhav of Pune University traffic police station. Police team from traffic police station and traffic guards participated in the event. The event was well received by the participants with appreciation of work done by SRF.

On 26th Feb 2022 Mrs Universe Australasian Dr Prachiti Punde also participated our cause of road safety awareness Go Yellow, Dr Prachiti interacted with the general road users and made them aware on abiding the safety norms and following all the road safety rules. She along with SRF team distributed the Yellow Badges Psi Mr. Nilesh Patil and the police station staff Of Bal Gandharva police station.

Glimpses of Program`,
    image: goYellow1,
    images: [goYellow1, goYellow2, goYellow3, goYellow4, goYellow5],
    featured: true
  },
  {
    id: 8,
    title: "Webinar on Scientific Crash Investigation",
    date: "28th September 2021",
    location: "Online - Indian Chemical Council",
    category: "Webinar",
    excerpt: "Safety Research Foundation conducted an online session on Scientific Crash Investigation and Data Collection...",
    fullContent: `Safety Research Foundation conducted an online session on "Scientific Crash Investigation and Data Collection" for Indian Chemical Council (ICC) employees on 28th September 2021. The webinar session was part of the workshop "Emergency Response Services Training" organized by ICC. The importance of scientific crash investigation and its procedures were discussed in this session.`,
    image: "https://via.placeholder.com/400x250/7c3aed/ffffff?text=ICC+Webinar",
    featured: false
  },
  {
    id: 9,
    title: "Road Safety Audit: NH 48",
    date: "24th March 2021",
    location: "Katraj – Dehu Road Bypass, Pune",
    category: "Safety Audit",
    excerpt: "Safety Research Foundation undertook Road Safety Audit of Katraj – Navale Section of NH 48...",
    content: "Safety Research Foundation undertook Road Safety Audit of Katraj – Navale Section of NH 48. The study was executed under the approval of the Deputy Commissioner of Police, Traffic, Pune city and the report was submitted on 24th March 2021 after thorough study for a period of one month.",
    fullDescription: `Safety Research Foundation undertook "Road Safety Audit" of Katraj – Navale Section of NH 48. The study was executed under the approval of the Deputy Commissioner of Police, Traffic, Pune city and the report was submitted on 24th March 2021 after thorough study for a period of one month. This particular section under study is a high crash prone stretch, specifically involving heavy vehicles, motorized 2 Wheelers & pedestrians resulting in fatal/serious injuries. Scientific and Evidence based approach was adopted involving observational site study, analysing traffic patterns, human behavioural aspects, analysis of police records and crash reports/data. Team of experts including Road safety Engineers, Analytics team and Subject Matter experts were deployed and stakeholders including traffic police and local authorities were consulted.

The study analysed historic crash trends based on FIRs compiled, traffic composition and geometrics of vulnerable section of the stretch were studied through strategic site visits and appropriate data recording, road user interviews were conducted to capture the user experience.

Based on a detailed assessment of the prevailing condition in conjunction with crash and traffic data, four critical zones were identified; Navale bridge, Katraj tunnel, Selfie point, and Swami Narayan Mandir to Katraj tunnel stretch. Each zone had its specific safety concern leading at least 3 fatal crashes in the last three years. Recommendations included repositioning bus stops, dedicated merging lanes, more visible lane markings, removing hazardous objects, remapping traffic signal cycle timings etc. Comprehensive report suggesting short & long term measures has been submitted to the concerned authorities. SRF is committed to extend support during implementation phase.

Glimpses of Program`,
    image: nh48Audit1,
    images: [nh48Audit1, nh48Audit2, nh48Audit3],
    featured: true
  },
  {
    id: 10,
    title: "Reflective Safety Jacket Distribution",
    date: "19th February 2021",
    location: "MIDC Buttibori Police Station, Nagpur",
    category: "Police Support",
    excerpt: "Safety Research Foundation organized an event focused on Honoring the Police Personnel on duty...",
    content: "On 19th February 2021, Safety Research Foundation (SRF) organized an event focused on Honoring the Police Personnel on duty, who have put the Nation and its Citizens ahead of themselves in the dark times. As a tribute to their selfless service, a small token of appreciation from SRF, in the form of distribution of Reflective safety jacket has been organized in the city of Nagpur.",
    fullDescription: `On 19th February 2021, Safety Research Foundation (SRF) organized an event focused on "Honoring the Police Personnel on duty, who have put the Nation and its Citizens ahead of themselves in the dark times. As a tribute to their selfless service, a small token of appreciation from SRF, in the form of distribution of Reflective safety jacket has been organized in the city of Nagpur. Reflective safety Apparel caters to the safety needs of people working at sensitive and dangerous area especially at night or poor light condition.

SRF team visited MIDC Buttibori police station Nagpur and they gave a brief introduction about SRF and distributed the Reflective Safety Jackets under the aegis of the DYSP Mr. Rajendra Chauhan, inspector Mr. Maruti Muluk and other police personnel from MIDC Buttibori police station participated in the event. The event was well received by the participants with many appreciating SRF's gesture.

Glimpses of Program`,
    image: jacketDistribution1,
    images: [jacketDistribution1, jacketDistribution2],
    featured: true
  },
  {
    id: 11,
    title: "Reflective Safety Jacket Distribution",
    date: "19th February 2021",
    location: "Buttibori Police Station, Nagpur",
    category: "Police Support",
    excerpt: "Safety Research Foundation organized an event to appreciate and recognize the contribution of police officials towards society...",
    content: "On 19th February 2021, to appreciate and recognize the contribution of police officials towards society, Safety Research Foundation (SRF) had organized an event. As a tribute to their contribution towards society, a small token of appreciation from SRF, in the form of distribution of Reflective safety jacket has been organized in the city of Nagpur.",
    fullDescription: `On 19th February 2021, to appreciate and recognize the contribution of police officials towards society, Safety Research Foundation (SRF) had organized an event. As a tribute to their contribution towards society, a small token of appreciation from SRF, in the form of distribution of Reflective safety jacket has been organized in the city of Nagpur. Reflective safety Apparel caters to the safety needs of people working at sensitive and dangerous area especially at night or poor light condition.

SRF team visited Buttibori police station Nagpur and they gave a brief introduction about SRF and distributed the Reflective Safety Jackets under the aegis of the inspector Mr. Omprakash Kokate and other police personnel from Buttibori police station participated in the event. The event was well received by the participants with many appreciating SRF's gesture.

Glimpses of Program`,
    image: buttiboriJacket1,
    images: [buttiboriJacket1, buttiboriJacket2],
    featured: true
  },
  {
    id: 12,
    title: "Reflective Safety Jacket Distribution",
    date: "18th February 2021",
    location: "Umred Police Station, Nagpur",
    category: "Police Support",
    excerpt: "Safety Research Foundation organized an event to honour police personnel for their dedicated service to society...",
    content: "On 18th February 2021, Safety Research Foundation (SRF) organized an event to honour police personnel for their dedicated service to society. To honour police personnel for their service, a small token of appreciation from SRF, in the form of distribution of Reflective safety jacket has been organized in the city of Nagpur.",
    fullDescription: `On 18th February 2021, Safety Research Foundation (SRF) organized an event to honour police personnel for their dedicated service to society. To honour police personnel for their service, a small token of appreciation from SRF, in the form of distribution of Reflective safety jacket has been organized in the city of Nagpur. Reflective safety Apparel caters to the safety needs of people working at sensitive and dangerous area especially at night or poor light condition.

SRF team visited Umred police station Nagpur and they gave a brief introduction about SRF and distributed the Reflective Safety Jackets under the aegis of the inspector Mr. Yashvant Solse, Sub Inspectors Mr. Rajesh Patil and other police personnel from Umred police station participated in the event. The event was well received by the participants with many appreciating SRF's gesture.

Glimpses of Program`,
    image: umredJacket1,
    images: [umredJacket1, umredJacket2],
    featured: true
  },
  {
    id: 13,
    title: "Reflective Safety Jacket Distribution",
    date: "18th February 2021",
    location: "Kalameshwar Police Station, Nagpur",
    category: "Police Support",
    excerpt: "Safety Research Foundation organized an event for honouring police officials for their exemplary contribution to society...",
    content: "On 18th February 2021, Safety Research Foundation (SRF) organized an event for honouring police officials for their exemplary contribution to society. Reflective jackets were distributed to police officials of Kalameshwar police station, as a small token of appreciation.",
    fullDescription: `On 18th February 2021, Safety Research Foundation (SRF) organized an event for honouring police officials for their exemplary contribution to society. Reflective jackets were distributed to police officials of Kalameshwar police station, as a small token of appreciation. Reflective safety Apparel caters to the safety needs of people working at sensitive and dangerous area especially at night or poor light condition.

SRF team visited Kalameshwar police station Nagpur and they gave a brief introduction about SRF and distributed the Reflective Safety Jackets under the aegis of the inspector Mr. Asif Sheikh and other police personnel from Kalameshwar police station participated in the event. The event was well received by the participants with many appreciating SRF's gesture.

Glimpses of Program`,
    image: kalameshwarJacket1,
    images: [kalameshwarJacket1, kalameshwarJacket2],
    featured: true
  },
  {
    id: 14,
    title: "Reflective Safety Jacket Distribution",
    date: "16th February 2021",
    location: "Kuhi Police Station, Nagpur",
    category: "Police Support",
    excerpt: "Safety Research Foundation organised an event for honouring the Police Personnel on duty, for their unflinching contribution towards road safety...",
    content: "On 16th February 2021, Safety Research Foundation (SRF) organised an event for honouring the Police Personnel on duty, for their unflinching contribution towards road safety. As a tribute to their selfless service, a small token of appreciation from SRF, in the form of distribution of Reflective safety jacket has been organised in the city of Nagpur.",
    fullDescription: `On 16th February 2021, Safety Research Foundation (SRF) organised an event for honouring the Police Personnel on duty, for their unflinching contribution towards road safety. As a tribute to their selfless service, a small token of appreciation from SRF, in the form of distribution of Reflective safety jacket has been organised in the city of Nagpur. Reflective safety Apparel caters to the safety needs of people working at sensitive and dangerous area especially at night or poor light condition.

SRF team visited Kuhi police station Nagpur and they gave a brief introduction about SRF and distributed the Reflective Safety Jackets under the aegis of the inspector Mr. Chandrakant Madane. The Sub Inspector Mrs. Suchita Mandawale and other police personnel from Kuhi police station participated in the event. The event was well received by the participants with many appreciating SRF's gesture.

Glimpses of Program`,
    image: kuhiJacket1,
    images: [kuhiJacket1, kuhiJacket2],
    featured: true
  },
  {
    id: 15,
    title: "Safety Mask Distribution Event",
    date: "11th September 2020",
    location: "Chaturshringi Police Station & Pune University Traffic Junction, Pune",
    category: "Police Support",
    excerpt: "SRF team organised a safety mask distribution event to honour Police Personnel on duty during COVID-19 times...",
    content: "On 11th September 2020, SRF team organised a safety mask distribution event at Chaturshringi Police Station, Pune City and Pune University Traffic Junction. Focus of the event was 'Honouring the Police Personnel on duty, who have served the nation and its Citizen during this crucial COVID 19 times'. This our small tribute to their selfless service in the form of Bio Trap 95 masks.",
    fullDescription: `On 11th September 2020, SRF team organised a safety mask distribution event at Chaturshringi Police Station, Pune City and Pune University Traffic Junction. Focus of the event was "Honouring the Police Personnel on duty, who have served the nation and its Citizen during this crucial COVID 19 times". This our small tribute to their selfless service in the form of Bio Trap 95 masks.

After a brief introduction of SRF and talk on current scenario, the team has distributed safety mask under the aegis of API of Chaturshringi police station. Police team from Chaturshrungi police station and traffic guards from Pune University traffic junction participated in the event. The event was well received by the participants with appreciation of work done by SRF.

Glimpses of Program`,
    image: maskDistribution1,
    images: [maskDistribution1, maskDistribution2, maskDistribution3, maskDistribution4],
    featured: true
  },
  {
    id: 16,
    title: "Road Safety Webinar Series 3",
    date: "24th August 2020",
    location: "Online - Rotary Pimpri Pune",
    category: "Webinar",
    excerpt: "Safety Research Foundation conducted a webinar on 'What can we learn from real world traffic accidents?' attended by Rotary Pimpri – Pune...",
    content: "Safety Research Foundation conducted a webinar on 'What can we learn from real world traffic accidents?' on 24th Aug 2020. The webinar was attended by Rotary Pimpri – Pune. The session had a few case studies from across India and elicit the underlined science behind the same.",
    fullDescription: `Safety Research Foundation conducted a webinar on "What can we learn from real world traffic accidents?" on 24th Aug 2020. The webinar was attended by Rotary Pimpri – Pune. The session had a few case studies from across India and elicit the underlined science behind the same. The webinar aim was to expose what common problems exist on our roads and where can we start from for a better tomorrow.

Key Topics Covered:
- Real world traffic accident case studies from across India
- Scientific analysis of accident causation
- Common problems existing on Indian roads
- Solutions and preventive measures for safer roads
- Data-driven approach to road safety improvements

Glimpses of Program`,
    image: "https://via.placeholder.com/400x250/7c3aed/ffffff?text=Webinar+Series+3",
    images: [],
    featured: true
  },
  {
    id: 17,
    title: "Road Safety Webinar Series 2",
    date: "16th August 2020",
    location: "Online - Engineering Colleges",
    category: "Webinar",
    excerpt: "Safety Research Foundation conducted a webinar on 'Crash Investigation and its Importance' attended by undergraduate engineering students...",
    content: "Safety Research Foundation conducted a webinar on 'Crash Investigation and its Importance' on 16th Aug 2020. The webinar was attended by undergraduate engineering students from various colleges. This webinar focused on methods and importance of in-depth crash investigations in India.",
    fullDescription: `Safety Research Foundation conducted a webinar on "Crash Investigation and its Importance" on 16th Aug 2020. The webinar was attended by undergraduate engineering students from various colleges. This webinar focused on methods and importance of in-depth crash investigations in India and gave an overview about scientific crash investigation methodologies, crash reconstruction techniques and road traffic injury research & analysis, and their interplay in achieving the road safety targets.

Key Topics Covered:
- Methods and importance of in-depth crash investigations in India
- Scientific crash investigation methodologies
- Crash reconstruction techniques
- Road traffic injury research & analysis
- Interplay between investigation methods and road safety targets
- Technical aspects of accident analysis for engineering students

Target Audience:
- Undergraduate engineering students from various colleges
- Future engineers who can contribute to road safety solutions

Glimpses of Program`,
    image: "https://via.placeholder.com/400x250/7c3aed/ffffff?text=Webinar+Series+2",
    images: [],
    featured: true
  },
  {
    id: 18,
    title: "Safety Mask Distribution Event",
    date: "15th August 2020",
    location: "Sulur Police Station, Coimbatore",
    category: "Police Support",
    excerpt: "SRF organised an event on Independence Day to honour Police Personnel during COVID times at Sulur police station, Coimbatore...",
    content: "On 15th August 2020, Safety Research Foundation (SRF) organised an event focused on 'Honouring the Police Personnel on duty, who have put the Nation and its Citizens ahead of themselves in these uncertain COVID times'. As a tribute to their selfless service, a small token of appreciation from SRF, in the form of distribution of Bio-Trap 95 Masks has been organised in the city of Coimbatore.",
    fullDescription: `On 15th August 2020, Safety Research Foundation (SRF) organised an event focused on "Honouring the Police Personnel on duty, who have put the Nation and its Citizens ahead of themselves in these uncertain COVID times". As a tribute to their selfless service, a small token of appreciation from SRF, in the form of distribution of Bio-Trap 95 Masks has been organised in the city of Coimbatore.

SRF team visited Sulur police station and participated in the 74th Independence Day celebration. They gave a brief introduction about SRF and distributed the safety masks under the aegis of the inspector Mr. Sundarapandian. The Sub Inspectors Mr. Radhakrishnan, Mr. Palaniaandi, Mr. Marudhuayya Paandi, Mr. John Charles, Mr. Murugan, Mr. Rajkumar and other police personnel from Sulur police station participated in the event. The event was well received by the participants with many appreciating SRF's gesture.

Special Significance:
- Conducted on 74th Independence Day celebration
- Tribute to police personnel's patriotic service during COVID-19
- Expansion of SRF's support beyond Maharashtra to Tamil Nadu

Glimpses of Program`,
    image: coimbatoreMask1,
    images: [coimbatoreMask1, coimbatoreMask2, coimbatoreMask3, coimbatoreMask4, coimbatoreMask5, coimbatoreMask6],
    featured: true
  },
  {
    id: 19,
    title: "Safety Mask Distribution Event",
    date: "15th August 2020",
    location: "I-Traffic Police Station, Ahmedabad",
    category: "Police Support",
    excerpt: "SRF team participated in Independence Day ceremony and organised safety mask distribution event at I-traffic police station, Ahmedabad...",
    content: "On 15th August 2020, SRF team participated in Independence Day ceremony and organised safety mask distribution event at I- traffic police station, Ahmedabad. Focus of the event was on the honouring the police personnel who have served nation and its citizens in very crucial COVID-19 pandemic time. So as a small token of appreciation from SRF, team distributed Bio-Trap 95 safety masks after flag hoisting ceremony.",
    fullDescription: `On 15th August 2020, SRF team participated in Independence Day ceremony and organised safety mask distribution event at I- traffic police station, Ahmedabad. Focus of the event was on the honouring the police personnel who have served nation and its citizens in very crucial COVID-19 pandemic time. So as a small token of appreciation from SRF, team distributed Bio-Trap 95 safety masks after flag hoisting ceremony.

After a brief introduction of SRF and talk on current scenario, the team has distributed safety mask under the aegis of Inspector Mr. J.B. Buval of I-traffic police station. Police team from I-traffic police station and traffic guards participated in the event. The event was well received by the participants with appreciation of work done by SRF.

Special Significance:
- Conducted on 74th Independence Day ceremony with flag hoisting
- Tribute to police personnel's service during crucial COVID-19 pandemic
- Expansion of SRF's support to Gujarat state
- Focus on traffic police personnel who ensure road safety

Glimpses of Program`,
    image: ahmedabadMask1,
    images: [ahmedabadMask1, ahmedabadMask2, ahmedabadMask3],
    featured: true
  },
  {
    id: 20,
    title: "Road Safety Webinar Series 1",
    date: "9th August 2020",
    location: "Online - Engineering Colleges",
    category: "Webinar",
    excerpt: "Safety Research Foundation conducted a webinar on 'Crash Investigation and its Importance' attended by undergraduate engineering students...",
    content: "Safety Research Foundation conducted a webinar on 'Crash Investigation and its Importance' on 9th Aug 2020. The webinar was attended by undergraduate engineering students from various colleges. This webinar briefed the methods and importance of in-depth crash investigations in India.",
    fullDescription: `Safety Research Foundation conducted a webinar on "Crash Investigation and its Importance" on 9th Aug 2020. The webinar was attended by undergraduate engineering students from various colleges. This webinar briefed the methods and importance of in-depth crash investigations in India and gave an overview about scientific crash investigation methodologies, crash reconstruction techniques and road traffic injury research & analysis, and their interplay in achieving the road safety targets.

Key Topics Covered:
- Methods and importance of in-depth crash investigations in India
- Scientific crash investigation methodologies
- Crash reconstruction techniques
- Road traffic injury research & analysis
- Interplay between investigation methods and road safety targets
- Technical briefing on accident analysis for engineering students

Target Audience:
- Undergraduate engineering students from various colleges
- Future engineers who can contribute to road safety solutions
- Technical education for building road safety expertise

Webinar Series Context:
- First in the series of technical webinars (Series 1)
- Foundation webinar establishing core concepts
- Part of SRF's educational outreach program

Glimpses of Program`,
    image: "https://via.placeholder.com/400x250/7c3aed/ffffff?text=Webinar+Series+1",
    images: [],
    featured: true
  },
  {
    id: 21,
    title: "Road Safety Awareness Program",
    date: "24th September 2019",
    location: "Chetan Dattaji Gaikwad High School, Khadki, Pune",
    category: "School Program",
    excerpt: "Safety Research Foundation and Rotary Club of Khadki conducted a comprehensive road safety session for Marathi medium students...",
    content: "The Session on Traffic violations commonly seen on our roads and its eventualities, Pedestrian Responsibilities, Speeding and its repercussions, Importance of wearing helmet/Seat belt usage and its necessity was conducted on 24th Sep 2019 by Safety Research Foundation (SRF) and Rotary Club of Khadki. The session was attended by students of Marathi medium from 8th standard.",
    fullDescription: `The Session on Traffic violations commonly seen on our roads and its eventualities, Pedestrian Responsibilities, Speeding and its repercussions, Importance of wearing helmet/Seat belt usage and its necessity was conducted on 24th Sep 2019 by Safety Research Foundation (SRF) and Rotary Club of Khadki. The session was attended by students of Marathi medium from 8th standard.

Key Topics Covered:
- Traffic violations commonly seen on our roads and its eventualities
- Pedestrian Responsibilities and safe road crossing
- Speeding and its repercussions on road safety
- Importance of wearing helmet for two-wheeler riders
- Seat belt usage and its necessity for vehicle occupants
- Interactive session on road safety awareness

Special Features:
- Collaboration between SRF and Rotary Club of Khadki
- Focus on Marathi medium students from 8th standard
- Comprehensive coverage of key road safety topics
- Community partnership for educational outreach

Target Audience:
- 8th standard students from Marathi medium
- Age-appropriate road safety education
- Local language instruction for better understanding

Glimpses of Program`,
    image: chetanSchool1,
    images: [chetanSchool1, chetanSchool2],
    featured: true
  },
  {
    id: 22,
    title: "Road Safety Awareness Program",
    date: "5th September 2019",
    location: "Symbiosis Open Skills University, Pune",
    category: "Awareness Session",
    excerpt: "Safety Research Foundation conducted a specialized session focused on importance of good quality data collection and use of data in improving road safety...",
    content: "Safety Research Foundation conducted the Session on 05th Sep 2019, focused on importance of good quality data collection and use of data in improving road safety. The session was attended by students of 1st year B.Sc. Data Science. The session also covered few case studies from across India.",
    fullDescription: `Safety Research Foundation conducted the Session on 05th Sep 2019, focused on importance of good quality data collection and use of data in improving road safety. The session was attended by students of 1st year B.Sc. Data Science. The session also covered few case studies from across India.

Key Topics Covered:
- Importance of good quality data collection in road safety
- Use of data analytics in improving road safety outcomes
- Data-driven approaches to accident prevention
- Statistical analysis of road safety trends
- Case studies from across India demonstrating data applications
- Role of data science in evidence-based road safety policy

Special Features:
- Specialized session for Data Science students
- Focus on technical aspects of road safety data
- Integration of academic curriculum with real-world applications
- Case study methodology for practical learning
- University-level technical education

Target Audience:
- 1st year B.Sc. Data Science students
- Future data scientists and analysts
- Students interested in applying data science to social causes
- Technical education at university level

Educational Impact:
- Bridging academic data science with road safety applications
- Inspiring students to use technical skills for social good
- Demonstrating real-world relevance of data science education

Glimpses of Program`,
    image: symbiosisUniversity1,
    images: [symbiosisUniversity1],
    featured: true
  },
  {
    id: 23,
    title: "Road Safety Awareness Program",
    date: "4th October 2018",
    location: "NCL Junior College, Pune",
    category: "Awareness Session",
    excerpt: "Safety Research Foundation and Rotary Club of Khadki conducted a comprehensive session for college students on effects of speeding and pedestrian behavior...",
    content: "Safety Research Foundation conducted the Session on 04th Oct 2018 with co-organizer Rotary Club of Khadki focused on Effects of Speeding, Pedestrian Behaviour on roads and their impacts and Safety system usage (Helmets and seat-belts). The session was attended by college students of grades 11th and 12th.",
    fullDescription: `Safety Research Foundation conducted the Session on 04th Oct 2018 with co-organizer Rotary Club of Khadki focused on Effects of Speeding, Pedestrian Behaviour on roads and their impacts and Safety system usage (Helmets and seat-belts). The session was attended by college students of grades 11th and 12th.

Key Topics Covered:
- Effects of Speeding on road safety and accident severity
- Pedestrian Behaviour on roads and their safety impacts
- Safety system usage - importance of Helmets for two-wheeler riders
- Seat-belt usage and its life-saving benefits
- Road safety awareness for young adults
- Behavioral aspects of road safety

Special Features:
- Partnership between SRF and Rotary Club of Khadki
- Focus on college students (grades 11th and 12th)
- Age-appropriate content for young adults
- Emphasis on behavioral change and safety systems
- Community organization collaboration

Target Audience:
- College students of grades 11th and 12th
- Young adults preparing for independent mobility
- Future drivers and road users
- Students at critical age for road safety education

Educational Impact:
- Targeting students at crucial age before they become regular road users
- Behavioral focus on speeding and pedestrian safety
- Practical safety system education (helmets and seat-belts)
- Community partnership model for broader reach

Glimpses of Program`,
    image: nclCollege1,
    images: [nclCollege1],
    featured: true
  },
  {
    id: 24,
    title: "Road Safety Awareness Program",
    date: "18th August 2018",
    location: "Loyola High School, Pune",
    category: "School Program",
    excerpt: "Safety Research Foundation and Rotary Club of Khadki conducted a comprehensive session for school children aged 13-16 on effects of speeding and pedestrian behavior...",
    content: "Safety Research Foundation conducted the Session on 18th Aug 2018 with co-organizer Rotary Club of Khadki focused on Effects of Speeding, Pedestrian Behaviour on roads and their impacts and Safety system usage (Helmets and seat-belts). The session was attended by school Children in the age group of 13-16.",
    fullDescription: `Safety Research Foundation conducted the Session on 18th Aug 2018 with co-organizer Rotary Club of Khadki focused on Effects of Speeding, Pedestrian Behaviour on roads and their impacts and Safety system usage (Helmets and seat-belts). The session was attended by school Children in the age group of 13-16.

Key Topics Covered:
- Effects of Speeding on road safety and accident severity
- Pedestrian Behaviour on roads and their safety impacts
- Safety system usage - importance of Helmets for two-wheeler riders
- Seat-belt usage and its life-saving benefits
- Road safety awareness for teenagers
- Behavioral aspects of road safety for young people

Special Features:
- Partnership between SRF and Rotary Club of Khadki
- Focus on school children aged 13-16 years
- Age-appropriate content for teenagers
- Emphasis on behavioral change and safety systems
- Community organization collaboration
- Early intervention at crucial developmental age

Target Audience:
- School children in the age group of 13-16 years
- Teenagers approaching driving age
- Students at critical age for road safety education
- Future drivers and independent road users

Educational Impact:
- Targeting students at crucial developmental age
- Building foundation for responsible road behavior
- Early education before driving habits are formed
- Community partnership model for sustained impact
- Behavioral focus on speeding and pedestrian safety

Glimpses of Program`,
    image: loyolaSchool1,
    images: [loyolaSchool1, loyolaSchool2],
    featured: true
  },
  {
    id: 25,
    title: "Road Safety Awareness Program",
    date: "20th December 2017",
    location: "Vidyanchal School, Pune",
    category: "School Program",
    excerpt: "Safety Research Foundation and Rotary Club of Khadki conducted a comprehensive session for school children aged 13-16 on effects of speeding and pedestrian behavior...",
    content: "Safety Research Foundation conducted the Session on 20th Dec 2017 with co-organizer Rotary Club of Khadki focused on Effects of Speeding, Pedestrian Behaviour on roads and their impacts, Safety system usage (Helmets and seat-belts) etc. The session was attended by School Children in the age group of 13-16.",
    fullDescription: `Safety Research Foundation conducted the Session on 20th Dec 2017 with co-organizer Rotary Club of Khadki focused on Effects of Speeding, Pedestrian Behaviour on roads and their impacts, Safety system usage (Helmets and seat-belts) etc. The session was attended by School Children in the age group of 13-16.

Key Topics Covered:
- Effects of Speeding on road safety and accident severity
- Pedestrian Behaviour on roads and their safety impacts
- Safety system usage - importance of Helmets for two-wheeler riders
- Seat-belt usage and its life-saving benefits
- Road safety awareness for teenagers
- Behavioral aspects of road safety for young people
- Comprehensive road safety education

Special Features:
- Partnership between SRF and Rotary Club of Khadki
- Focus on school children aged 13-16 years
- Age-appropriate content for teenagers
- Emphasis on behavioral change and safety systems
- Community organization collaboration
- Early intervention at crucial developmental age
- Comprehensive safety education approach

Target Audience:
- School children in the age group of 13-16 years
- Teenagers approaching driving age
- Students at critical age for road safety education
- Future drivers and independent road users

Educational Impact:
- Targeting students at crucial developmental age
- Building foundation for responsible road behavior
- Early education before driving habits are formed
- Community partnership model for sustained impact
- Behavioral focus on speeding and pedestrian safety
- Comprehensive safety system education

Glimpses of Program`,
    image: vidyanchalSchool1,
    images: [vidyanchalSchool1, vidyanchalSchool2],
    featured: true
  },
  {
    id: 26,
    title: "Road Safety Awareness Program",
    date: "2nd November 2017",
    location: "Manchester International School, Coimbatore",
    category: "School Program",
    excerpt: "Safety Research Foundation and Rotary International District 3201 Coimbatore Region conducted a comprehensive session for students grades 5th to 10th...",
    content: "Safety Research Foundation conducted the Session on 02nd Nov 2017 with co-organizer Rotary International District 3201 Coimbatore Region focused on Safety system usage (Helmets and seat-belts) and Road observation skills. The session was attended by School students of grades 5th to 10th.",
    fullDescription: `Safety Research Foundation conducted the Session on 02nd Nov 2017 with co-organizer Rotary International District 3201 Coimbatore Region focused on Safety system usage (Helmets and seat-belts) and Road observation skills. The session was attended by School students of grades 5th to 10th.

Key Topics Covered:
- Safety system usage - importance of Helmets for two-wheeler riders
- Seat-belt usage and its life-saving benefits
- Road observation skills for pedestrians and cyclists
- Age-appropriate road safety awareness
- Practical safety education for young students
- Interactive learning on road safety fundamentals

Special Features:
- Partnership with Rotary International District 3201 Coimbatore Region
- First SRF program in Coimbatore expanding beyond Pune
- Focus on students from grades 5th to 10th (wider age range)
- International school setting with diverse student body
- Emphasis on practical safety systems and observation skills
- Regional Rotary International collaboration

Target Audience:
- School students of grades 5th to 10th
- Young students aged approximately 10-15 years
- International school community
- Students at foundational learning age

Educational Impact:
- Geographic expansion of SRF's educational outreach
- International partnership model with Rotary District
- Foundational road safety education for younger students
- Practical focus on safety systems and observation skills
- Building early awareness before teenage years

Significance:
- First SRF program in Tamil Nadu
- Expansion beyond Maharashtra operations
- International Rotary partnership model
- Broader age group coverage (grades 5-10)

Glimpses of Program`,
    image: manchesterSchool1,
    images: [manchesterSchool1],
    featured: true
  }
];

const NewsAndEvents = ({ initialSection = 'events', initialMediaTab = 'videos' }) => {
  const navigate = useNavigate();
  const [mainSection, setMainSection] = useState(initialSection); // 'events', 'media', or 'testimonials'
  const [eventTab, setEventTab] = useState('upcoming'); // 'upcoming' or 'completed'
  const [mediaTab, setMediaTab] = useState(initialMediaTab); // 'videos', 'images', 'documents', 'printmedia', 'audio', or 'ebook'
  const [documentTab, setDocumentTab] = useState('brace'); // 'brace' or 'msia'
  const [filter, setFilter] = useState('all');
  
  // Image gallery state
  const [imagesToShow, setImagesToShow] = useState(12);
  const [loadedImages, setLoadedImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  
  // Testimonials carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);
  
  const categories = ['all', 'School Program', 'Awareness Session', 'Public Awareness', 'Webinar', 'Safety Audit', 'Police Support'];
  
  // Parse dates and separate upcoming vs completed events
  const parseEventDate = (dateStr) => {
    const monthMap = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'Sep': 8, 'October': 9, 'November': 10, 'December': 11, 'Feb': 1
    };
    
    const parts = dateStr.split(' ');
    let year, month, day;
    
    year = parseInt(parts.find(p => p.length === 4));
    for (let part of parts) {
      if (monthMap[part] !== undefined) {
        month = monthMap[part];
        break;
      }
    }
    for (let part of parts) {
      const dayMatch = part.match(/^(\d+)/);
      if (dayMatch) {
        day = parseInt(dayMatch[1]);
        break;
      }
    }
    
    return new Date(year, month, day);
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingEvents = eventsData.filter(event => {
    const eventDate = parseEventDate(event.date);
    return eventDate >= today;
  });
  
  const completedEvents = eventsData.filter(event => {
    const eventDate = parseEventDate(event.date);
    return eventDate < today;
  });
  
  const displayEvents = eventTab === 'upcoming' ? upcomingEvents : completedEvents;
  const filteredEvents = filter === 'all' ? displayEvents : displayEvents.filter(event => event.category === filter);

  // Media Data
  const videos = [
    {
      id: 1,
      title: "Traffic Safety Awareness Video",
      videoId: "T68HpBF-di0",
      description: "Important traffic safety awareness and education video.",
      date: "2024"
    },
    {
      id: 2,
      title: "Road Safety Campaign",
      videoId: "7IJFsyF-WSk",
      description: "Road safety awareness campaign video.",
      date: "2024"
    },
    {
      id: 3,
      title: "Safe Driving Practices",
      videoId: "846QOR32ERc",
      description: "Educational video on safe driving practices.",
      date: "2024"
    },
    {
      id: 4,
      title: "Pedestrian Safety Awareness",
      videoId: "yCYrkRB05SQ",
      description: "Important information about pedestrian safety.",
      date: "2024"
    },
    {
      id: 5,
      title: "Traffic Rules and Regulations",
      videoId: "N4qWOPNuLa8",
      description: "Understanding traffic rules and regulations.",
      date: "2024"
    },
    {
      id: 6,
      title: "Road Safety Education",
      videoId: "qY7nl-0jW60",
      description: "Comprehensive road safety education video.",
      date: "2024"
    }
  ];

  // Traffic Awareness Images
  const trafficAwarenessModules = import.meta.glob('../../../assets/events/Traffic Awareness/*.{jpg,JPG,jpeg,JPEG,png,PNG}', { eager: false, import: 'default' });
  
  // Shared Images
  const sharedImagesModules = import.meta.glob('../../../assets/images/shared image*.{jpg,JPG,jpeg,JPEG,png,PNG,jfif,JFIF}', { eager: false, import: 'default' });

  // Load images when Images tab is active
  useEffect(() => {
    if (mainSection === 'media' && mediaTab === 'images' && loadedImages.length === 0) {
      setIsLoadingImages(true);
      const loadImages = async () => {
        // Combine both image sources
        const trafficEntries = Object.entries(trafficAwarenessModules);
        const sharedEntries = Object.entries(sharedImagesModules);
        const allEntries = [...trafficEntries, ...sharedEntries];
        const images = [];
        
        for (let i = 0; i < allEntries.length; i++) {
          const [path, importFn] = allEntries[i];
          const image = await importFn();
          images.push({
            id: i + 1,
            image: image,
            path: path
          });
          
          if ((i + 1) % 6 === 0 || i === allEntries.length - 1) {
            setLoadedImages([...images]);
          }
        }
        setIsLoadingImages(false);
      };
      loadImages();
    }
  }, [mainSection, mediaTab]);

  // Reset pagination when leaving images tab
  useEffect(() => {
    if (mediaTab !== 'images') {
      setImagesToShow(12);
    }
  }, [mediaTab]);

  const displayedImages = loadedImages.slice(0, imagesToShow);
  const hasMoreImages = imagesToShow < loadedImages.length;

  const loadMoreImages = () => {
    setImagesToShow(prev => Math.min(prev + 12, loadedImages.length));
  };

  // Print Media Data (placeholder - to be added later)
  const printMedia = [
    // Add print media items here
  ];

  // Audio Data (placeholder - to be added later)
  const audioFiles = [
    // Add audio files here
  ];

  // eBook Data
  const ebooks = [
    {
      id: 1,
      title: "BRACE Handbook",
      description: "Comprehensive guide on road safety best practices and awareness",
      file: braceHandbook,
      fileSize: "PDF",
      category: "Road Safety Guide"
    },
    {
      id: 2,
      title: "ROADWISE - Kannada",
      description: "Road safety awareness guide in Kannada language",
      file: roadwiseKannada,
      fileSize: "PDF",
      category: "Road Safety Guide"
    }
  ];

  // Load BRACE News PDFs
  const braceNewsModules = import.meta.glob('../../../assets/events/BRACE News/**/*.{pdf,PDF}', { eager: false, import: 'default' });
  const [braceNewsDocuments, setBraceNewsDocuments] = useState([]);
  
  // Load MSIA Award images
  const msiaAwardModules = import.meta.glob('../../../assets/events/MSIA Award/**/*.{jpg,JPG,jpeg,JPEG,png,PNG}', { eager: false, import: 'default' });
  const [msiaAwardDocuments, setMsiaAwardDocuments] = useState([]);

  // Load documents when Documents tab is active
  useEffect(() => {
    if (mainSection === 'media' && mediaTab === 'documents') {
      // Load BRACE News PDFs
      if (braceNewsDocuments.length === 0) {
        const loadBraceNews = async () => {
          const docs = await Promise.all(
            Object.entries(braceNewsModules).map(async ([path, importFn], index) => {
              const file = await importFn();
              const filename = path.split('/').pop().replace(/\.(pdf|PDF)$/, '');
              return {
                id: `brace-${index + 1}`,
                title: filename,
                file: file,
                type: 'PDF',
                path: path
              };
            })
          );
          setBraceNewsDocuments(docs);
        };
        loadBraceNews();
      }
      
      // Load MSIA Award images
      if (msiaAwardDocuments.length === 0) {
        const loadMsiaAward = async () => {
          const docs = await Promise.all(
            Object.entries(msiaAwardModules).map(async ([path, importFn], index) => {
              const file = await importFn();
              const filename = path.split('/').pop().replace(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/, '');
              const city = path.includes('Bangalore') ? 'Bangalore' : path.includes('Mumbai') ? 'Mumbai' : 'Pune';
              return {
                id: `msia-${index + 1}`,
                title: filename,
                file: file,
                type: 'Image',
                city: city,
                path: path
              };
            })
          );
          setMsiaAwardDocuments(docs);
        };
        loadMsiaAward();
      }
    }
  }, [mainSection, mediaTab]);

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      role: "Principal, St Joseph Boys High School, Kirkee, Pune",
      rating: 5,
      text: "The Road Safety Awareness Program conducted by Safety Research Foundation was highly impactful. Our students learned crucial safety practices that they can apply in their daily lives. The interactive sessions and practical demonstrations made the learning experience memorable."
    },
    {
      id: 2,
      name: "Inspector P. Masalkar",
      role: "Senior Police Inspector, Pune University Traffic Police Station",
      rating: 5,
      text: "SRF's Go Yellow campaign was a remarkable initiative that created significant awareness among road users. The team's dedication and systematic approach to road safety education is commendable. We look forward to more such collaborative efforts."
    },
    {
      id: 3,
      name: "Mrs. Priya Sharma",
      role: "Parent, Tuljabhavani Housing Society, Ravet",
      rating: 5,
      text: "The Child Safety Seat Awareness session was eye-opening. I never realized how crucial proper installation is for my child's safety. The hands-on demonstration in my own car helped me understand the correct usage. Thank you SRF for this valuable session!"
    },
    {
      id: 4,
      name: "Father Joyce Kurian",
      role: "School Administrator, St Arnolds School, Wadgaon Shari",
      rating: 5,
      text: "Safety Research Foundation's program was well-structured and age-appropriate for our students. The emphasis on traffic rules, pedestrian safety, and helmet usage resonated well with the children. This is exactly the kind of education our youth needs."
    },
    {
      id: 5,
      name: "Mr. Chandrakant Madane",
      role: "Police Inspector, Kuhi Police Station, Nagpur",
      rating: 5,
      text: "The reflective safety jacket distribution by SRF was a thoughtful gesture that shows their commitment to the safety of those who serve on the roads. These jackets significantly improve our visibility during night duties, enhancing our safety while we ensure public safety."
    },
    {
      id: 6,
      name: "Prof. Anil Deshmukh",
      role: "Faculty, Data Science Department, Symbiosis Open Skills University",
      rating: 5,
      text: "The session on data-driven road safety was perfectly tailored for our data science students. It demonstrated real-world applications of data analytics in solving critical social issues. SRF's evidence-based approach is truly inspiring."
    }
  ];

  const handleReadMore = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  // Testimonials carousel auto-play functionality
  useEffect(() => {
    if (mainSection === 'testimonials' && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, mainSection, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header with decorative lines */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="hidden sm:block flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"></div>
            <div className="flex items-center gap-3 sm:gap-4 mx-3 sm:mx-4 md:mx-6">
              <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-black whitespace-nowrap">Our Events</h2>
            </div>
            <div className="hidden sm:block flex-1 h-0.5 bg-gradient-to-l from-transparent via-primary to-primary"></div>
          </div>
        </div>

        {/* Main Section Tabs (Events / Media / Testimonials) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 max-w-2xl mx-auto">
          <button
            onClick={() => setMainSection('events')}
            className={`flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
              mainSection === 'events'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
            }`}
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            Events
          </button>
          <button
            onClick={() => setMainSection('media')}
            className={`flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
              mainSection === 'media'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
            }`}
          >
            <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
            Media
          </button>
          <button
            onClick={() => setMainSection('testimonials')}
            className={`flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
              mainSection === 'testimonials'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
            }`}
          >
            <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
            Testimonials
          </button>
        </div>

        {/* EVENTS SECTION */}
        {mainSection === 'events' && (
          <>
            
            {/* Event Type Tabs (Upcoming/Completed) */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 sm:mb-6 max-w-lg mx-auto">
              <button
                onClick={() => setEventTab('upcoming')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  eventTab === 'upcoming'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                Upcoming Events ({upcomingEvents.length})
              </button>
              <button
                onClick={() => setEventTab('completed')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  eventTab === 'completed'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                Completed Events ({completedEvents.length})
              </button>
            </div>

            {/* Filter Tabs - Only show for completed events */}
            {eventTab === 'completed' && (
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 px-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      filter === category
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            )}

            {/* No Events Message */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12 sm:py-16 px-4">
                <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                  {eventTab === 'upcoming' ? 'No Upcoming Events' : 'No Completed Events'}
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  {eventTab === 'upcoming' ? 'Check back soon for new events!' : 'No completed events in this category.'}
                </p>
              </div>
            )}

            {/* Events Grid */}
            {filteredEvents.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-dashed border-brand-black hover:border-primary">
                    <div className="relative">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          {event.category}
                        </span>
                      </div>
                      {eventTab === 'completed' && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Completed
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.date}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.excerpt}</p>
                      <button
                        onClick={() => handleReadMore(event.id)}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-200 font-medium text-sm"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* MEDIA SECTION */}
        {mainSection === 'media' && (
          <>
            {/* Media Sub-Tabs */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-5 sm:mb-6 max-w-4xl mx-auto">
              <button
                onClick={() => setMediaTab('videos')}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  mediaTab === 'videos'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Videos
              </button>
              <button
                onClick={() => setMediaTab('images')}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  mediaTab === 'images'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <Image className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Images
              </button>
              <button
                onClick={() => setMediaTab('documents')}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  mediaTab === 'documents'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Print Media
              </button>
              <button
                onClick={() => setMediaTab('audio')}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  mediaTab === 'audio'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Audio
              </button>
              <button
                onClick={() => setMediaTab('ebook')}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  mediaTab === 'ebook'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                eBooks
              </button>
            </div>

            {/* Videos Tab Content */}
            {mediaTab === 'videos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {videos.map((video) => (
                  <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-dashed border-brand-black hover:border-primary">
                    {/* YouTube Thumbnail */}
                    <a
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group/thumb block cursor-pointer"
                    >
                      <img 
                        src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          // Fallback to standard quality if maxresdefault is not available
                          e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                        }}
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/thumb:bg-black/50 transition-colors duration-300">
                        <div className="bg-primary rounded-full p-4 group-hover/thumb:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Images Tab Content */}
            {mediaTab === 'images' && (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {displayedImages.map((item) => (
                    <div
                      key={item.id}
                      className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                    >
                      <img 
                        src={item.image} 
                        alt={`Traffic Awareness ${item.id}`}
                        className="w-full h-full object-cover aspect-square"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                          <ArrowRight className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMoreImages && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={loadMoreImages}
                      className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Load More Images
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Loading Indicator */}
                {isLoadingImages && displayedImages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading images...</p>
                  </div>
                )}
              </div>
            )}

            {/* Documents Tab Content */}
            {mediaTab === 'documents' && (
              <div>
                {/* Document Subsection Tabs */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-5 sm:mb-6 max-w-md mx-auto">
                  <button
                    onClick={() => setDocumentTab('brace')}
                    className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      documentTab === 'brace'
                        ? 'bg-brand-green text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    BRACE News
                  </button>
                  <button
                    onClick={() => setDocumentTab('msia')}
                    className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      documentTab === 'msia'
                        ? 'bg-brand-green text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                    }`}
                  >
                    <Image className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    MSIA Award
                  </button>
                </div>

                {/* BRACE News Section */}
                {documentTab === 'brace' && braceNewsDocuments.length > 0 && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                      {braceNewsDocuments.map((doc) => (
                        <a
                          key={doc.id}
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white border-2 border-gray-200"
                        >
                          {/* PDF Preview */}
                          <div className="w-full aspect-[3/4] bg-gray-50 relative">
                            <iframe
                              src={`${doc.file}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH&zoom=page-fit`}
                              className="w-full h-full pointer-events-none absolute inset-0"
                              title={doc.title}
                              loading="lazy"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary rounded-full p-3">
                                <FileText className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          </div>
                          {/* PDF Title */}
                          <div className="p-3 bg-white">
                            <p className="text-sm text-gray-800 line-clamp-2 font-medium">{doc.title}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">PDF</span>
                              <ExternalLink className="w-3 h-3 text-gray-400" />
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* MSIA Award Section */}
                {documentTab === 'msia' && msiaAwardDocuments.length > 0 && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                      {msiaAwardDocuments.map((doc) => (
                        <a
                          key={doc.id}
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white border-2 border-gray-200"
                        >
                          <div className="w-full aspect-[3/4] bg-gray-50 relative flex items-center justify-center p-2">
                            <img 
                              src={doc.file} 
                              alt={doc.title}
                              className="max-w-full max-h-full w-auto h-auto object-contain"
                              loading="lazy"
                            />
                            <div className="absolute top-2 left-2">
                              <span className="bg-primary/90 text-white px-2 py-1 rounded text-xs font-medium shadow-lg">
                                {doc.city}
                              </span>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                          </div>
                          <div className="p-3 bg-white">
                            <p className="text-sm text-gray-800 line-clamp-2 font-medium">{doc.title}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">Image</span>
                              <ExternalLink className="w-3 h-3 text-gray-400" />
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Loading state for BRACE News */}
                {documentTab === 'brace' && braceNewsDocuments.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading BRACE News...</p>
                  </div>
                )}

                {/* Loading state for MSIA Award */}
                {documentTab === 'msia' && msiaAwardDocuments.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading MSIA Award...</p>
                  </div>
                )}
              </div>
            )}

            {/* Audio Tab Content */}
            {mediaTab === 'audio' && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: 1, title: "BOSCH Creative 01", file: audio1 },
                    { id: 2, title: "BOSCH Creative 02", file: audio2 },
                    { id: 3, title: "BOSCH Creative 03", file: audio3 },
                    { id: 4, title: "BOSCH Creative 04", file: audio4 },
                    { id: 5, title: "BOSCH Creative 05", file: audio5 },
                    { id: 6, title: "BOSCH Creative 06", file: audio6 },
                    { id: 7, title: "BOSCH Creative 07", file: audio7 },
                    { id: 8, title: "BOSCH Creative 08", file: audio8 },
                    { id: 9, title: "BOSCH Creative 09", file: audio9 },
                    { id: 10, title: "BOSCH Creative 10", file: audio10 },
                    { id: 11, title: "BOSCH Creative 11", file: audio11 },
                    { id: 12, title: "BOSCH Creative 12", file: audio12 }
                  ].map((audio) => (
                    <div
                      key={audio.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-dashed border-brand-black hover:border-primary group"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                            <Headphones className="w-12 h-12 text-primary" />
                          </div>
                        </div>
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-bold text-brand-black mb-2 group-hover:text-primary transition-colors duration-300">
                            {audio.title}
                          </h4>
                          <span className="inline-block bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-semibold">
                            Audio Recording
                          </span>
                        </div>
                        <audio
                          controls
                          className="w-full"
                          preload="metadata"
                        >
                          <source src={audio.file} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* eBook Tab Content */}
            {mediaTab === 'ebook' && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ebooks.map((ebook) => (
                    <div
                      key={ebook.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-dashed border-brand-black hover:border-primary group"
                    >
                      <div className="p-6">
                        {/* eBook Icon */}
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                            <BookOpen className="w-12 h-12 text-primary" />
                          </div>
                        </div>

                        {/* eBook Details */}
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-bold text-brand-black mb-2 group-hover:text-primary transition-colors duration-300">
                            {ebook.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">{ebook.description}</p>
                          <span className="inline-block bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-semibold">
                            {ebook.category}
                          </span>
                        </div>

                        {/* Download Button */}
                        <a
                          href={ebook.file}
                          download
                          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg w-full"
                        >
                          <Download className="w-5 h-5" />
                          Download {ebook.fileSize}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State if no ebooks */}
                {ebooks.length === 0 && (
                  <div className="text-center py-16">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No eBooks Available</h3>
                    <p className="text-gray-500">Digital books, guides, and educational materials will be added here.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* TESTIMONIALS SECTION */}
        {mainSection === 'testimonials' && (
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-primary hover:shadow-xl transition-all duration-300 hover:scale-110 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="text-primary group-hover:text-white transition-colors" size={24} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-primary hover:shadow-xl transition-all duration-300 hover:scale-110 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="text-primary group-hover:text-white transition-colors" size={24} />
            </button>

            {/* Testimonials Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${(currentIndex % testimonials.length) * (100 / 3)}%)` }}
              >
                {/* Duplicate testimonials for infinite loop effect */}
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-dashed border-brand-black hover:border-primary h-full group">
                      {/* Quote Icon */}
                      <div className="flex justify-between items-start mb-4">
                        <Quote className="text-primary/20 group-hover:text-primary/40 transition-colors duration-300" size={40} />
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-primary fill-primary"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-brand-black/80 mb-6 leading-relaxed line-clamp-4">
                        "{testimonial.text}"
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-4 pt-4 border-t border-primary/20">
                        <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 group-hover:border-primary transition-colors flex items-center justify-center">
                          <span className="text-primary font-bold text-lg">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-brand-black group-hover:text-primary transition-colors">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-brand-black/60">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-3 bg-primary'
                      : 'w-3 h-3 bg-gray-300 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsAndEvents;

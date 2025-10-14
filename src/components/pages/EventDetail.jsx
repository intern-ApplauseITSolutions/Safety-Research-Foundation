import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, Users, Building2, Award, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Child Safety Seat Awareness Session images
import childSafety1 from '../../assets/images/ChildSafetySeatAwarenessSession/IMG-20250112-WA0001.jpg';
import childSafety2 from '../../assets/images/ChildSafetySeatAwarenessSession/IMG-20250112-WA0003.jpg';
import childSafety3 from '../../assets/images/ChildSafetySeatAwarenessSession/IMG-20250112-WA0005.jpg';
import childSafety4 from '../../assets/images/ChildSafetySeatAwarenessSession/IMG-20250112-WA0006.jpg';
import childSafety5 from '../../assets/images/ChildSafetySeatAwarenessSession/IMG-20250112-WA0014.jpg';

// Import Road Safety Awareness Program images from St Joseph Boys High School
import stJoseph1 from '../../assets/images/RoadSafetyAwarenessProgram –01&02Sep2022/IMG_20220901_134547-scaled.jpg';
import stJoseph2 from '../../assets/images/RoadSafetyAwarenessProgram –01&02Sep2022/IMG_20220901_150535-1.jpg';
import stJoseph3 from '../../assets/images/RoadSafetyAwarenessProgram –01&02Sep2022/IMG_20220902_134613-scaled.jpg';
import stJoseph4 from '../../assets/images/RoadSafetyAwarenessProgram –01&02Sep2022/IMG_20220902_1412231-scaled-e1662963720705.jpg';

// Import Road Safety Awareness Program images from St Arnolds Central School
import stArnolds1 from '../../assets/images/RoadSafetyAwarenessProgram–StArnoldsCentralSchoolPune.@29thJuly2022/29th-St-Arnolds-1-1-scaled.jpg';
import stArnolds2 from '../../assets/images/RoadSafetyAwarenessProgram–StArnoldsCentralSchoolPune.@29thJuly2022/29th-St-Arnolds-2-2-2-scaled.jpg';
import stArnolds3 from '../../assets/images/RoadSafetyAwarenessProgram–StArnoldsCentralSchoolPune.@29thJuly2022/29th-St-Arnolds-3-1-scaled.jpg';
import stArnolds4 from '../../assets/images/RoadSafetyAwarenessProgram–StArnoldsCentralSchoolPune.@29thJuly2022/29th-St-Arnolds-4-1-1-scaled.jpg';

// Import Road Safety Awareness Program images from St Arnolds School Wadgaon Shari
import stArnoldsWadgaon1 from '../../assets/images/Road SafetyAwarenessProgram–StArnoldSchoolPune.@22ndJuly2022/22nd-St-Arnolds-1-2-scaled.jpg';
import stArnoldsWadgaon2 from '../../assets/images/Road SafetyAwarenessProgram–StArnoldSchoolPune.@22ndJuly2022/22nd-St-Arnolds-2-1-1-scaled.jpg';
import stArnoldsWadgaon3 from '../../assets/images/Road SafetyAwarenessProgram–StArnoldSchoolPune.@22ndJuly2022/22nd-St-Arnolds-3-1-1-scaled.jpg';
import stArnoldsWadgaon4 from '../../assets/images/Road SafetyAwarenessProgram–StArnoldSchoolPune.@22ndJuly2022/22nd-St-Arnolds-4-1-scaled.jpg';

// Import Road Safety Awareness Program images from Apte Prashala
import aptePrashala1 from '../../assets/images/Road SafetyAwarenessProgram–AptePrashalaDeccanGymkhanaPune. @12thJuly2022/12th-Apte-School-1-1-scaled.jpg';
import aptePrashala2 from '../../assets/images/Road SafetyAwarenessProgram–AptePrashalaDeccanGymkhanaPune. @12thJuly2022/12th-Apte-school-2-1-scaled.jpg';
import aptePrashala3 from '../../assets/images/Road SafetyAwarenessProgram–AptePrashalaDeccanGymkhanaPune. @12thJuly2022/12th-Apte-School-3-1.jpg';
import aptePrashala4 from '../../assets/images/Road SafetyAwarenessProgram–AptePrashalaDeccanGymkhanaPune. @12thJuly2022/12th-Apte-school-4-1.jpg';

// Import Go Yellow Road Safety Awareness Campaign images
import goYellow1 from '../../assets/images/GoYellowRoadSafetyAwareness25th&26thFeb2022/1.jpg';
import goYellow2 from '../../assets/images/GoYellowRoadSafetyAwareness25th&26thFeb2022/2.jpg';
import goYellow3 from '../../assets/images/GoYellowRoadSafetyAwareness25th&26thFeb2022/3.jpg';
import goYellow4 from '../../assets/images/GoYellowRoadSafetyAwareness25th&26thFeb2022/4.jpg';
import goYellow5 from '../../assets/images/GoYellowRoadSafetyAwareness25th&26thFeb2022/5.jpg';

// Import Reflective Safety Jacket Distribution event images
import jacketDistribution1 from '../../assets/images/Reflective Safety jacket Distribution event – MIDC Buttibori police station Nagpur/IMG_20210219_124830-scaled.jpg';
import jacketDistribution2 from '../../assets/images/Reflective Safety jacket Distribution event – MIDC Buttibori police station Nagpur/IMG_20210219_125456-scaled.jpg';

// Import Road Safety Audit NH 48 images
import nh48Audit1 from '../../assets/images/RoadSafetyAuditNH48{Katraj–DehuRoadBypass Pune}/1_pune-katrej.jpg';
import nh48Audit2 from '../../assets/images/RoadSafetyAuditNH48{Katraj–DehuRoadBypass Pune}/2_pune-katrej.jpg';
import nh48Audit3 from '../../assets/images/RoadSafetyAuditNH48{Katraj–DehuRoadBypass Pune}/3_pune-katrej.jpg';

// Import Buttibori Police Station Jacket Distribution event images
import buttiboriJacket1 from '../../assets/images/Reflective Safety jacket Distribution event – Buttibori Police Station Nagpur/IMG_20210219_113036-1.jpg';
import buttiboriJacket2 from '../../assets/images/Reflective Safety jacket Distribution event – Buttibori Police Station Nagpur/IMG_20210219_113330-scaled.jpg';

// Import Umred Police Station Jacket Distribution event images
import umredJacket1 from '../../assets/images/Reflective Safety jacket Distribution event – Umred police station Nagpur/IMG_9873-umred-scaled.jpg';
import umredJacket2 from '../../assets/images/Reflective Safety jacket Distribution event – Umred police station Nagpur/IMG_9892-umred-scaled.jpg';

// Import Kalameshwar Police Station Jacket Distribution event images
import kalameshwarJacket1 from '../../assets/images/Reflective Safety jacket Distribution event – Kalameshwar police station Nagpur/IMG_9615.jpg';
import kalameshwarJacket2 from '../../assets/images/Reflective Safety jacket Distribution event – Kalameshwar police station Nagpur/IMG_9616-1-scaled.jpg';

// Import Kuhi Police Station Jacket Distribution event images
import kuhiJacket1 from '../../assets/images/Reflective Safety jacket Distribution event – Kuhi police station Nagpur/2-scaled.jpg';
import kuhiJacket2 from '../../assets/images/Reflective Safety jacket Distribution event – Kuhi police station Nagpur/3-scaled.jpg';

// Import Safety Mask Distribution event images
import maskDistribution1 from '../../assets/images/Safety mask distribution event – Pune/IMG_20200911_112943-01.jpeg';
import maskDistribution2 from '../../assets/images/Safety mask distribution event – Pune/IMG_20200911_114036-01.jpeg';
import maskDistribution3 from '../../assets/images/Safety mask distribution event – Pune/IMG_20200911_114130.jpg';
import maskDistribution4 from '../../assets/images/Safety mask distribution event – Pune/IMG_20200911_114205-01.jpeg';

// Import Coimbatore Safety Mask Distribution event images
import coimbatoreMask1 from '../../assets/images/Safety mask distribution event – Coimbatore/0.6.jpeg';
import coimbatoreMask2 from '../../assets/images/Safety mask distribution event – Coimbatore/0.7.jpeg';
import coimbatoreMask3 from '../../assets/images/Safety mask distribution event – Coimbatore/1.jpeg';
import coimbatoreMask4 from '../../assets/images/Safety mask distribution event – Coimbatore/13-scaled.jpg';
import coimbatoreMask5 from '../../assets/images/Safety mask distribution event – Coimbatore/3-1.jpeg';
import coimbatoreMask6 from '../../assets/images/Safety mask distribution event – Coimbatore/4.jpeg';

// Import Ahmedabad Safety Mask Distribution event images
import ahmedabadMask1 from '../../assets/images/Safety mask distribution event – Ahmedabad/1-1-scaled.jpg';
import ahmedabadMask2 from '../../assets/images/Safety mask distribution event – Ahmedabad/2-1-scaled.jpg';
import ahmedabadMask3 from '../../assets/images/Safety mask distribution event – Ahmedabad/3.jpeg';

// Import Chetan Dattaji Gaikwad High School program images
import chetanSchool1 from '../../assets/images/Road Safety Awareness Program- Chetan Dattaji Gaikwad High School, Khadki, Pune/s7.jpeg';
import chetanSchool2 from '../../assets/images/Road Safety Awareness Program- Chetan Dattaji Gaikwad High School, Khadki, Pune/s8.jpeg';

// Import Symbiosis Open Skills University program image
import symbiosisUniversity1 from '../../assets/images/Road Safety Awareness Program- Symbiosis Open Skills University, Pune/s9.jpeg';

// Import NCL Junior College program image
import nclCollege1 from '../../assets/images/Road Safety Awareness Program- NCL Junior College, Pune/s10.jpeg';

// Import Vidyanchal School program images
import vidyanchalSchool1 from '../../assets/images/Road Safety Awareness Program- Vidyanchal School, Pune/s13.png';
import vidyanchalSchool2 from '../../assets/images/Road Safety Awareness Program- Vidyanchal School, Pune/s14.jpeg';

// Import Manchester International School program image
import manchesterSchool1 from '../../assets/images/Road Safety Awareness Program- Manchester international school, Coimbatore/s15-1.jpeg';

// Import Loyola High School program images
import loyolaSchool1 from '../../assets/images/Road Safety Awareness Program- Loyola High School, Pune/s11.jpeg';
import loyolaSchool2 from '../../assets/images/Road Safety Awareness Program- Loyola High School, Pune/s12.jpeg';

// Import local images as placeholders for other Road Safety events
import roadSafety1 from '../../assets/images/Road_Safety_Training.jpg';
import roadSafety2 from '../../assets/images/Create_Public_awareness.jpg';
import roadSafety3 from '../../assets/images/People_Driver_Training.jpg';
import roadSafety4 from '../../assets/images/Road_Infrastructure.jpg';
import roadSafety5 from '../../assets/images/carousel-3.jpg';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Comprehensive events data
  const eventsData = [
    {
      id: 1,
      title: "Child Safety Seat Awareness Session",
      date: "11th January 2025",
      location: "Tuljabhavani Housing Society, Ravet, Pune",
      category: "Awareness Session",
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
      content: "Safety Research Foundation, in collaboration with Rotary Club Khadki, successfully conducted Road Safety Awareness sessions at three prominent schools in Khadki, Pune—GMI Girls High School (73 students), Alegaokar High School (64 students), and Chetan Dattaji Gaikwad English Medium School (45 students).",
      fullDescription: `Safety Research Foundation, in collaboration with Rotary Club Khadki, successfully conducted Road Safety Awareness sessions at three prominent schools in Khadki, Pune—GMI Girls High School (73 students), Alegaokar High School (64 students), and Chetan Dattaji Gaikwad English Medium School (45 students).

The sessions focused on key topics such as helmet usage for two-wheeler safety, pedestrian safety practices, adherence to traffic rules and signals, the dangers of distracted driving, and the risks of speeding. Students actively participated in engaging discussions, received practical tips, and took part in interactive Q&A sessions. A significant highlight of the event was the collective pledge taken by the students to follow and promote road safety measures within their families and communities. The program emphasized the importance of sharing these learnings to create a broader impact.

SRF continues its commitment to fostering safer roads through education and advocacy, with these sessions representing a crucial step toward nurturing a culture of safety among young road users.

Glimpses of Program`,
      image: roadSafety1,
      images: [roadSafety1, roadSafety2, roadSafety3],
      featured: true
    },
    {
      id: 3,
      title: "Road Safety Awareness Program",
      date: "01 & 02 Sep 2022",
      location: "St Joseph Boys High School, Kirkee, Pune",
      category: "School Program",
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
      content: "Safety Research Foundation conducted an online session on Scientific Crash Investigation and Data Collection for Indian Chemical Council (ICC) employees on 28th September 2021. The webinar session was part of the workshop Emergency Response Services Training organized by ICC. The importance of scientific crash investigation and its procedures were discussed in this session.",
      fullDescription: `Safety Research Foundation conducted an online session on "Scientific Crash Investigation and Data Collection" for Indian Chemical Council (ICC) employees on 28th September 2021. The webinar session was part of the workshop "Emergency Response Services Training" organized by ICC. The importance of scientific crash investigation and its procedures were discussed in this session.`,
      image: "https://via.placeholder.com/400x250/7c3aed/ffffff?text=ICC+Webinar",
      images: [roadSafety1, roadSafety2],
      featured: false
    },
    {
      id: 9,
      title: "Road Safety Audit: NH 48",
      date: "24th March 2021",
      location: "Katraj – Dehu Road Bypass, Pune",
      category: "Safety Audit",
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

  // Find the event by ID
  const event = eventsData.find(e => e.id === parseInt(id));

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const switchMainImage = (index) => {
    setMainImageIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when user manually switches
  };

  const nextImage = () => {
    if (event?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
    }
  };

  const prevImage = () => {
    if (event?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
    }
  };

  // Auto-play main image slideshow
  React.useEffect(() => {
    if (!event?.images || event.images.length <= 1 || !isAutoPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setMainImageIndex((prev) => (prev + 1) % event.images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [event?.images, isAutoPlaying]);

  // Scroll to top when component mounts or ID changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <button
            onClick={() => {
              navigate(-1);
              // Small delay to ensure navigation completes before scrolling
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => {
              navigate(-1);
              // Small delay to ensure navigation completes before scrolling
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
              {event.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {event.title}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Full Width Content */}
        <div>
            {/* Event Images */}
            {event.images && event.images.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-gradient-primary rounded-full"></span>
                  Event Gallery
                </h2>
                
                {/* Hero Image */}
                {event.images.length > 0 && (
                  <div className="mb-6">
                    <div 
                      className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                      onClick={() => openLightbox(mainImageIndex)}
                    >
                      <div className="aspect-[4/3] sm:aspect-[3/2] bg-gray-100">
                        <img
                          src={event.images[mainImageIndex]}
                          alt={`${event.title} - Main Image`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          loading="lazy"
                          key={mainImageIndex}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                          Click to view full size
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>

                      {/* Play/Pause Button */}
                      {event.images.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsAutoPlaying(!isAutoPlaying);
                          }}
                          className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm"
                          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                        >
                          {isAutoPlaying ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      )}
                      
                      {/* Image indicator with auto-play status */}
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <span>{mainImageIndex + 1} / {event.images.length}</span>
                          {event.images.length > 1 && (
                            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Small Thumbnail Grid - All images */}
                {event.images.length > 1 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
                    {event.images.map((image, index) => (
                      <div key={index} className="group relative">
                        <div 
                          className={`aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-gray-100 ${
                            index === mainImageIndex ? 'ring-2 ring-primary ring-offset-2' : ''
                          }`}
                          onClick={() => switchMainImage(index)}
                        >
                          <img
                            src={image}
                            alt={`${event.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="bg-white/90 text-gray-800 px-1.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm">
                              {index + 1}
                            </span>
                          </div>
                          {index === mainImageIndex && (
                            <div className="absolute top-1 left-1">
                              <div className="bg-primary text-white rounded-full p-1">
                                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )}
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/60 backdrop-blur-sm rounded-full p-0.5">
                              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Gallery Stats */}
                <div className="mt-6 flex items-center justify-center">
                  <div className="bg-primary/10 rounded-full px-6 py-2 border border-primary/20">
                    <span className="text-sm font-medium text-gray-700">
                      {event.images.length} {event.images.length === 1 ? 'Photo' : 'Photos'} from this event
                    </span>
                  </div>
                </div>
              </div>
            )}

          {/* Event Description - Full Width */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
              <span className="w-1 h-6 sm:h-8 bg-gradient-primary rounded-full"></span>
              About This Event
            </h2>
            
            {/* Event Information Inside About Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Event Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1 text-sm">Date</p>
                    <p className="text-gray-600 text-sm">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1 text-sm">Location</p>
                    <p className="text-gray-600 text-sm">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1 text-sm">Category</p>
                    <p className="text-gray-600 text-sm">{event.category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1 text-sm">Organized By</p>
                    <p className="text-gray-600 text-sm">Safety Research Foundation (SRF)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-primary/5 rounded-lg p-6 border-l-4 border-primary mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {event.content}
                </p>
              </div>
              
              {event.fullDescription && (
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {event.fullDescription}
                </div>
              )}
            </div>
          </div>

          {/* Impact Section - Full Width */}
          <div className="bg-primary/10 rounded-xl p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Award className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Our Impact & Mission</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Promoting road safety awareness in communities</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Supporting traffic police and law enforcement</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Reducing road accidents through education</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Building safer road infrastructure</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Conducting scientific research on road safety</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Collaborating with government agencies</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && event?.images && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            {/* Close Button - More Visible and Mobile Friendly */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[10000] bg-black/80 hover:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Navigation Buttons - Mobile Friendly */}
            {event.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[9999] bg-black/80 hover:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[9999] bg-black/80 hover:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Main Image Container - Mobile Responsive */}
            <div 
              className="relative max-h-full max-w-full flex items-center justify-center px-12 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={event.images[currentImageIndex]}
                alt={`${event.title} - Image ${currentImageIndex + 1}`}
                className="max-h-[80vh] sm:max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
                style={{ maxHeight: 'calc(100vh - 140px)' }}
              />
            </div>

            {/* Image Info Bar - Mobile Responsive */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-[9999]">
              <div className="bg-black/80 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-sm border border-white/30 shadow-lg">
                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <span className="font-medium">
                    {currentImageIndex + 1} / {event.images.length}
                  </span>
                  <span className="text-white/70 hidden sm:inline">•</span>
                  <span className="text-white/90 hidden sm:inline">
                    Press ESC to close, ← → to navigate
                  </span>
                  <span className="text-white/90 sm:hidden">
                    Tap to close
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip - Mobile Responsive */}
            {event.images.length > 1 && (
              <div className="absolute bottom-12 sm:bottom-20 left-1/2 -translate-x-1/2 z-[9999]">
                <div className="flex gap-1 sm:gap-2 max-w-xs sm:max-w-md overflow-x-auto pb-2 px-2">
                  {event.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`flex-shrink-0 w-12 h-9 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'border-white shadow-lg scale-110'
                          : 'border-white/30 hover:border-white/60 hover:scale-105'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;

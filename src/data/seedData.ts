// Seed data exported from data/data.xlsx
import { Division, Employee, DivisionRoleAssignment, User } from '../types';

export const INITIAL_DIVISIONS: Division[] = [
  {
    "id": 1,
    "code": "J101",
    "name": "กองกลาง",
    "is_active": true
  },
  {
    "id": 2,
    "code": "J108",
    "name": "กองโครงการและงบประมาณ",
    "is_active": true
  },
  {
    "id": 3,
    "code": "J111",
    "name": "สำนักนโยบายและแผนกำลังพล",
    "is_active": true
  },
  {
    "id": 4,
    "code": "J110",
    "name": "แผนกการเงิน",
    "is_active": true
  },
  {
    "id": 5,
    "code": "J102",
    "name": "กองจัดการ",
    "is_active": true
  },
  {
    "id": 6,
    "code": "J103",
    "name": "กองปกครอง",
    "is_active": true
  },
  {
    "id": 7,
    "code": "J104",
    "name": "กองบริการกำลังพล",
    "is_active": true
  },
  {
    "id": 8,
    "code": "J105",
    "name": "กองพัฒนากำลังพล",
    "is_active": true
  },
  {
    "id": 9,
    "code": "J106",
    "name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "is_active": true
  },
  {
    "id": 10,
    "code": "J109",
    "name": "กองเทคโนโลยีดิจิทัล",
    "is_active": true
  },
  {
    "id": 11,
    "code": "J107",
    "name": "กองนโยบายและแผน",
    "is_active": true
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    "id": 1,
    "employee_code": "J1001",
    "full_name": "พล.อ.ท. จักรพันธ์  อจลพงศ์",
    "position": "จก.กพ.ทหาร",
    "email": "jakaphun.a@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 2,
    "employee_code": "J1002",
    "full_name": "พล.ต. สมเจษฎ์  สุนทรธรรม",
    "position": "รอง จก.กพ.ทหาร",
    "email": "somjade.s@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 3,
    "employee_code": "J1003",
    "full_name": "พล.ร.ต. พงศ์จักร์  อุไรมาลย์ ร.น.",
    "position": "รอง จก.กพ.ทหาร",
    "email": "pongjak.u@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 4,
    "employee_code": "J1004",
    "full_name": "น.อ. ชาติ  ชั้นเจริญ",
    "position": "ฝสธ.ประจำ กพ.ทหาร (อัตรา กอ.รมน.)",
    "email": "chad.ch@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 5,
    "employee_code": "J1005",
    "full_name": "น.ท.หญิง กิตติยา  วิเศษสินธุ์",
    "position": "น.งบประมาณ กพ.ทหาร",
    "email": "kittiya.w@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 6,
    "employee_code": "J1006",
    "full_name": "ร.ต.หญิง ศิริวรรณ  จันทร์พันธ์ ร.น.",
    "position": "นายทหารตรวจสอบภายใน กพ.ทหาร",
    "email": "siriwan.j@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 7,
    "employee_code": "J1007",
    "full_name": "ร.ต. ทวีศักดิ์  ไชยมหาบุตร",
    "position": "นชง.กพ.ทหาร",
    "email": "taweesak.c@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 8,
    "employee_code": "J1008",
    "full_name": "พ.อ.อ. ศรีประไพ  ได้ผล",
    "position": "พลขับรถ กพ.ทหาร",
    "email": "sriprapai.d@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 9,
    "employee_code": "J1009",
    "full_name": "จ.ส.อ.หญิง พชรพร  ทวินันท์",
    "position": "เสมียนงบประมาณ กพ.ทหาร",
    "email": "pacharaporn.t@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 10,
    "employee_code": "J1010",
    "full_name": "จ.อ.หญิง ศิริพิศ  รามสีดา",
    "position": "เสมียนตรวจสอบภายใน กพ.ทหาร",
    "email": "siriphit.r@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 11,
    "employee_code": "J1011",
    "full_name": "นางสาว ลักษิกา  โรจนรังสิมันตุ์",
    "position": "เสมียนงบประมาณ กพ.ทหาร",
    "email": "laksika.r@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 12,
    "employee_code": "J1069",
    "full_name": "พ.อ.หญิง นันณิดา  สังข์นิ่ม",
    "position": "นปก.ประจำ กพ.ทหาร",
    "email": "nannida.s@rtarf.mi.th",
    "division_code": "J111",
    "division_name": "สำนักนโยบายและแผนกำลังพล",
    "division_id": 3
  },
  {
    "id": 13,
    "employee_code": "J1070",
    "full_name": "พ.อ.หญิง ศิรณัฏฐ์  เชนะโยธิน",
    "position": "นปก.ประจำ กพ.ทหาร",
    "email": "siranut.c@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 14,
    "employee_code": "J1071",
    "full_name": "น.อ. อนุชิต  ชมภู",
    "position": "นปก.ประจำ กพ.ทหาร",
    "email": "anuchit.c@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 15,
    "employee_code": "J1072",
    "full_name": "พ.อ. กัญจน์  น้อยบุญสุก",
    "position": "นปก.ประจำ กพ.ทหาร",
    "email": "kann.n@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 16,
    "employee_code": "J1073",
    "full_name": "น.อ. ตรัยเทพ  เกษศิลป์",
    "position": "นปก.ประจำ กพ.ทหาร",
    "email": "traithep.k@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 17,
    "employee_code": "J1074",
    "full_name": "พ.ท.หญิง ปุณฑิตา  อยู่สำราญ",
    "position": "หน.นกง.ผกง.กพ.ทหาร",
    "email": "punthita.you@rtarf.mi.th",
    "division_code": "J110",
    "division_name": "แผนกการเงิน",
    "division_id": 4
  },
  {
    "id": 18,
    "employee_code": "J1075",
    "full_name": "ร.ท. คำสิงห์  ศรีบุตรตา",
    "position": "นบช.ผกง.กพ.ทหาร",
    "email": "khamsing.s@rtarf.mi.th",
    "division_code": "J110",
    "division_name": "แผนกการเงิน",
    "division_id": 4
  },
  {
    "id": 19,
    "employee_code": "J1076",
    "full_name": "จ.ส.อ.หญิง สุลีพรรณ  แปลกทิศ",
    "position": "เสมียนการเงิน ผกง.กพ.ทหาร",
    "email": "sirintip.p@rtarf.mi.th",
    "division_code": "J110",
    "division_name": "แผนกการเงิน",
    "division_id": 4
  },
  {
    "id": 20,
    "employee_code": "J1077",
    "full_name": "จ.ส.อ.หญิง รัชนีกรณ์  นินหล้า",
    "position": "เสมียนการเงิน ผกง.กพ.ทหาร",
    "email": "ruchneegorn.n@rtarf.mi.th",
    "division_code": "J110",
    "division_name": "แผนกการเงิน",
    "division_id": 4
  },
  {
    "id": 21,
    "employee_code": "J1078",
    "full_name": "นางสาว วชรกมล  โภชชมภู",
    "position": "เสมียนการเงิน ผกง.กพ.ทหาร",
    "email": "wacharakamol.p@rtarf.mi.th",
    "division_code": "J110",
    "division_name": "แผนกการเงิน",
    "division_id": 4
  },
  {
    "id": 22,
    "employee_code": "J1079",
    "full_name": "น.อ. รัฐภูมิ  สิริหงส์",
    "position": "ผอ.กกล.กพ.ทหาร",
    "email": "rattapoom.s@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 23,
    "employee_code": "J1080",
    "full_name": "พ.อ.หญิง ดลปภัสสร์  เถลิงศักดิ์วุฒิกุล",
    "position": "รอง ผอ.กกล.กพ.ทหาร",
    "email": "saisamorn.t@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 24,
    "employee_code": "J1081",
    "full_name": "น.อ.หญิง พชรภา  บุญมาก",
    "position": "ผช.ผอ.กกล.กพ.ทหาร",
    "email": "pacharapa.b@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 25,
    "employee_code": "J1082",
    "full_name": "พ.ท. ทัศน์กร  ละกำปั่น",
    "position": "หน.ผสบ.กกล.กพ.ทหาร",
    "email": "tuchkorn.l@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 26,
    "employee_code": "J1083",
    "full_name": "พ.ต. ธีรภัทร์  จันทร์ขาว",
    "position": "ประจำ ผสบ.กกล.กพ.ทหาร",
    "email": "teerapat.c@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 27,
    "employee_code": "J1084",
    "full_name": "ร.ต. ทนงศักดิ์  ไพรมี",
    "position": "นชง.กพ.ทหาร",
    "email": "thanongsak.pr@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 28,
    "employee_code": "J1085",
    "full_name": "นางสาว ศิริวรรณ  กล่อมกมล",
    "position": "เสมียน ผสบ.กกล.กพ.ทหาร",
    "email": "siriwan.k@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 29,
    "employee_code": "J1086",
    "full_name": "พ.ต.หญิง อมรรัตน์  รัตนะ",
    "position": "ประจำแผนกธุรการและกำลังพล กกล.กพ.ทหาร",
    "email": "amornrat.r@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 30,
    "employee_code": "J1087",
    "full_name": "ร.อ. กอบพิสิฐ  จิระเศรษฐภัทร ร.น.",
    "position": "ประจำแผนกธุรการและกำลังพล กกล.กพ.ทหาร",
    "email": "kobphistt.j@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 31,
    "employee_code": "J1088",
    "full_name": "ร.ท.หญิง วนิดา  เย็นสวาท",
    "position": "นกพ.แผนกธุรการและกำลังพล กกล.กพ.ทหาร",
    "email": "wanida.ye@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 32,
    "employee_code": "J1089",
    "full_name": "จ.ส.อ.หญิง จิราทิพย์  ทุมมา",
    "position": "จนท.กำลังพล แผนกธุรการและกำลังพล กกล.กพ.ทหาร",
    "email": "jirathip.t@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 33,
    "employee_code": "J1090",
    "full_name": "จ.ส.อ.หญิง บัณฑิตา  อาจจำนงค์",
    "position": "เสมียน แผนกธุรการและกำลังพล กกล.กพ.ทหาร",
    "email": "bantita.a@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 34,
    "employee_code": "J1091",
    "full_name": "ร.อ. วริษฐ์  สุนสุข",
    "position": "ประจำแผนกส่งกำลังและบริการ กกล.กพ.ทหาร",
    "email": "chakad.s@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 35,
    "employee_code": "J1092",
    "full_name": "พ.อ.อ. ธนะพัฒน์  มหันตชัยดิษฐ์",
    "position": "พลขับรถ แผนกส่งกำลังและบริการ กกล.กพ.ทหาร",
    "email": "chitchai.y@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 36,
    "employee_code": "J1093",
    "full_name": "พ.อ.อ. ทวีศักดิ์  วรรณดี",
    "position": "เสมียนพลาธิการ แผนกส่งกำลังและบริการ กกล.กพ.ทหาร",
    "email": "thaweesuk.wan@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 37,
    "employee_code": "J1094",
    "full_name": "พ.อ.อ. ปัญญาพร  เลียบสวัสดิ์",
    "position": "พลขับรถ แผนกส่งกำลังและบริการ กกล.กพ.ทหาร",
    "email": "panyaporn.l@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 38,
    "employee_code": "J1095",
    "full_name": "จ.ส.ท.หญิง สุทิศา  อภิรักษ์",
    "position": "เสมียน แผนกส่งกำลังและบริการ กกล.กพ.ทหาร",
    "email": "sutisa.api@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 39,
    "employee_code": "J1096",
    "full_name": "จ.อ. ไอศูรย์  เสกขุนทด",
    "position": "พลขับรถ แผนกส่งกำลังและบริการ กกล.กพ.ทหาร",
    "email": "nattavut.s@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 40,
    "employee_code": "J1097",
    "full_name": "ส.ท. กฤษณะ  จันทรสาร",
    "position": "พลขับรถ แผนกส่งกำลังและบริการ กกล.กพ.ทหาร",
    "email": "kritsana.cha@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 41,
    "employee_code": "J1098",
    "full_name": "ส.ท. ชัยวุฒิ  โนเปลือย",
    "position": "พลขับรถ แผนกส่งกำลังและบริการ กกล.กพ.ทหาร",
    "email": "chaiwut.no@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 42,
    "employee_code": "J1099",
    "full_name": "ส.ท. สรวิศ  ทินกร ณ อยุธยา",
    "position": "พลขับรถ แผนกส่งกำลังและบริการ กกล.กพ.ทหาร",
    "email": "sorrawit.t@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 43,
    "employee_code": "J1100",
    "full_name": "ส.ท. สุรชิต  พรมสี",
    "position": "พลขับรถ แผนกส่งกำลังและบริการ กกล.กพ.ทหาร",
    "email": "surachid.pr@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 44,
    "employee_code": "J1101",
    "full_name": "นางสาว อุศมาลี  พึ่งทรัพย์",
    "position": "เสมียน แผนกส่งกำลังและบริการ กกล.กพ.ทหาร",
    "email": "usamalee.p@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 45,
    "employee_code": "J1102",
    "full_name": "น.อ. วรุตม์  วิเชียร",
    "position": "ผอ.กจก.กพ.ทหาร",
    "email": "varut.v@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 46,
    "employee_code": "J1103",
    "full_name": "พ.อ.หญิง พรพรรณ  สืบจากยง",
    "position": "ผช.ผอ.กจก.กพ.ทหาร",
    "email": "pornphan.sue@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 47,
    "employee_code": "J1104",
    "full_name": "น.อ. เกรียงไกร  เนียมสิน",
    "position": "ผช.ผอ.กจก.กพ.ทหาร",
    "email": "kriangkrai.n@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 48,
    "employee_code": "J1105",
    "full_name": "พ.อ. ปิยะ  ชะโลธร",
    "position": "รอง ผอ.กจก.กพ.ทหาร",
    "email": "piya.c@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 49,
    "employee_code": "J1106",
    "full_name": "พ.ท.หญิง ณัฐยา  ฐิตะฐาน",
    "position": "หน.จัดการกำลังพล กจก.กพ.ทหาร",
    "email": "nattaya.thi@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 50,
    "employee_code": "J1107",
    "full_name": "ร.ท. กฤตภัค  อาศัย",
    "position": "ประจำแผนกจัดการกำลังพล กจก.กพ.ทหาร",
    "email": "kittapak.a@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 51,
    "employee_code": "J1108",
    "full_name": "จ.ส.อ. ชาตรี  พยุงชัยรัตน์",
    "position": "เสมียน แผนกจัดการกำลังพล กจก.กพ.ทหาร",
    "email": "chatree.p@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 52,
    "employee_code": "J1109",
    "full_name": "พ.อ.อ. ยุทธการ  โรจนรังสิมันตุ์",
    "position": "เสมียน แผนกจัดการกำลังพล กจก.กพ.ทหาร",
    "email": "yuttakarn.r@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 53,
    "employee_code": "J1110",
    "full_name": "ส.อ.หญิง ชลลดา  วิริยะประจักรกุล",
    "position": "เสมียน แผนกจัดการกำลังพล กจก.กพ.ทหาร",
    "email": "chonlada.v@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 54,
    "employee_code": "J1111",
    "full_name": "นางสาว รชดา  มาริตแตง",
    "position": "เสมียน แผนกจัดการกำลังพล กจก.กพ.ทหาร",
    "email": "rachada.m@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 55,
    "employee_code": "J1112",
    "full_name": "น.ต. ภรัณยู  อภัยพลชาญ ร.น.",
    "position": "ประจำแผนกสรรหาและบรรจุกำลังพล กจก.กพ.ทหาร",
    "email": "pharanyu.a@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 56,
    "employee_code": "J1113",
    "full_name": "ร.อ.หญิง ปิ่นฤทัย  พลทามูล",
    "position": "ประจำแผนกสรรหาและบรรจุกำลังพล กจก.กพ.ทหาร",
    "email": "pinruethai.phol@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 57,
    "employee_code": "J1114",
    "full_name": "พ.อ.อ. ทองเพียร  จันทร์เรืองศรี",
    "position": "เสมียน แผนกสรรหาและบรรจุกำลังพล กจก.กพ.ทหาร",
    "email": "thongpean.j@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 58,
    "employee_code": "J1115",
    "full_name": "ส.อ.หญิง เมทินี  นาดี",
    "position": "เสมียน แผนกสรรหาและบรรจุกำลังพล กจก.กพ.ทหาร",
    "email": "metinee.n@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 59,
    "employee_code": "J1116",
    "full_name": "พ.ท. บุรินทร์  ศรีสกุล",
    "position": "หน.แนวทางรับราชการ กจก.กพ.ทหาร",
    "email": "burin.s@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 60,
    "employee_code": "J1117",
    "full_name": "ร.อ. เด่นศักดิ์  ศรีตะเขตต์",
    "position": "ประจำแผนกแนวทางรับราชการ กจก.กพ.ทหาร",
    "email": "densak.sr@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 61,
    "employee_code": "J1118",
    "full_name": "จ.ส.ท. นิวัติ  มะลิลาลัย",
    "position": "เสมียน แผนกแนวทางรับราชการ กจก.กพ.ทหาร",
    "email": "niwat.m@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 62,
    "employee_code": "J1119",
    "full_name": "จ.ส.ต. โยธิน  กว้างขวาง",
    "position": "เสมียน แผนกแนวทางรับราชการ กจก.กพ.ทหาร",
    "email": "yothin.kw@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 63,
    "employee_code": "J1120",
    "full_name": "ส.อ.หญิง พัชรี  หล่ำศรี",
    "position": "เสมียน แผนกแนวทางรับราชการ กจก.กพ.ทหาร",
    "email": "patcharee.l@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 64,
    "employee_code": "J1121",
    "full_name": "จ.ต. คุณาธิป  ศรศรีวิวัฒน์",
    "position": "เสมียน แผนกแนวทางรับราชการ กจก.กพ.ทหาร",
    "email": "kunatip.s@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 65,
    "employee_code": "J1122",
    "full_name": "น.อ. รณชัย  ภู่ทองสุข",
    "position": "ผอ.กปค.กพ.ทหาร",
    "email": "ronnachai.p@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 66,
    "employee_code": "J1123",
    "full_name": "พ.อ.หญิง พลอยรัชศ์  โพธิวัฒนางค์กูร",
    "position": "รอง ผอ.กปค.กพ.ทหาร",
    "email": "ployraj.p@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 67,
    "employee_code": "J1124",
    "full_name": "น.อ. เฉลิม  มณีสถิตย์",
    "position": "ผช.ผอ.กปค.กพ.ทหาร",
    "email": "chalerm.ma@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 68,
    "employee_code": "J1125",
    "full_name": "น.อ.หญิง ณภาดา  มะโนแจ่ม ร.น.",
    "position": "ผช.ผอ.กปค.กพ.ทหาร",
    "email": "napada.ma@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 69,
    "employee_code": "J1126",
    "full_name": "น.ท. ศุภาภาส  กิจวรรณ์",
    "position": "หน.วินัย กปค.กพ.ทหาร",
    "email": "supapart.g@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 70,
    "employee_code": "J1127",
    "full_name": "ร.อ.หญิง สุพาณี  พิมพาพร",
    "position": "ประจำแผนกวินัย กปค.กพ.ทหาร",
    "email": "supanee.p@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 71,
    "employee_code": "J1128",
    "full_name": "จ.ส.อ.หญิง เพชรา  แวดไธสง",
    "position": "เสมียน แผนกวินัย กปค.กพ.ทหาร",
    "email": "petchara.w@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 72,
    "employee_code": "J1129",
    "full_name": "ส.อ.หญิง อธิวรรณ์  อธิกูล",
    "position": "เสมียน แผนกวินัย กปค.กพ.ทหาร",
    "email": "athiwan.ath@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 73,
    "employee_code": "J1130",
    "full_name": "จ.ต.หญิง อัญมณี  ช้างเสวก",
    "position": "เสมียน แผนกวินัย กปค.กพ.ทหาร",
    "email": "anyamanee.c@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 74,
    "employee_code": "J1131",
    "full_name": "พ.ท. ธนพล  สัณหวงศ์",
    "position": "หน.ปกครอง กปค.กพ.ทหาร",
    "email": "thanaphon.s@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 75,
    "employee_code": "J1132",
    "full_name": "ส.อ. ภาณุเดช  มีวงษ์",
    "position": "เสมียน แผนกปกครอง กปค.กพ.ทหาร",
    "email": "panoodach.mee@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 76,
    "employee_code": "J1133",
    "full_name": "น.ท.หญิง กิตติยา  แดงเกียรติกำจร",
    "position": "หน.แบบธรรมเนียม กปค.กพ.ทหาร",
    "email": "kittiya.d@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 77,
    "employee_code": "J1134",
    "full_name": "ร.อ. ก้องภพ  นิยมวิทย์",
    "position": "ประจำแผนกแบบธรรมเนียม กปค.กพ.ทหาร",
    "email": "kongphob.n@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 78,
    "employee_code": "J1135",
    "full_name": "พ.จ.อ. วิภัทร  อยู่ดี",
    "position": "เสมียน แผนกแบบธรรมเนียม กปค.กพ.ทหาร",
    "email": "wipat.y@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 79,
    "employee_code": "J1136",
    "full_name": "นางสาว ไอรดา  เจริญคุณ",
    "position": "เสมียน แผนกแบบธรรมเนียม กปค.กพ.ทหาร",
    "email": "irada.ch@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 80,
    "employee_code": "J1137",
    "full_name": "นางสาว รตา  บุญมาก",
    "position": "เสมียน แผนกแบบธรรมเนียม กปค.กพ.ทหาร",
    "email": "ratah.b@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 81,
    "employee_code": "J1138",
    "full_name": "พ.อ. สิริวัฒน์  ทัศนานุตริยกุล",
    "position": "ผอ.กบพ.กพ.ทหาร",
    "email": "siriwat.t@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 82,
    "employee_code": "J1139",
    "full_name": "พ.อ. ระพีพัทธ์  กำลังเอก",
    "position": "รอง ผอ.กบพ.กพ.ทหาร",
    "email": "rapeepat.k@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 83,
    "employee_code": "J1140",
    "full_name": "น.อ.หญิง ธิดารัตน์  อินทร์ผลเล็ก",
    "position": "ผช.ผอ.กบพ.กพ.ทหาร",
    "email": "thidarat.in@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 84,
    "employee_code": "J1141",
    "full_name": "น.อ. ธีระพงศ์  จันทร์ดี ร.น.",
    "position": "ผช.ผอ.กบพ.กพ.ทหาร",
    "email": "theerapong.c@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 85,
    "employee_code": "J1142",
    "full_name": "พ.ต. ปฐมพงศ์  นพเกตุ",
    "position": "หน.ขวัญและบริการกำลังพล กบพ.กพ.ทหาร",
    "email": "pathompong.n@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 86,
    "employee_code": "J1143",
    "full_name": "จ.ส.อ. สุเนตร  ดวงดาว",
    "position": "เสมียน แผนกขวัญและบริการกำลังพล กบพ.กพ.ทหาร",
    "email": "sunate.d@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 87,
    "employee_code": "J1144",
    "full_name": "ส.อ. อาทิตย์  ขุนสังวาลย์",
    "position": "เสมียน แผนกขวัญและบริการกำลังพล กบพ.กพ.ทหาร",
    "email": "artistz.k@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 88,
    "employee_code": "J1145",
    "full_name": "ส.อ.หญิง ปิยะวรรณ  สุจิมงคล",
    "position": "เสมียน แผนกขวัญและบริการกำลังพล กบพ.กพ.ทหาร",
    "email": "piyawan.suj@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 89,
    "employee_code": "J1146",
    "full_name": "พ.ท. จักรกฤษ  สุวรรณหังสกุล",
    "position": "หน.สิทธิกำลังพล กบพ.กพ.ทหาร",
    "email": "jukkird.s@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 90,
    "employee_code": "J1147",
    "full_name": "น.ต.หญิง กชนิภา  วงศ์บูรพาชาติ",
    "position": "ประจำแผนกสิทธิกำลังพล กบพ.กพ.ทหาร",
    "email": "kotchanipha.wo@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 91,
    "employee_code": "J1148",
    "full_name": "ร.อ.หญิง มัธติยา  สอนดี",
    "position": "ประจำแผนกสิทธิกำลังพล กบพ.กพ.ทหาร",
    "email": "mattiya.s@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 92,
    "employee_code": "J1149",
    "full_name": "จ.ส.อ. อภิภู  พัดสำฤทธิผล",
    "position": "เสมียน แผนกสิทธิกำลังพล กบพ.กพ.ทหาร",
    "email": "apiphu.p@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 93,
    "employee_code": "J1150",
    "full_name": "จ.อ.หญิง วันทนา  แก้ววิลัย",
    "position": "เสมียน แผนกสิทธิกำลังพล กบพ.กพ.ทหาร",
    "email": "wanthana.k@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 94,
    "employee_code": "J1151",
    "full_name": "ส.อ. วายุ  ศรีขวัญ",
    "position": "เสมียน แผนกสิทธิกำลังพล กบพ.กพ.ทหาร",
    "email": "wayu.s@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 95,
    "employee_code": "J1152",
    "full_name": "ร.ท.หญิง ปณิสา  เลี่ยนเพชร",
    "position": "ประจำแผนกสวัสดิการ กบพ.กพ.ทหาร",
    "email": "panisa.l@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 96,
    "employee_code": "J1153",
    "full_name": "จ.ส.อ.หญิง เพ็ญศิริ  วนิชสุนทร",
    "position": "เสมียน แผนกสวัสดิการ กบพ.กพ.ทหาร",
    "email": "pensiri@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 97,
    "employee_code": "J1154",
    "full_name": "ส.อ.หญิง สุวิมล  งามสมบูรณ์",
    "position": "เสมียน แผนกสวัสดิการ กบพ.กพ.ทหาร",
    "email": "suwimol.n@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 98,
    "employee_code": "J1155",
    "full_name": "ส.ท.หญิง มณีรัตน์  ทัศนพยัคฆ์",
    "position": "เสมียน แผนกสวัสดิการ กบพ.กพ.ทหาร",
    "email": "maneerat.t@rtarf.mi.th",
    "division_code": "J104",
    "division_name": "กองบริการกำลังพล",
    "division_id": 7
  },
  {
    "id": 99,
    "employee_code": "J1156",
    "full_name": "พ.อ. สำราญ  อ่างแก้ว",
    "position": "ผอ.กพพ.กพ.ทหาร",
    "email": "samran.ang@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 100,
    "employee_code": "J1157",
    "full_name": "น.อ.หญิง เบญญาภา  สุวรรณรังษี ร.น.",
    "position": "รอง ผอ.กพพ.กพ.ทหาร",
    "email": "aree.s@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 101,
    "employee_code": "J1158",
    "full_name": "พ.อ.หญิง จุติณัฏฐ์  กอบกิจสุมงคล",
    "position": "ผช.ผอ.กพพ.กพ.ทหาร",
    "email": "jutinat.k@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 102,
    "employee_code": "J1159",
    "full_name": "พ.อ.หญิง รุ่งนภา  กลัดแกล้วกล้า",
    "position": "ผช.ผอ.กพพ.กพ.ทหาร",
    "email": "natthiporn.c@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 103,
    "employee_code": "J1160",
    "full_name": "พ.ต.หญิง อัญชลิน  ปานทอง",
    "position": "ประจำแผนกพัฒนากำลังพล กพพ.กพ.ทหาร",
    "email": "anchalin.p@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 104,
    "employee_code": "J1161",
    "full_name": "ร.ต.หญิง รัตติกร  รัตนเจริญ",
    "position": "ประจำแผนกพัฒนากำลังพล กพพ.กพ.ทหาร",
    "email": "rattikorn.r@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 105,
    "employee_code": "J1162",
    "full_name": "จ.ส.อ. สราวุธ  แสงทอง",
    "position": "เสมียน แผนกพัฒนากำลังพล กพพ.กพ.ทหาร",
    "email": "sarawut.sang@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 106,
    "employee_code": "J1163",
    "full_name": "จ.อ.หญิง กุลชยาภร  ทฤษฎี",
    "position": "เสมียน แผนกพัฒนากำลังพล กพพ.กพ.ทหาร",
    "email": "nawarat.noy@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 107,
    "employee_code": "J1164",
    "full_name": "ส.ท. คามิน  วิมลกาญจนา",
    "position": "เสมียน แผนกพัฒนากำลังพล กพพ.กพ.ทหาร",
    "email": "kamin.w@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 108,
    "employee_code": "J1165",
    "full_name": "ร.ท. คมสันต์  จุลบุรมย์",
    "position": "ประจำแผนกแผนและโครงการ กพพ.กพ.ทหาร",
    "email": "khomsan.j@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 109,
    "employee_code": "J1166",
    "full_name": "จ.ส.อ.หญิง เสาวลักษณ์  ศรีรักษา",
    "position": "เสมียน แผนกแผนและโครงการ กพพ.กพ.ทหาร",
    "email": "saowalak.s@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 110,
    "employee_code": "J1167",
    "full_name": "จ.ต.หญิง อณิศรา  โสกประเทศ",
    "position": "เสมียน แผนกแผนและโครงการ กพพ.กพ.ทหาร",
    "email": "anisara.s@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 111,
    "employee_code": "J1168",
    "full_name": "พ.ต.หญิง ณัฏฐา  มาลัยวงศ์",
    "position": "ประจำแผนกการศึกษาและฝึกอบรม กพพ.กพ.ทหาร",
    "email": "nattha.m@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 112,
    "employee_code": "J1169",
    "full_name": "ส.อ. จิรวัฒน์  บุตรสอน",
    "position": "เสมียน แผนกการศึกษาและฝึกอบรม กพพ.กพ.ทหาร",
    "email": "jirawat.but@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 113,
    "employee_code": "J1170",
    "full_name": "ส.ท.หญิง ชนัญชิดา  ฉายสุวรรณ",
    "position": "เสมียน แผนกการศึกษาและฝึกอบรม กพพ.กพ.ทหาร",
    "email": "chananchida.ch@rtarf.mi.th",
    "division_code": "J105",
    "division_name": "กองพัฒนากำลังพล",
    "division_id": 8
  },
  {
    "id": 114,
    "employee_code": "J1171",
    "full_name": "น.อ. เกียรติพล  มาฆะมงคล",
    "position": "ผอ.กพบท.กพ.ทหาร",
    "email": "kiettipon.m@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 115,
    "employee_code": "J1172",
    "full_name": "น.อ. อนุสรณ์  ญาติเสมอ",
    "position": "รอง ผอ.กพบท.กพ.ทหาร",
    "email": "anusorn.y@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 116,
    "employee_code": "J1173",
    "full_name": "พ.อ.หญิง อภิรมย์  ประสพศิลป์",
    "position": "ผช.ผอ.กพบท.กพ.ทหาร",
    "email": "apirom.p@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 117,
    "employee_code": "J1174",
    "full_name": "พ.ต.หญิง สุภาวดี  พยนต์ภาค",
    "position": "น.ประเมินผลระบบการบริหารทรัพยากรบุคคล กพบท.กพ.ทหาร",
    "email": "supavadee.p@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 118,
    "employee_code": "J1175",
    "full_name": "น.ต.หญิง เบญจวรรณ  แสงจันทร์",
    "position": "น.พัฒนาระบบการบริหารทรัพยากรบุคคล กพบท.กพ.ทหาร",
    "email": "benjawan.san@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 119,
    "employee_code": "J1176",
    "full_name": "ร.อ. ทีฆัทศน์  ธรรมเสรี",
    "position": "น.พัฒนาระบบการบริหารทรัพยากรบุคคล กพบท.กพ.ทหาร",
    "email": "tekat.t@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 120,
    "employee_code": "J1177",
    "full_name": "ร.ท.หญิง ณัฐกานต์  คงเวทย์ ร.น.",
    "position": "น.ประเมินผลระบบการบริหารทรัพยากรบุคคล กพบท.กพ.ทหาร",
    "email": "nattakarn.k@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 121,
    "employee_code": "J1178",
    "full_name": "ร.ต.หญิง กัญญาณัฐ  ฤกษ์วิธี",
    "position": "น.ประเมินผลระบบการบริหารทรัพยากรบุคคล กพบท.กพ.ทหาร",
    "email": "kanyanat.r@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 122,
    "employee_code": "J1179",
    "full_name": "จ.ส.อ.หญิง ณุตรา  พรมสร",
    "position": "จนท.ประเมินผลระบบการบริหารทรัพยากรบุคคล กพบท.กพ.ทหาร",
    "email": "supaporn.pom@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 123,
    "employee_code": "J1180",
    "full_name": "จ.ส.ท.หญิง สุพิชญา  ชูจร",
    "position": "จนท.พัฒนาระบบการบริหารทรัพยากรบุคคล กพบท.กพ.ทหาร",
    "email": "supitchaya.c@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 124,
    "employee_code": "J1181",
    "full_name": "จ.ท. ธนธรณ์  ผิวเหลือง",
    "position": "จนท.พัฒนาระบบการบริหารทรัพยากรบุคคล กพบท.กพ.ทหาร",
    "email": "tanatron.p@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 125,
    "employee_code": "J1182",
    "full_name": "นาย พิชญุตม์  รงศ์จำเริญ",
    "position": "พนักงานบริการ กพ.ทหาร",
    "email": "pichayut.r@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 126,
    "employee_code": "J1183",
    "full_name": "นางสาว ธัญวรัตน์  เพ็ชรน้อย",
    "position": "พนักงานธุรการ กพ.ทหาร",
    "email": "thunwarat.p@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 127,
    "employee_code": "J1184",
    "full_name": "นาย โชคอนันต์  เสมงคล",
    "position": "พนักงานธุรการ กพ.ทหาร",
    "email": "chokanan.s@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 128,
    "employee_code": "J1185",
    "full_name": "นางสาว ภูริชญา  วุฒิโอฬารกุล",
    "position": "พนักงานธุรการ กพ.ทหาร",
    "email": "phurichaya.wut@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 129,
    "employee_code": "J1186",
    "full_name": "นางสาว แสนดี  เหล่าประยูรศิริ",
    "position": "พนักงานธุรการ กพ.ทหาร",
    "email": "sandee.l@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 130,
    "employee_code": "J1188",
    "full_name": "นางสาว สุลาวัลย์  หิมพานต์",
    "position": "พนักงานบริการ กพ.ทหาร",
    "email": "sulawan.h@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 131,
    "employee_code": "J1189",
    "full_name": "นางสาว นันทกานต์  เหล่าอุฬาร",
    "position": "พนักงานบริการ กพ.ทหาร",
    "email": "nantakarn.l@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 132,
    "employee_code": "J1190",
    "full_name": "นาย ภาคภูมิ  คำก่อ",
    "position": "พนักงานบริการ กพ.ทหาร",
    "email": "pakphoom.kha@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 133,
    "employee_code": "J1192",
    "full_name": "นางสาว วราพร  นิโรจน์สุวรรณ",
    "position": "พนักงานสถิติ กพ.ทหาร",
    "email": "waraporn.n@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 134,
    "employee_code": "J1193",
    "full_name": "นาง กัญญาลักษณ์  วงษาสุข",
    "position": "พนักงานสถิติ กพ.ทหาร",
    "email": "kanyalak.w@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 135,
    "employee_code": "J1194",
    "full_name": "นางสาว สุกัญญา  พึ่งอ่ำ",
    "position": "พนักงานคอมพิวเตอร์ กพ.ทหาร",
    "email": "sukanya.pu@rtarf.mi.th",
    "division_code": "J102",
    "division_name": "กองจัดการ",
    "division_id": 5
  },
  {
    "id": 136,
    "employee_code": "J1195",
    "full_name": "นาย กัณฑ์เอนก  เจตน์กิทินันท์",
    "position": "ช่างทั่วไป กพ.ทหาร",
    "email": "kananek.c@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 137,
    "employee_code": "J1196",
    "full_name": "นาย ก้องภพ  บัวสกัด",
    "position": "ช่างทั่วไป กพ.ทหาร",
    "email": "kongphop.b@rtarf.mi.th",
    "division_code": "J101",
    "division_name": "กองกลาง",
    "division_id": 1
  },
  {
    "id": 138,
    "employee_code": "J1197",
    "full_name": "นางสาว ปวริศา  พาตน",
    "position": "จนท.บริหารทั่วไป กพ.ทหาร",
    "email": "pawarisa.pa@rtarf.mi.th",
    "division_code": "J106",
    "division_name": "กองพัฒนาระบบและบริหารทรัพยากรบุคลล",
    "division_id": 9
  },
  {
    "id": 139,
    "employee_code": "J1198",
    "full_name": "นางสาว ปัทมา  สันติสกุลวงศ์",
    "position": "จนท.บริหารทั่วไป กพ.ทหาร",
    "email": "pattama.sant@rtarf.mi.th",
    "division_code": "J103",
    "division_name": "กองปกครอง",
    "division_id": 6
  },
  {
    "id": 140,
    "employee_code": "J1199",
    "full_name": "พล.ต. สโรช  พารอด",
    "position": "ผอ.สนผพ.กพ.ทหาร",
    "email": "saroch.pa@rtarf.mi.th",
    "division_code": "J111",
    "division_name": "สำนักนโยบายและแผนกำลังพล",
    "division_id": 3
  },
  {
    "id": 141,
    "employee_code": "J1200",
    "full_name": "น.อ. ณัฐพงศ์  วิทยาธีรรัตน์",
    "position": "รอง ผอ.สนผพ.กพ.ทหาร",
    "email": "nuthaphong.v@rtarf.mi.th",
    "division_code": "J111",
    "division_name": "สำนักนโยบายและแผนกำลังพล",
    "division_id": 3
  },
  {
    "id": 142,
    "employee_code": "J1201",
    "full_name": "น.อ. ฐิติพันธ์  บุตรดีสุวรรณ",
    "position": "รอง ผอ.สนผพ.กพ.ทหาร",
    "email": "thitipan.b@rtarf.mi.th",
    "division_code": "J111",
    "division_name": "สำนักนโยบายและแผนกำลังพล",
    "division_id": 3
  },
  {
    "id": 143,
    "employee_code": "J1202",
    "full_name": "ร.อ.หญิง ปริชาติ  สุขอารี",
    "position": "น.ธุรการ สนผพ.กพ.ทหาร",
    "email": "parichart.s@rtarf.mi.th",
    "division_code": "J111",
    "division_name": "สำนักนโยบายและแผนกำลังพล",
    "division_id": 3
  },
  {
    "id": 144,
    "employee_code": "J1203",
    "full_name": "ส.อ. รัตนพงศ์  อยู่เต็มสุข",
    "position": "จนท.ธุรการ สนผพ.กพ.ทหาร",
    "email": "rattanapong.y@rtarf.mi.th",
    "division_code": "J111",
    "division_name": "สำนักนโยบายและแผนกำลังพล",
    "division_id": 3
  },
  {
    "id": 145,
    "employee_code": "J1204",
    "full_name": "น.อ. ประวิทย์  คุณราช",
    "position": "ผอ.กนผ.สนผพ.กพ.ทหาร",
    "email": "prawit.khun@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 146,
    "employee_code": "J1205",
    "full_name": "น.อ.หญิง อภิดาภา  อิ่มแล่ม",
    "position": "รอง ผอ.กนผ.สนผพ.กพ.ทหาร",
    "email": "apidapha.i@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 147,
    "employee_code": "J1206",
    "full_name": "พ.อ. กิตติรัตน์  อินทสร",
    "position": "ผช.ผอ.กนผ.สนผพ.กพ.ทหาร",
    "email": "kittirat.in@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 148,
    "employee_code": "J1207",
    "full_name": "น.อ. วโรทัย  คเรศตรี",
    "position": "ผช.ผอ.กนผ.สนผพ.กพ.ทหาร",
    "email": "warothai.k@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 149,
    "employee_code": "J1208",
    "full_name": "น.ท. จตุพจน์  ศิลา",
    "position": "หน.นโยบายและแผน กนผ.สนผพ.กพ.ทหาร",
    "email": "jatupot.si@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 150,
    "employee_code": "J1209",
    "full_name": "ร.อ. ภูภวะ  สำเร็จผล ร.น.",
    "position": "ประจำแผนกนโยบายและแผน กนผ.สนผพ.กพ.ทหาร",
    "email": "phuphawa.s@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 151,
    "employee_code": "J1210",
    "full_name": "จ.ส.อ.หญิง วนรัตน์  ช้อยสามนาค",
    "position": "เสมียน แผนกนโยบายและแผน กนผ.สนผพ. กพ.ทหาร",
    "email": "vanarat.s@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 152,
    "employee_code": "J1211",
    "full_name": "จ.ส.อ. อิทธิพัทธ์  กุลาราช",
    "position": "เสมียน แผนกนโยบายและแผน กนผ.สนผพ.กพ.ทหาร",
    "email": "aitthiphat.k@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 153,
    "employee_code": "J1212",
    "full_name": "จ.ท.หญิง กัลยรัตน์  อยู่ดี",
    "position": "เสมียน แผนกนโยบายและแผน กนผ.สนผพ.กพ.ทหาร",
    "email": "kanyarat.y@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 154,
    "employee_code": "J1213",
    "full_name": "ส.ต.หญิง สุตาภัทร  แหล่พั่ว",
    "position": "เสมียน แผนกนโยบายและแผน กนผ.สนผพ.กพ.ทหาร",
    "email": "sutapat.lae@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 155,
    "employee_code": "J1214",
    "full_name": "พ.ต. วุฒิศักดิ์  เอี่ยมนาม",
    "position": "ประจำแผนกจัดหากำลังพล กนผ.สนผพ.กพ.ทหาร",
    "email": "vuttisak.o@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 156,
    "employee_code": "J1215",
    "full_name": "จ.ต.หญิง อนงค์ลักษณ์  แก้วชูใส",
    "position": "เสมียน แผนกจัดหากำลังพล กนผ.สนผพ.กพ.ทหาร",
    "email": "anonglak.ka@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 157,
    "employee_code": "J1216",
    "full_name": "ร.ต. อภิชาติ  โตสุนทร ร.น.",
    "position": "ประจำแผนกกำลังสำรอง กนผ.สนผพ.กพ.ทหาร",
    "email": "apichart.t@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 158,
    "employee_code": "J1217",
    "full_name": "ส.ท.หญิง วิยะดา  พรมมา",
    "position": "เสมียน แผนกกำลังสำรอง กนผ.สนผพ.กพ.ทหาร",
    "email": "wiyada.p@rtarf.mi.th",
    "division_code": "J107",
    "division_name": "กองนโยบายและแผน",
    "division_id": 11
  },
  {
    "id": 159,
    "employee_code": "J1218",
    "full_name": "น.อ. สมภพ  ศรีหิรัญ",
    "position": "ผอ.กคง.สนผพ.กพ.ทหาร",
    "email": "sompop.sr@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 160,
    "employee_code": "J1219",
    "full_name": "พ.อ.หญิง จุฑารัตน์  พุฒตาล",
    "position": "รอง ผอ.กคง.สนผพ.กพ.ทหาร",
    "email": "jutharat.p@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 161,
    "employee_code": "J1220",
    "full_name": "พ.อ.หญิง วลัยพร  อยู่โต",
    "position": "ผช.ผอ.กคง.สนผพ.กพ.ทหาร",
    "email": "walaiporn.y@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 162,
    "employee_code": "J1221",
    "full_name": "น.ท. ฐานันดร์  รัตนะนาม ร.น.",
    "position": "หน.งบประมาณ กคง.สนผพ.กพ.ทหาร",
    "email": "thanan.r@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 163,
    "employee_code": "J1222",
    "full_name": "จ.ส.อ. สุวรรณ  นามสวัสดิ์",
    "position": "เสมียน แผนกงบประมาณ กคง.สนผพ.กพ.ทหาร",
    "email": "suwan.n@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 164,
    "employee_code": "J1223",
    "full_name": "น.ท.หญิง กรณัฏฐ์  ธนเสรษฐ์สุวรา ร.น.",
    "position": "หน.บริหารงบประมาณ กคง.สนผพ.กพ.ทหาร",
    "email": "korranat.t@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 165,
    "employee_code": "J1224",
    "full_name": "น.ต.หญิง พัชรินทร์  ศรีหิรัญ",
    "position": "ประจำแผนกบริหารงบประมาณ กคง.สนผพ.กพ.ทหาร",
    "email": "patcharin.sr@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 166,
    "employee_code": "J1225",
    "full_name": "พ.จ.อ.หญิง อริสรา  บุญโสม",
    "position": "เสมียน แผนกบริหารงบประมาณ กคง.สนผพ.กพ.ทหาร",
    "email": "arissara.b@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 167,
    "employee_code": "J1226",
    "full_name": "พ.ท.หญิง ภารดี  ศรีสุข",
    "position": "หน.โครงการ กคง.สนผพ.กพ.ทหาร",
    "email": "paradee.s@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 168,
    "employee_code": "J1227",
    "full_name": "ร.ท.หญิง วราภรณ์  เถาสุวรรณ ร.น.",
    "position": "ประจำแผนกโครงการ กคง.สนผพ.กพ.ทหาร",
    "email": "waraporn.t@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 169,
    "employee_code": "J1228",
    "full_name": "พ.อ.อ. วุฒิเทพ  ริ้วทอง",
    "position": "เสมียนแผนกโครงการ กคง.สนผพ.กพ.ทหาร",
    "email": "wootitape.r@rtarf.mi.th",
    "division_code": "J108",
    "division_name": "กองโครงการและงบประมาณ",
    "division_id": 2
  },
  {
    "id": 170,
    "employee_code": "J1229",
    "full_name": "น.อ. เลิศชัย  ภัทรมุทธา",
    "position": "ผอ.กทด.สนผพ.กพ.ทหาร",
    "email": "lertchai.p@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 171,
    "employee_code": "J1230",
    "full_name": "น.อ. พีรพัฒน์  ปูผ้า ร.น.",
    "position": "รอง ผอ.กทด.สนผพ.กพ.ทหาร",
    "email": "peerapat.p@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 172,
    "employee_code": "J1231",
    "full_name": "พ.อ.หญิง วิชชุดา  หาญเวช",
    "position": "ผช.ผอ.กทด.สนผพ.กพ.ทหาร",
    "email": "witchuda.h@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 173,
    "employee_code": "J1232",
    "full_name": "น.ต.หญิง ชนกนาถ  เนียมสิน",
    "position": "ประจำแผนกระบบงานเครือข่ายกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "chanoknad.n@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 174,
    "employee_code": "J1233",
    "full_name": "ร.ต. เอกวัฒน์  เจาะจง",
    "position": "ประจำแผนกระบบงานเครือข่ายกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "akkawat.j@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 175,
    "employee_code": "J1234",
    "full_name": "ร.ต. ประเดิม  อยู่ผาสุข",
    "position": "นชง.กพ.ทหาร",
    "email": "praderm.y@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 176,
    "employee_code": "J1235",
    "full_name": "พ.อ.อ. อดิศร  บุญอาจ",
    "position": "เสมียน แผนกระบบงานเครือข่ายกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "adisorn.b@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 177,
    "employee_code": "J1236",
    "full_name": "ส.อ. ศิวพงษ์  คงไชย",
    "position": "เสมียน แผนกระบบงานเครือข่ายกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "siwapongchai.k@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 178,
    "employee_code": "J1237",
    "full_name": "น.ท. ธนกิจ  สมานพิบูรณ์",
    "position": "หน.พัฒนาระบบประเมินกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "thanakij.s@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 179,
    "employee_code": "J1238",
    "full_name": "พ.ต. เกียรติศักดิ์  มุกดา",
    "position": "ประจำแผนกพัฒนาระบบประเมินกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "giattisak.m@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 180,
    "employee_code": "J1239",
    "full_name": "ร.ท. เอกชัย  สมสกุล ร.น.",
    "position": "ประจำแผนกพัฒนาระบบประเมินกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "eakchai.s@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 181,
    "employee_code": "J1240",
    "full_name": "พ.จ.อ.หญิง มาริสา  พึ่งศาสตร์",
    "position": "เสมียน แผนกพัฒนาระบบประเมินกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "marisa.p@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 182,
    "employee_code": "J1241",
    "full_name": "ส.ท.หญิง ภิรัญญา  เอกสาร",
    "position": "เสมียน แผนกพัฒนาระบบประเมินกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "phiranya.ek@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 183,
    "employee_code": "J1242",
    "full_name": "จ.ต.หญิง ทาริกา  โฮ่บรรเทา",
    "position": "เสมียน แผนกพัฒนาระบบประเมินกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "tharika.ho@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 184,
    "employee_code": "J1243",
    "full_name": "พ.ท. จารุกร  ทองอร่าม",
    "position": "หน.โปรแกรมระบบงานกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "jarukorn.t@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 185,
    "employee_code": "J1244",
    "full_name": "พ.ต. รัมณรา  สมประสงค์",
    "position": "นายทหารเทคโนโลยีดิจิทัลและปัญญาประดิษฐ์  แผนกโปรแกรมระบบงานกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "ramnara.s@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 186,
    "employee_code": "J1245",
    "full_name": "ร.อ. อภิสิทธิ์  เลิศรัตนวิชญ์",
    "position": "นายทหารเทคโนโลยีดิจิทัลและปัญญาประดิษฐ์  แผนกโปรแกรมระบบงานกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "apisit.le@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 187,
    "employee_code": "J1246",
    "full_name": "จ.ส.อ. จักรพงษ์  บุณยะมาน",
    "position": "จนท.ปฏิบัติการ แผนกโปรแกรมระบบงานกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "chackapong.b@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 188,
    "employee_code": "J1247",
    "full_name": "จ.อ. สุทธิชัย  รุจิศรีสาโรช",
    "position": "จนท.บันทึกข้อมูล แผนกโปรแกรมระบบงานกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "suttichai.ruch@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  },
  {
    "id": 189,
    "employee_code": "J1248",
    "full_name": "จ.ต.หญิง รุ่งนภา  ขวัญศรีสุทธิ์",
    "position": "จนท.บันทึกข้อมูล แผนกโปรแกรมระบบงานกำลังพล กทด.สนผพ.กพ.ทหาร",
    "email": "ruangnapha.k@rtarf.mi.th",
    "division_code": "J109",
    "division_name": "กองเทคโนโลยีดิจิทัล",
    "division_id": 10
  }
];

// Seed demo users representing each role
export const DEMO_USERS: User[] = [
  {
    id: 1,
    username: 'admin_j101',
    employee_code: 'J1001',
    first_name: 'พล.อ.ท. จักรพันธ์  อจลพงศ์',
    position: 'จก.กพ.ทหาร',
    email: 'jakaphun.a@rtarf.mi.th',
    is_superuser: false,
    division_id: 1,
    division_code: 'J101',
    role: 'division_admin',
    role_label: 'แอดมินกองงาน (กองกลาง)'
  },
  {
    id: 2,
    username: 'director_j101',
    employee_code: 'J1002',
    first_name: 'พล.ต. สมเจษฎ์  สุนทรธรรม',
    position: 'รอง จก.กพ.ทหาร',
    email: 'somjade.s@rtarf.mi.th',
    is_superuser: false,
    division_id: 1,
    division_code: 'J101',
    role: 'division_director',
    role_label: 'ผู้อำนวยการกองงาน (กองกลาง)'
  },
  {
    id: 3,
    username: 'requester_j108',
    employee_code: 'J1009',
    first_name: 'น.อ. ธนากร  มีสุข',
    position: 'หน.กคง.กพ.ทหาร',
    email: 'thanakorn.m@rtarf.mi.th',
    is_superuser: false,
    division_id: 2,
    division_code: 'J108',
    role: 'division_user',
    role_label: 'ผู้ขอ/ผู้ใช้งานทั่วไป (กองโครงการและงบประมาณ)'
  },
  {
    id: 4,
    username: 'admin_j109',
    employee_code: 'J1019',
    first_name: 'พ.อ. วรพงษ์  พงษ์ภักดี',
    position: 'หน.กทส.กพ.ทหาร',
    email: 'worapong.p@rtarf.mi.th',
    is_superuser: false,
    division_id: 10,
    division_code: 'J109',
    role: 'division_admin',
    role_label: 'แอดมินกองงาน (กองเทคโนโลยีดิจิทัล)'
  },
  {
    id: 5,
    username: 'superadmin',
    employee_code: 'SUPER01',
    first_name: 'ผู้ดูแลระบบส่วนกลาง (Superadmin)',
    position: 'System Administrator',
    email: 'admin@rtarf.mi.th',
    is_superuser: true,
    division_id: 1,
    division_code: 'J101',
    role: 'superuser',
    role_label: 'ผู้ดูแลระบบสูงสุด (เห็นทุกกองงาน)'
  }
];

export const INITIAL_ROLE_ASSIGNMENTS: DivisionRoleAssignment[] = [
  { id: 1, user_id: 1, division_id: 1, role: 'division_admin', is_active: true },
  { id: 2, user_id: 2, division_id: 1, role: 'division_director', is_active: true },
  { id: 3, user_id: 3, division_id: 2, role: 'division_user', is_active: true },
  { id: 4, user_id: 4, division_id: 10, role: 'division_admin', is_active: true },
  { id: 5, user_id: 5, division_id: 1, role: 'superuser', is_active: true },
];

#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
INSERT INTO aspirations (type) VALUES 
('Naturally Aspirated'),
('Turbocharged'),
('Supercharged'),
('Twin-Turbo');

INSERT INTO colors (name) VALUES 
('Black'),
('White'),
('Red'),
('Blue'),
('Green'),
('Yellow'),
('Silver'),
('Gray'),
('Orange'),
('Purple');

INSERT INTO drivetrains (type) VALUES 
('FWD'), 
('RWD'), 
('AWD'),
('4WD');

INSERT INTO engines (type) VALUES 
('I4'),
('I6'),
('V6'),
('V8'),
('V10'),
('V12'),
('W12'),
('W16'),
('Rotary'),
('B4'),
('B6'),
('Electric');

INSERT INTO transmissions (type) VALUES 
('4-Speed Manual'),
('5-Speed Manual'),
('6-Speed Manual'),
('7-Speed Manual'),
('4-Speed Automatic'),
('5-Speed Automatic'),
('6-Speed Automatic'),
('7-Speed Automatic'),
('8-Speed Automatic'),
('9-Speed Automatic'),
('CVT'),
('6-Speed Dual-Clutch'),
('7-Speed Dual-Clutch'),
('8-Speed Dual-Clutch'),
('6-Speed Sequential'),
('7-Speed Sequential');

INSERT INTO brands (name, year_est, founder) VALUES 
('Toyota', 1937, 'Kiichiro Toyoda'),
('Honda', 1948, 'Soichiro Honda'),
('Nissan', 1933, 'Masujiro Hashimoto'),
('Mazda', 1920, 'Jujiro Matsuda'),
('Subaru', 1953, 'Kenji Kita'),
('Mitsubishi', 1870, 'Yataro Iwasaki'),
('Suzuki', 1909, 'Michio Suzuki'),
('Lexus', 1989, 'Eiji Toyoda'),
('Acura', 1986, 'Soichiro Honda'),
('Infiniti', 1989, 'Kōji Nagano'),
('Hyundai', 1967, 'Chung Ju-Yung'),
('Kia', 1944, 'Kim Cheol-ho');


INSERT INTO cars (modelname, brandid, engineid, enginesize, horsepower, torque, weightkg, year, colorid, mileage, drivetrainid, transmissionid, aspirationid) VALUES
('Skyline GT-R R34', 3, 2, 2.6, 276, 392, 1560, 1999, 1, 145000, 1, 6, 2),  -- I6, AWD, 6MT, Twin-Turbo
('Toyota Supra JZA80 (MK4)', 1, 2, 3.0, 276, 432, 1510, 1998, 2, 190000, 2, 6, 2),  -- I6, RWD, 6MT, Twin-Turbo
('Mazda RX-7 FD3S Spirit R', 4, 3, 1.3, 280, 314, 1270, 2002, 3, 110000, 2, 5, 2),  -- Rotary, RWD, 5MT, Twin-Turbo
('Honda NSX Type R', 2, 4, 3.2, 290, 304, 1270, 2002, 4, 85000, 2, 6, 1),  -- V6, RWD, 6MT, Naturally Aspirated
('Mitsubishi Lancer Evo VI TME', 6, 1, 2.0, 280, 373, 1360, 1999, 5, 160000, 1, 5, 2),  -- I4, AWD, 5MT, Turbo
('Subaru Impreza WRX STI (GDB)', 5, 5, 2.0, 280, 384, 1480, 2003, 6, 175000, 1, 6, 2),  -- F4, AWD, 6MT, Turbo
('Toyota Chaser JZX100 Tourer V', 1, 2, 2.5, 276, 378, 1480, 1998, 7, 220000, 2, 5, 2),  -- I6, RWD, 5MT, Turbo
('Nissan Silvia S15 Spec-R', 3, 1, 2.0, 250, 275, 1240, 1999, 8, 140000, 2, 6, 2),  -- I4, RWD, 6MT, Turbo
('Honda Integra Type R (DC2)', 2, 1, 1.8, 200, 186, 1120, 1998, 9, 210000, 3, 5, 1),  -- I4, FWD, 5MT, Naturally Aspirated
('Mitsubishi GTO Twin Turbo', 6, 4, 3.0, 280, 427, 1740, 1998, 10, 195000, 1, 6, 2),  -- V6, AWD, 6MT, Twin-Turbo
('Mazda Eunos Cosmo', 4, 3, 2.0, 280, 403, 1570, 1995, 11, 250000, 2, 4, 2),  -- Rotary, RWD, 4AT, Twin-Turbo
('Nissan 300ZX Twin Turbo (Z32)', 3, 4, 3.0, 280, 388, 1590, 1998, 12, 180000, 2, 5, 2),  -- V6, RWD, 5MT, Twin-Turbo
('Toyota MR2 GT-S (SW20)', 1, 1, 2.0, 245, 304, 1260, 1998, 13, 160000, 2, 5, 2),  -- I4, RWD, 5MT, Turbo
('Honda S2000 AP1', 2, 1, 2.0, 250, 217, 1250, 1999, 14, 125000, 2, 6, 1),  -- I4, RWD, 6MT, Naturally Aspirated
('Nissan Stagea 260RS Autech', 3, 2, 2.6, 276, 393, 1670, 1998, 15, 230000, 1, 5, 2),  -- I6, AWD, 5MT, Twin-Turbo
('Toyota Celica GT-Four ST205', 1, 1, 2.0, 255, 304, 1390, 1998, 16, 200000, 1, 5, 2),  -- I4, AWD, 5MT, Turbo
('Suzuki Cappuccino', 7, 6, 0.7, 63, 98, 725, 1997, 17, 170000, 2, 5, 2);  -- I3, RWD, 5MT, Turbo

`;



async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
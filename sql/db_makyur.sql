/*
SQLyog Professional v12.5.1 (64 bit)
MySQL - 10.4.11-MariaDB : Database - db_makyur
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_makyur` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `db_makyur`;

/*Table structure for table `account` */

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_province` int(1) NOT NULL,
  `id_city` int(1) NOT NULL,
  `id_sub_city` int(1) NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `no_telephone` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `salt` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `account` */

insert  into `account`(`id`,`email`,`first_name`,`last_name`,`password`,`id_province`,`id_city`,`id_sub_city`,`address`,`no_telephone`,`image`,`salt`,`role`,`date_added`,`date_updated`) values 
(1,'adiamahardika@gmail.com','adia','mahardika','62362480e4d3cea0497df1f3f0e960bc33ccce0c14f3045afb9e63b6a7b25b7cf6948e679dd748ca5b80e3011101fe875e09f09cef85118529b4274f72a13b6d',1,1,2,'Jl. Sukasari III','08123991232','http://20.20.20.155:4111/upload/Ava.jpg','997fc05b8f435abdb7','admin','2020-03-16 10:33:32','2020-03-16 10:33:32'),
(2,'salmanyas3023@gmail.com','Salman','Isar','f3473bbfe53dc41950aaf0ab3f98e3ba2e31b816da74e575aef7864a80cddb43128beabad39f9b883dff1da606903052d3ebf3ad0ac2b600b23d554141544509',1,2,6,'Desa PasirAngin','085819418630','http://20.20.20.155:4111/upload/image-2a333cec-cd4d-4da4-b092-6f51814c9836.jpg','a45bb3d3749e7b71c5','member','2020-03-17 02:01:51','2020-04-03 12:34:40'),
(3,'mamang@mail.com','mamang','cabul','add67a804b6ea750efc65b02c68cb1a3e421f3ab5ac1d19a39132c97c6e93cc66991f35b1000327b2a082393741a9dddadea44b53a56961f14e5838da97779f9',1,1,7,'Sukasari','0000000','http://20.20.20.155:4111/upload/images.jpeg','fe2553f07a1e40eaaa','member','2020-03-29 14:18:37','2020-03-29 15:06:03');

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_category` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `category` */

insert  into `category`(`id`,`name_category`) values 
(2,'Buah'),
(1,'Sayuran'),
(3,'Pokok'),
(4,'Ikan'),
(5,'Protein'),
(6,'Susu dan Telur'),
(7,'Bumbu Dapur'),
(8,'Karbohidrat'),
(9,'Umbi Umbian');

/*Table structure for table `city` */

DROP TABLE IF EXISTS `city`;

CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_city` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_province` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `city` */

insert  into `city`(`id`,`name_city`,`id_province`) values 
(2,'JAKARTA TIMUR',1),
(1,'JAKARTA PUSAT',1),
(3,'JAKARTA BARAT',1),
(4,'JAKARTA SELATAN',1),
(5,'JAKARTA UTARA',1);

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_product` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cardDesc` text COLLATE utf8_unicode_ci NOT NULL,
  `shortDesc` text COLLATE utf8_unicode_ci NOT NULL,
  `longDesc` text COLLATE utf8_unicode_ci NOT NULL,
  `ingredients` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `id_product_group` int(11) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `product` */

insert  into `product`(`id`,`name_product`,`image`,`cardDesc`,`shortDesc`,`longDesc`,`ingredients`,`quantity`,`price`,`id_category`,`id_product_group`,`date_added`,`date_updated`) values 
(1,'Lemon Lokal Imperfect','http://20.20.20.155:4111/upload/Lemon.jpg','Imperfect : ukuran lebih kecil dan agak kehitaman','Lemon merupakan jenis sitrus yang tinggi vitamin C, dimana vitamin C baik untuk menjaga imunitas tubuh.','Termasuk jenis imperfect karena lemon ini memiliki ukuran kecil dan kulit yang kehitaman. Namun bulir jeruknya tetap segar dan memberikan manfaat vitamin C yang baik untuk tubuh.','500 gram',74,3300,2,2,'2020-03-16 14:51:59','2020-03-16 14:51:59'),
(2,'Kunyit','http://20.20.20.155:4111/upload/Kunyit-Value.jpg','Turmeric Value (200gr) ','Kunyit juga punya berbagai macam manfaat mulai dari untuk kesehatan tubuh sampai untuk kecantikan. Sebagai masker wajah untuk mencegah kerutan, dapat menyembuhkan luka bakar juga dong.','Kunyit adalah salah satu rempah-rempah yang cukup populer digunakan nih. Selain sebagai penambah rasa masakan, juga sebagai pewarna dalam beberapa hidangan.','200 gram',38,3000,7,1,'2020-03-16 15:04:21','2020-03-16 15:04:21'),
(3,'Plum Australia','http://20.20.20.155:4111/upload/Fresh-Plum.jpg','Plum Australia','Merupakan buah yang cukup dicari karena khasiatnya yang dipercaya untuk menurunkan berat badan. Bagian luar berwarna ungu gelap dengan daging buah berserat dan rasa yang segar.','Plum mengandung vitamin A, C, B complex, K, juga mengandung serat, kalium, dan berbagai mineral lainnya. Mengonsumsi plum dapat menurunkan berat badan, meningkatkan sistem kekebalan tubuh, dan juga menjaga kesehatan mata.','3 pcs',88,31600,2,1,'2020-03-16 15:10:44','2020-03-16 15:10:44'),
(4,'Kentang Dieng','http://20.20.20.155:4111/upload/Kentang-Dieng.jpg','Kentang Dieng 500 gram','Kentang asli Dieng ini sudah terkenal bahkan sampai luar negri loh. Kalau ke Dieng, jangan lupa mampir ke perkebunan kentangnya.','Kentang punya banyak manfaat nih yang baik bukan hanya buat yang mau diet loh. Di dalam kentang ada Pati Resisten yang bisa bekerja baik untuk hormon pengendalian gula darah, jadi kalau mengkonsumsi kentang bagus buat penderita diabetes. Kentang juga Gluten Free loh, hanya jika diolah dengan benar yah. Kentang dikonsumsi anak sejak dini juga baik nih, soalnya bisa menjaga kesehatan jantung. Wah moms, jangan lupa beli kentang buat anak yah.','500 gram',90,10800,9,1,'2020-03-16 15:22:13','2020-03-16 15:22:13'),
(5,'Cabai Merah Rawit','http://20.20.20.155:4111/upload/Cabai-Merah-Rawit.jpg','Cabai Merah Rawit Value (200gr)','Tau ngga kalau cabai mempunyai kandungan vitamin C yang cukup besar? Begitu juga cabai merah loh. Selain itu cabai juga mengandung capsaicin yang dapat membantu penyerapan nutrisi untuk sumber metabolisme tubuh.','Cabai Merah Rawit ini wajib ada di dapur. Membuat makanan yang pedas dan nikmat adalah tugas cabai merah rawit ini. Bentuknya kecil dan bervariasi, warnanya mulai dari orange kemerahan sampai merah. Cukup pedas dan punya rasa yang kuat.','200 gram',90,15700,7,2,'2020-03-16 15:33:05','2020-03-16 15:33:05'),
(6,'Tauge Panjang Conventional','http://20.20.20.155:4111/upload/Tauge-Panjang.jpg','Tauge Panjang Conventional 1 kg','Tauge ternyata mengandung banyak nutrisnya dan vitamin. Ada vitamin B yang baik untuk kesehatan kulit, vitamin K untuk kesehatan rambut, serta kandungan vitamin C dan protein yang bisa bikin kulit tetap awet muda loh. Incerannya para wanita nih.','Tauge atau kecambah adalah jenis sayuran yang masih berupa sporofit. Pasti pada sering ya ketemu tauge di pasar? Apalagi tauge yang diolah sudah sangat umum banget. Bentuknya ada batang berwarna putih, dengan kepala kacang yang berwarna putih agak kekuningan, kadang masih tertutup selaput berwarna hijau juga. Tauge ini sebenarnya kontroversial, tapi banyak yang percaya kalau tauge banyak manfaatnya!','1 kg',25,16200,1,2,'2020-03-16 15:37:24','2020-03-16 15:37:24'),
(7,'Kentang Baby','http://20.20.20.155:4111/upload/Kentang-Baby.jpg','Kentang Kecil Value 500gr','Kentang baby ini biasanya memiliki bentuk bulat - bulat kecil tetapi ukurannya bervariasi.','Kentang adalah salah satu sumber pati, vitamin, mineral, dan serat makanan terbaik. Namun, mereka mengandung sangat sedikit lemak. Kentang baby adalah sumber alami yang sangat baik dari serat larut dan tidak larut. Serat makanan di dalamnya meningkatkan sebagian besar tinja, sehingga membantu mencegah sembelit, mengurangi penyerapan kolesterol makanan. Kentang segar bersama dengan kulitnya adalah salah satu sumber antioksidan vitamin, vitamin-C. Kandungan serat membantu dalam pati pencernaan lambat dan penyerapan gula sederhana dalam usus. Dengan demikian membantu dalam menjaga kadar gula darah dalam kisaran normal dan menghindari fluktuasi yang luas.','500 gram',50,9900,9,2,'2020-03-16 15:53:01','2020-03-16 15:53:01'),
(8,'Lobster Pasir','http://20.20.20.155:4111/upload/Lobster-Pasir.jpg','Lobster Pasir','Lobster adalah seafood dari keluarga Krustasea, ukuran yang besar dengan cangkang yang keras dan daging yang juga tebal didalamnya. Biasanya Lobster sering dihidangkan dengan cara dibakar atau dipanggang.','Lobster tinggi protein dan memiliki beberapa manfaat yang baik untuk tubuh diantaranya untuk perkembangan sel otak, dapat menstabilkan jantung, sampai baik untuk kesehatan kulit.','1 pcs',10,115000,4,1,'2020-03-16 15:56:24','2020-03-16 15:56:24'),
(9,'Susu Ultra Rasa Cokelat','http://20.20.20.155:4111/upload/Susu-Ultra-Rasa-Cokelat.jpg','Ultra Milk 1 Liter','Mengandung vitamin A, B1, B2, B12, D3 dan B6 serta sumber kalsium dan fosfor yang penting bagi tubuh.','Ultra Milk Coklat berasal dari susu sapi segar yang diproses dengan teknologi UHT dan dikemas secara aseptik. Perlu diingat bahwa susu UHT tidak cocok untuk bayi usia 0 - 12 bulan.','1 pcs',10,18200,6,2,'2020-03-16 15:59:25','2020-03-16 15:59:25'),
(10,'Agronusantara Beras Losari','http://20.20.20.155:4111/upload/Beras-Losari.jpg','Beras Losari 3 kg','Beras putih bersih dengan mutu premium yang cocok dimasak untuk keluarga tercinta di rumah. Selain harganya yang terjangkau, beras Losari Agronusantara juga menggunakan peralatan yang mutakhir untuk mengolah hasil panennya. Jadi, jangan ragu lagi yaa untuk nentuin pilihan beras di rumah!','Beras putih yang telah dimasak merupakan makanan pokok bagi sebagian besar masyarakat. Pangan ini mengandung karbohidrat yang menjadi sumber energi, lemak, protein, serat, vitamin, dan mineral yang dapat memenuhi kebutuhan nutrisi tubuh.','1 pack',20,45900,3,2,'2020-03-16 16:13:35','2020-03-16 16:13:35');

/*Table structure for table `product_group` */

DROP TABLE IF EXISTS `product_group`;

CREATE TABLE `product_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_group` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `product_group` */

insert  into `product_group`(`id`,`name_group`) values 
(1,'Import'),
(2,'Lokal');

/*Table structure for table `province` */

DROP TABLE IF EXISTS `province`;

CREATE TABLE `province` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_province` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `province` */

insert  into `province`(`id`,`name_province`) values 
(1,'JAKARTA'),
(2,'BOGOR'),
(3,'DEPOK'),
(4,'TANGGENRANG'),
(5,'BEKASI');

/*Table structure for table `purchase` */

DROP TABLE IF EXISTS `purchase`;

CREATE TABLE `purchase` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_account` int(11) NOT NULL,
  `name_reciver` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `no_telephone` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `id_province` int(11) NOT NULL,
  `id_city` int(11) NOT NULL,
  `id_sub_city` int(11) NOT NULL,
  `codepos` int(11) NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `fax` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `tax` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `arrived` tinyint(1) NOT NULL,
  `total` int(11) NOT NULL,
  `tracking` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `purchase` */

insert  into `purchase`(`id`,`id_account`,`name_reciver`,`email`,`no_telephone`,`id_province`,`id_city`,`id_sub_city`,`codepos`,`address`,`fax`,`tax`,`arrived`,`total`,`tracking`,`date`) values 
('e5dd0956-8557-4708-aa0a-ff6636bdc86a',2,'Salman2','salmanyas3023@gmail.com','085819418630',1,2,6,0,'Desa PasirAngin','0','0',0,6300,'mak-yur-1f9ecfa8c8','0000-00-00 00:00:00'),
('24ee4a90-7fa8-4102-b35f-dd1e10e2c847',2,'Salman2','salmanyas3023@gmail.com','085819418630',1,2,6,0,'Desa PasirAngin','0','0',0,6300,'mak-yur-037dc1536c','0000-00-00 00:00:00'),
('97c369ac-8e46-49b4-b340-0982b3b8efdd',2,'Salman2','salmanyas3023@gmail.com','085819418630',1,2,6,0,'Desa PasirAngin','0','0',0,6300,'mak-yur-9aa18e0bba','0000-00-00 00:00:00'),
('17ad3c1e-6ac9-42d8-9e49-23b37c68aac3',2,'Salman2','salmanyas3023@gmail.com','085819418630',1,2,6,0,'Desa PasirAngin','0','0',0,6300,'mak-yur-c4129451b0','0000-00-00 00:00:00'),
('ec8d593e-7113-4e35-9fb8-cfc5a232dcca',2,'Salman2','salmanyas3023@gmail.com','085819418630',1,2,6,0,'Desa PasirAngin','0','0',0,9900,'mak-yur-089a49c72f','0000-00-00 00:00:00');

/*Table structure for table `purchase_detail` */

DROP TABLE IF EXISTS `purchase_detail`;

CREATE TABLE `purchase_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_purchase` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_product` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `purchase_detail` */

insert  into `purchase_detail`(`id`,`id_purchase`,`id_product`,`quantity`) values 
(1,'e5dd0956-8557-4708-aa0a-ff6636bdc86a','1',1),
(2,'e5dd0956-8557-4708-aa0a-ff6636bdc86a','2',1),
(3,'24ee4a90-7fa8-4102-b35f-dd1e10e2c847','1',1),
(4,'24ee4a90-7fa8-4102-b35f-dd1e10e2c847','2',1),
(5,'97c369ac-8e46-49b4-b340-0982b3b8efdd','1',1),
(6,'97c369ac-8e46-49b4-b340-0982b3b8efdd','2',1),
(7,'17ad3c1e-6ac9-42d8-9e49-23b37c68aac3','2',1),
(8,'17ad3c1e-6ac9-42d8-9e49-23b37c68aac3','1',1),
(9,'ec8d593e-7113-4e35-9fb8-cfc5a232dcca','1',3);

/*Table structure for table `sub_city` */

DROP TABLE IF EXISTS `sub_city`;

CREATE TABLE `sub_city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_sub_city` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `id_city` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `sub_city` */

insert  into `sub_city`(`id`,`name_sub_city`,`id_city`) values 
(3,'Johar Baru',1),
(1,'Cempaka Putih',1),
(2,'Gambir',1),
(4,'Kemayoran',1),
(5,'Sawah Besar',1),
(6,'Senen',1),
(7,'Tanah Abang',1),
(8,'Menteng',1),
(9,'Cakung',2),
(10,'Cipayung',2),
(11,'Ciracas',2),
(12,'Duren Sawit',2),
(13,'Jatinegara',2),
(14,'Kramat Jati',2),
(15,'Makasar',2),
(16,'Matraman',2),
(17,'Pasar Rebo',2),
(18,'Pulo Gadung',2),
(19,'Cengkareng',3),
(20,'Grogol Petamburan',3),
(21,'Kalideres',3),
(22,'Kebon Jeruk',3),
(23,'Kembangan',3),
(24,'Palmerah',3),
(25,'Taman Sari',3),
(26,'Tambora',3),
(27,'Cilandak',4),
(28,'Jagakarsa',4),
(29,'Kebayoran Baru',4),
(30,'Kebayoran Lama',4),
(31,'Mampang Prapatan',4),
(32,'Pancoran',4),
(33,'Pasar Minggu',4),
(34,'Pesanggrahan',4),
(35,'Setiabudi',4),
(36,'Tebet',4),
(37,'Cilincing',5),
(38,'Kelapa Gading',5),
(39,'Koja',5),
(40,'Pademangan',5),
(41,'Panjaringan',5),
(42,'Tanjung Priok',5);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

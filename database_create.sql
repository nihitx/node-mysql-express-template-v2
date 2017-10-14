CREATE TABLE `user` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Owner` bigint(20) unsigned NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `INSERT_DT` timestamp DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_DT` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

insert into user (Owner, firstname, lastname, email, password,token, INSERT_DT) values (1,'Masnad','Hossain','masnad@admin.com', '2342342342fssdfds','123123123', now());

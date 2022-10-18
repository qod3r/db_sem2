
CREATE TABLE EMPLOYEE_BLANK(
  ID NUMBER(10),
  NAME VARCHAR2(200 BYTE),
  SERNAME VARCHAR2(200 BYTE),
  FATHER_NAME VARCHAR2(200 BYTE),
  EMAIL VARCHAR2(200 BYTE),
  TELEFONE_NUMBER VARCHAR2(200 BYTE),
  INFORMATION VARCHAR2(200 BYTE),  
  PRIKAZ VARCHAR2(200 BYTE), 	
  CONSTRAINT PK_EMPLOYEE PRIMARY KEY (ID));


INSERT INTO EMPLOYEE_BLANK(ID, NAME, SERNAME, FATHER_NAME, EMAIL, TELEFONE_NUMBER, INFORMATION, PRIKAZ) VALUES
(1, 'Иван', 'Иванов', 'Иванович', 'ivan@gmail.com', '8(777)111-11-11', 'Дата рождения: 10.10.1987.  Увлечения: плавание, шахматы','Номер уведомления: 123');
INSERT INTO EMPLOYEE_BLANK(ID, NAME, SERNAME, FATHER_NAME, EMAIL, TELEFONE_NUMBER, INFORMATION, PRIKAZ) VALUES
(2, 'Николай', 'Семерук', 'Александрович', 'killer@rambler.ru', '7(777)523-68-91', 'Увлечения: бокс','Номер приказа: 1001');
INSERT INTO EMPLOYEE_BLANK(ID, NAME, SERNAME, FATHER_NAME, EMAIL, TELEFONE_NUMBER, INFORMATION, PRIKAZ) VALUES
(3, 'Александр', 'Хопта', 'Петрович', 'sasha@.ru', '(2-20-47)', 'Увлечения: плавание','Номер распоряжения: 202');
INSERT INTO EMPLOYEE_BLANK(ID, NAME, SERNAME, FATHER_NAME, EMAIL, TELEFONE_NUMBER, INFORMATION, PRIKAZ) VALUES
(4, 'Владимир', 'Никифоров', 'Александрович', 'vova@rambler.ru', '2-45-48', 'Дата рождения: 12.07.1967','Номер приказа: 404');
INSERT INTO EMPLOYEE_BLANK(ID, NAME, SERNAME, FATHER_NAME, EMAIL, TELEFONE_NUMBER, INFORMATION, PRIKAZ) VALUES
(5, 'Семен', 'Лобанов', 'Иванович', 'semen@yandex.com', '8(777)654-12-21', 'Увлечения: борьба','Номер приказа: 15');
INSERT INTO EMPLOYEE_BLANK(ID, NAME, SERNAME, FATHER_NAME, EMAIL, TELEFONE_NUMBER, INFORMATION, PRIKAZ) VALUES
(6, 'Глеб', 'Кисегач', 'Викторович', 'gleb@mail.', '2-87-98', 'Увлечения:компьютерные игры','Номер распоряжения: 333');
INSERT INTO EMPLOYEE_BLANK(ID, NAME, SERNAME, FATHER_NAME, EMAIL, TELEFONE_NUMBER, INFORMATION, PRIKAZ) VALUES
(7, 'Варя', 'Черноус', 'Петрович', 'cher@mail.ru', NULL, 'Дата рождения: 14.01.1980','Номер приказа: 1');
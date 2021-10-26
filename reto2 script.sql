
--creacion de tabla CLIENT
CREATE TABLE CLIENT (
	ID NUMBER,
	NAME VARCHAR2(4000),
	EMAIL VARCHAR2(20),
    AGE NUMBER,
	PRIMARY KEY (ID));

--creacion de consecutivos
--drop SEQUENCE increment_id_client; --para reset la secuencia
CREATE SEQUENCE increment_id_client START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER SECUENCIA_CLIENT
BEFORE INSERT ON CLIENT FOR EACH ROW
WHEN (NEW.ID IS NULL)
BEGIN
SELECT increment_id_client.NEXTVAL INTO :NEW.ID FROM DUAL;
END;


--info GET:
SELECT * FROM CLIENT order by ID

--info GET:id
SELECT * FROM CLIENT WHERE ID=:id

--info POST:
BEGIN
insert into CLIENT
(NAME,EMAIL,AGE) VALUES
(:name,:email,:age);
:status_code:=201;
END;

--info PUT:
BEGIN
update CLIENT
set 
NAME=:name,
EMAIL=:email,
AGE=:age
where ID=:id;
:status_code:=201;
END;

--info DELETE:
BEGIN
delete CLIENT where ID=:id;
:status_code:=204;
END;



--creacion de tabla MESSAGE
CREATE TABLE MESSAGE (
	ID NUMBER,
	MESSAGETEXT VARCHAR2(4000),
	PRIMARY KEY (ID));

--creacion de consecutivos
--drop SEQUENCE increment_id_message; --para reset la secuencia
CREATE SEQUENCE increment_id_message START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER SECUENCIA_MESSAGE
BEFORE INSERT ON MESSAGE FOR EACH ROW
WHEN (NEW.ID IS NULL)
BEGIN
SELECT increment_id_message.NEXTVAL INTO :NEW.ID FROM DUAL;
END;


--info GET:
select * from MESSAGE order By ID

--info POST:
BEGIN
insert into MESSAGE
(MESSAGETEXT) VALUES
(:messagetext);
:status_code:=201;
END;
--info PUT:
BEGIN
update MESSAGE
set 
MESSAGETEXT=:messagetext
where ID=:id;
:status_code:=201;
END;

--info DELETE:
BEGIN
delete MESSAGE where ID=:id;
:status_code:=204;
END;


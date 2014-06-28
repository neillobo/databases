CREATE DATABASE chat;

USE CHAT;

CREATE TABLE MESSAGES(
  id MEDIUMINT NOT NULL AUTO_INCREMENT primary key,
  text VARCHAR(400),
  username VARCHAR (25),
  roomname VARCHAR (25));

CREATE TABLE ROOMS(
  id MEDIUMINT NOT NULL AUTO_INCREMENT primary key,
  name VARCHAR(30)
  );

INSERT INTO ROOMS (NAME) VALUES 
("PIRATES"),("IN-BETWEENERS");

INSERT INTO MESSAGES (text,username,roomname) VALUES 
("HELLO WORLD","NEIL","PIRATES"),
("I LOVE MAPS","ROGER","PIRATES"),
("STYLE GUIDE","ROGER","PIRATES"),
("NO SPACES = ANARCHY","ROGER","PIRATES"),
("YOLO","JOHN","IN-BETWEENERS"),
("SWAG","KEVIN","IN-BETWEENERS"),
("LIVE NOT EXIST","TESS","IN-BETWEENERS"),
("LIFE IS BEAUTIFUL","MOJO","IN-BETWEENERS");
  


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/





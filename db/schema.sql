CREATE DATABASE trackrx_db;

USE trackrx_db;

CREATE TABLE user (
    userID INTEGER AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    PRIMARY KEY (userid)

);

CREATE TABLE medication (
    medicationID INTEGER AUTO_INCREMENT NOT NULL,
    userID INTEGER NOT NULL,
    medicationName VARCHAR(50) NOT NULL,
    medicationDosage VARCHAR(10) NOT NULL,
    medicationQuantity INTEGER NOT NULL,
    medicationFrequency VARCHAR(300) NOT NULL,
    updated TIMESTAMP,
    FOREIGN KEY(userID) REFERENCES user(userID),
    PRIMARY KEY (medicationID)

);

CREATE TABLE taken (
    takenID INTEGER AUTO_INCREMENT NOT NULL,
    userID INTEGER NOT NULL,
    medicationID INTEGER NOT NULL,
    takenLog VARCHAR(50) NOT NULL,
    PRIMARY KEY(takenID),
    FOREIGN KEY(userID) REFERENCES user(userID),
    FOREIGN KEY(medicationID) REFERENCES medication(medicationID)

);

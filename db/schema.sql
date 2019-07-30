drop database if exists burger_db;
create database burger_db;
use burger_db;

create table burgers (
	id integer not null auto_increment,
    burger_name varchar(50) not null,
    devoured boolean not null default false,
	primary key(id)
);


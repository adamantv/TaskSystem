drop table if exists "user" cascade;
drop table if exists task cascade;
drop sequence hibernate_sequence;

create sequence hibernate_sequence start 10 increment 1;
create table "user"
(
    id       int8         not null,
    email    varchar(255) not null,
    enabled  boolean      not null,
    password varchar(255),
    role     varchar(255),
    username varchar(255) not null,
    primary key (id)
);

create table task
(
    id      int8 not null,
    text varchar(255),
    primary key (id)
);

alter table "user"
    add constraint UK_ob8kqyqqgmefl0aco34akdtpe unique (email);

alter table "user"
    add constraint UK_sb8bbouer5wak8vyiiy4pf2bx unique (username);

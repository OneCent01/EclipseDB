# SecureMD db scripts
___

Here you'll find a set of scripts for setting up and managing the database for the secure medical record storage system. 


# Scripts


## init.js

Connects to the database and sets up the tables then connects them by adding foreign key references. Two sets of sql queries are executed sequentially to ensure this happens in order: create_tables.sql -> connect_tables.sql

Assumptions: 
	- The database 'SecureMD' exists and has no tables

